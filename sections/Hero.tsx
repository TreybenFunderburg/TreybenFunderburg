"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import posthog from "posthog-js";
import { brand } from "@/config/brand";
import { RecentProjects } from "@/components/cards/RecentProjects";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wordVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease,
    },
  }),
};

function AnimatedHeading({ text }: { text: string }) {
  const lines = text.split("\n");
  let wordIndex = 0;

  return (
    <div
      className="font-display font-extrabold tracking-[-0.04em]"
      style={{
        fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
        fontFamily: "var(--font-display)",
        color: "var(--text-primary)",
        lineHeight: 1.05,
      }}
    >
      {lines.map((line, li) => (
        <div key={li} className="flex flex-wrap gap-x-4">
          {line.split(" ").map((word) => {
            const idx = wordIndex++;
            return (
              <motion.span
                key={idx}
                custom={idx}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const scrollToContact = () => {
    posthog.capture("hero_start_project_clicked");
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    posthog.capture("hero_services_clicked");
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const heroHeadline = brand.heroHeadline.join("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
    >
      {/* Ambient particle field is rendered site-wide in the root layout */}

      {/* Gradient Blobs — overflow-hidden lives here, not on the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="gradient-blob absolute"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
            top: "10%",
            left: "5%",
          }}
        />
        <div
          className="gradient-blob gradient-blob-2 absolute"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
          }}
        />
        <div
          className="gradient-blob gradient-blob-3 absolute"
          style={{
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            top: "50%",
            right: "30%",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" style={{ opacity: 0.4 }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
          <div className="max-w-3xl">
          {/* Availability pill */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-6"
            style={{
              background: "rgba(52, 211, 153, 0.08)",
              border: "1px solid rgba(52, 211, 153, 0.28)",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                style={{ background: "#34d399" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "#34d399" }}
              />
            </span>
            <span
              className="text-[0.72rem] tracking-wide"
              style={{ fontFamily: "var(--font-mono)", color: "#6ee7b7" }}
            >
              Available for new projects
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            className="eyebrow mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {brand.eyebrow}
          </motion.div>

          {/* Main heading */}
          <div className="mb-8">
            <AnimatedHeading text={heroHeadline} />
          </div>

          {/* Sub-headline */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p
              className="text-lg md:text-xl max-w-2xl leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {brand.description}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button onClick={scrollToContact} className="btn-primary">
              Start a Project
              <ArrowRight size={14} />
            </button>
            <button onClick={scrollToServices} className="btn-outline">
              Our Services
            </button>
          </motion.div>

          {/* Location */}
          <motion.p
            className="text-[10px] tracking-[0.3em] uppercase mt-6"
            style={{ color: "var(--text-subtle)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {brand.heroLocation}
          </motion.p>
          </div>

          {/* Recent Projects panel — right column */}
          <div className="hidden lg:block">
            <RecentProjects />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={scrollToServices}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--text-subtle)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--accent-cyan)" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* Accent bottom line */}
      <div className="absolute bottom-0 left-0 right-0 accent-line" />
    </section>
  );
}
