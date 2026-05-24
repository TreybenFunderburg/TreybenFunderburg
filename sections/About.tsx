"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

const stats = [
  { value: "2–4 wk", label: "Typical Launch Time" },
  { value: "95+", label: "Lighthouse Performance" },
  { value: "Charlotte, NC", label: "Studio Home Base" },
];

const pillars = [
  "Precision engineering — clean code, zero shortcuts",
  "Speed without sacrifice — fast delivery, high quality",
  "Business-first thinking — built to drive results",
  "Ongoing partnership — we're invested in your growth",
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            right: "-10%",
            top: "20%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            right: "5%",
            top: "50%",
            width: "320px",
            height: "320px",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: "2px",
            transform: "translateY(-50%) rotate(12deg)",
          }}
        />
        <div
          className="absolute hidden lg:block"
          style={{
            right: "8%",
            top: "50%",
            width: "240px",
            height: "240px",
            border: "1px solid rgba(0,212,255,0.06)",
            borderRadius: "2px",
            transform: "translateY(-46%) rotate(6deg)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="eyebrow mb-8">Who We Are</div>

              <h2
                className="font-display font-extrabold leading-none mb-8"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  color: "var(--text-primary)",
                }}
              >
                Small Team.
                <br />
                <span style={{ color: "var(--accent-cyan)" }}>Elite Output.</span>
              </h2>

              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                Based in Charlotte, NC, Funderworks is a focused, senior-level development studio that moves
                fast and builds things right. No bloated teams, no endless meetings — just a small group of
                craftspeople who care deeply about the quality and impact of every product we ship.
              </p>

              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)" }}>
                Whether you&apos;re a contractor, a clinic, a restaurant, or a service business ready to grow
                online, we bring the same technical depth and creative ambition to every engagement. Bigger
                custom builds — internal tools, e-commerce, multi-location platforms — get the same standard.
              </p>

              <div className="accent-line mb-10" />
            </motion.div>

            {/* Pillars */}
            <motion.ul
              className="flex flex-col gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {pillars.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <CheckCircle
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--accent-cyan)" }}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="glass relative p-8 overflow-hidden group"
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 8 }}
              >
                <div className="stat-number mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>

                {/* Hover accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top"
                  style={{ background: "var(--accent-cyan)" }}
                />
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div
              className="glass p-6 flex items-center gap-4"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#22c55e" }}
                />
                <div
                  className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                  style={{ background: "rgba(34, 197, 94, 0.4)" }}
                />
              </div>
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Currently Accepting Projects
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Limited spots available — reach out today
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
