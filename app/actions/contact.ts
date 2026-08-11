"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { getPostHogClient } from "@/lib/posthog-server";
import { createRateLimiter } from "@/lib/rate-limit";

type ContactResult = { success: true } | { success: false; error: string };

// Abuse controls. A Server Action compiles to a public POST endpoint that anyone
// can call directly, with or without our form, and every call costs us a Resend
// send plus a CRM write. Without these an attacker can burn the sending quota,
// get the domain's reputation flagged and flood Foundry with junk leads.
const PER_IP_LIMIT = 3;
const PER_IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const GLOBAL_LIMIT = 60;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MIN_FILL_MS = 3000; // nobody types a name, email and brief in under 3s

const perIpRateLimit = createRateLimiter(PER_IP_LIMIT, PER_IP_WINDOW_MS);
// Backstop for distributed abuse, where every request carries a different real
// IP and the per-IP limiter never trips. Also covers the case of running behind
// a proxy that doesn't rewrite x-forwarded-for.
const globalRateLimit = createRateLimiter(GLOBAL_LIMIT, GLOBAL_WINDOW_MS);

// Hard caps, applied before anything user-supplied reaches Resend or Foundry.
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 5000;

// Rejects control characters, CR and LF included. Any value that lands in an
// email header must not be able to terminate that header and start another one
// (a Bcc, say). `allowWhitespace` tolerates the tabs and newlines that are
// legitimate inside a message body.
function hasControlChars(value: string, allowWhitespace = false): boolean {
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code > 0x1f && code !== 0x7f) continue;
    const isBodyWhitespace = code === 0x09 || code === 0x0a || code === 0x0d;
    if (allowWhitespace && isBodyWhitespace) continue;
    return true;
  }
  return false;
}

// Best-effort client IP. On Vercel both headers are written by the edge, which
// overwrites any inbound x-forwarded-for instead of appending to it, so the
// value cannot be spoofed there. Behind an untrusted proxy it can be — hence the
// global limiter above.
async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    // Left-most entry is the originating client; the rest are proxy hops.
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headerList.get("x-real-ip")?.trim() || "unknown";
}

// FormData values are string | File — a hand-rolled POST can send a file part
// for any field. Anything that isn't a string is treated as absent rather than
// blindly cast, which would throw on .trim().
function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

// Belt-and-braces for values that end up in a header position. Validation
// already rejects control characters; this makes the guarantee local to the
// header so a future change to validation can't quietly reintroduce injection.
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

// Field values are interpolated into the HTML email body. Unescaped, a submitter
// could inject arbitrary markup — including links — into a message that arrives
// in our own inbox.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Fail-soft: also record the inquiry as a contact in the Foundry platform CRM
// (tenant "funderworks"). Never blocks or fails the form — the Resend email is
// the primary path. Requires FORMS_SVC_URL + RESURGENCE_INTERNAL_SECRET in env.
async function forwardToFoundry(input: {
  name: string;
  email: string;
  company: string;
  message: string;
}): Promise<void> {
  const base = process.env.FORMS_SVC_URL;
  if (!base) return; // not configured yet — skip silently
  const tenant = process.env.FOUNDRY_TENANT || "funderworks";
  try {
    const url = new URL(`${base.replace(/\/+$/, "")}/forms/submit`);
    url.searchParams.set("tenant", tenant);
    // Named to avoid shadowing the `headers` import from next/headers.
    const requestHeaders: Record<string, string> = {
      "content-type": "application/json",
      accept: "application/json",
      "x-tenant-slug": tenant,
    };
    if (process.env.RESURGENCE_INTERNAL_SECRET) {
      requestHeaders.authorization = `Bearer ${process.env.RESURGENCE_INTERNAL_SECRET}`;
    }
    await fetch(url, {
      method: "POST",
      headers: requestHeaders,
      cache: "no-store",
      // "Never blocks" was aspirational while this was awaited with no timeout —
      // a hung CRM would hang the user's form. Cap it.
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        formKey: "contact",
        name: input.name,
        email: input.email,
        message: input.company ? `[${input.company}] ${input.message}` : input.message,
      }),
    });
  } catch (err) {
    console.error("[contact] Foundry forward failed (non-blocking):", err);
  }
}

