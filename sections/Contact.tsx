"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { brand } from "@/config/brand";
import { sendContactMessage } from "@/app/actions/contact";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const result = await sendContactMessage(data);
    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setErrorMessage(result.error);
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--text-primary)",
    fontSize: "0.875rem",
    padding: "0.875rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "var(--font-inter)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(0, 212, 255, 0.5)";
    e.target.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.05)";
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.boxShadow = "none";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Company / Project</label>
        <input
          type="text"
          name="company"
          placeholder="Your business or project name"
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <div>
        <label style={labelStyle}>Tell us about your project</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Describe what you're looking to build, your timeline, budget range, etc."
          style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <div>
        {status === "success" ? (
          <motion.div
            className="flex items-center gap-3 p-4"
            style={{
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              color: "#22c55e",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Message sent! We&apos;ll be in touch shortly.</span>
          </motion.div>
        ) : status === "error" ? (
          <motion.div
            className="flex items-center gap-3 p-4 mb-4"
            style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#ef4444",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm">{errorMessage || `Something went wrong. Email us directly at ${brand.email}`}</span>
          </motion.div>
        ) : null}

        {status !== "success" && (
          <motion.button
            type="submit"
            className="btn-primary cursor-none w-full sm:w-auto flex items-center justify-center gap-2"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "sending" ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin"
                />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={14} />
              </>
            )}
          </motion.button>
        )}
      </div>
    </form>
  );
}

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="absolute inset-0 grid-pattern pointer-events-none" style={{ opacity: 0.2 }} />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="eyebrow mb-8">Get In Touch</div>

            <h2
              className="font-display font-extrabold leading-none mb-8"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Ready to Build
              <br />
              <span style={{ color: "var(--accent-cyan)" }}>Something?</span>
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
              Got a project in mind? Tell us about it. Whether it&apos;s a new website, a custom platform,
              or an idea you haven&apos;t fully shaped yet — we&apos;re here to help you bring it to life.
            </p>

            <div className="accent-line mb-10" />

            {/* Direct contact */}
            <div className="flex flex-col gap-4 mb-10">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-sm group cursor-none"
                style={{ color: "var(--text-muted)" }}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  <Mail size={14} />
                </div>
                <span className="group-hover:text-white transition-colors">{brand.email}</span>
                <ArrowRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "var(--accent-cyan)" }}
                />
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={brand.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline cursor-none flex items-center gap-2 text-xs"
              >
                <GitHubIcon size={14} />
                GitHub
              </a>
              <a
                href={brand.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline cursor-none flex items-center gap-2 text-xs"
              >
                <LinkedInIcon size={14} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="glass p-8 md:p-10"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="font-display font-bold text-xl mb-8"
              style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}
            >
              Start the Conversation
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
