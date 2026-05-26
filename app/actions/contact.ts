"use server";

import { Resend } from "resend";

type ContactResult = { success: true } | { success: false; error: string };

// TODO: Add Upstash rate limiting once we're seeing real traffic
export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const company = (formData.get("company") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || name.length > 100) {
    return { success: false, error: "Please provide your name (required, max 100 characters)." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { success: false, error: "Please provide a valid email address." };
  }
  if (company.length > 200) {
    return { success: false, error: "Business name is too long (max 200 characters)." };
  }
  if (!message || message.length > 5000) {
    return { success: false, error: "Please describe your project (required, max 5000 characters)." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "hello@funderworks.studio",
      replyTo: email,
      subject: `New inquiry from ${name} — Funderworks`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9;">
          <h2 style="color: #111; margin-top: 0;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse; background: #fff; padding: 24px; border-radius: 8px;">
            <tr>
              <td style="padding: 10px 16px; color: #666; width: 120px; font-size: 14px;"><strong>Name</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px 16px; color: #666; font-size: 14px;"><strong>Email</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
            </tr>
            ${company ? `<tr>
              <td style="padding: 10px 16px; color: #666; font-size: 14px;"><strong>Business</strong></td>
              <td style="padding: 10px 16px; font-size: 14px;">${company}</td>
            </tr>` : ""}
            <tr ${company ? 'style="background: #f9f9f9;"' : ""}>
              <td style="padding: 10px 16px; color: #666; font-size: 14px; vertical-align: top;"><strong>Message</strong></td>
              <td style="padding: 10px 16px; font-size: 14px; white-space: pre-wrap;">${message}</td>
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

  return { success: true };
}