export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const company = readField(formData, "company");
  const message = readField(formData, "message");

  // Spam heuristics run first, so bots never consume the shared global budget
  // that real visitors depend on. Both report success: telling a bot which
  // signal caught it just teaches it how to evade the next attempt.
  const honeypot = readField(formData, "website");
  if (honeypot) {
    console.warn("[contact] dropped submission: honeypot filled");
    return { success: true };
  }

  // Milliseconds the form was on screen, measured on the client's own clock so
  // that clock skew cancels out. A raw POST omits it entirely, which is the
  // point — this is a bot-cost measure, not a trust boundary.
  const elapsedMs = Number.parseInt(readField(formData, "elapsed"), 10);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    console.warn("[contact] dropped submission: submitted too fast or missing timing field");
    return { success: true };
  }

  const ip = await getClientIp();
  const perIp = perIpRateLimit(ip);
  const global = globalRateLimit("__all__");
  if (!perIp.allowed || !global.allowed) {
    const retryMinutes = Math.ceil(Math.max(perIp.retryAfterMs, global.retryAfterMs) / 60000);
    return {
      success: false,
      error: `Too many messages sent from here. Please try again in ${retryMinutes} minute${retryMinutes === 1 ? "" : "s"}, or email hello@funderworks.studio directly.`,
    };
  }

  if (!name || name.length > MAX_NAME || hasControlChars(name)) {
    return { success: false, error: "Please provide your name (required, max 100 characters)." };
  }
  if (
    !email ||
    email.length > MAX_EMAIL ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    hasControlChars(email)
  ) {
    return { success: false, error: "Please provide a valid email address." };
  }
  if (company.length > MAX_COMPANY || hasControlChars(company)) {
    return { success: false, error: "Business name is too long (max 200 characters)." };
  }
  if (!message || message.length > MAX_MESSAGE || hasControlChars(message, true)) {
    return { success: false, error: "Please describe your project (required, max 5000 characters)." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "hello@funderworks.studio",
      replyTo: sanitizeHeaderValue(email),
      subject: sanitizeHeaderValue(`New inquiry from ${name} — Funderworks`),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <h2 style="color: #111; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; background: #fff; padding: 24px; border-radius: 8px;">
            <tr>
              <td style="padding: 10px 16px; color: #666; width: 120px; font-size: 14px;"><strong>Name</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 16px; color: #666; font-size: 14px;"><strong>Email</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #0066cc;">${escapeHtml(email)}</a></td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 10px 16px; color: #666; font-size: 14px;"><strong>Business</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;">${escapeHtml(company)}</td>
            </tr>` : ""}
            <tr ${company ? 'style="background: #f9f9f9;"' : ""}>
              <td style="padding: 10px 16px; color: #666; font-size: 14px; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 10px 16px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</td>
            </tr>
          </table>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent via funderworks.studio contact form</p>
        </div>
      `,
      text: `New inquiry from ${name} — Funderworks\n\nName: ${name}\nEmail: ${email}${company ? `\nBusiness: ${company}` : ""}\n\nMessage:\n${message}\n\n---\nSent via funderworks.studio contact form`,
    });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return {
      success: false,
      error: "Something went wrong sending your message. Please email hello@funderworks.studio directly.",
    };
  }

  // Record the lead in Foundry CRM (fail-soft; the email already succeeded).
  await forwardToFoundry({ name, email, company, message });

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: email,
    event: "contact_submitted",
    properties: {
      has_company: !!company,
      message_length: message.length,
    },
  });
  await posthog.shutdown();

  return { success: true };
}
