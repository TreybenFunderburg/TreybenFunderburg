"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Layers, Users, ShoppingBag, Zap, LucideIcon } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Layers,
  Users,
  ShoppingBag,
  Zap,
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const Icon = iconMap[service.icon] ?? Zap;

  return (
    <motion.div
      variants={cardVariants}
      className="glass glass-hover relative p-8 flex flex-col gap-6 group"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Number */}
      <div
        className="absolute top-6 right-6 text-[10px] tracking-widest font-mono"
        style={{ color: "var(--text-subtle)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center transition-all duration-300"
        style={{
          background: "rgba(0, 212, 255, 0.08)",
          border: "1px solid rgba(0, 212, 255, 0.2)",
          clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          color: "var(--accent-cyan)",
        }}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-lg leading-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-primary)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
        {service.description}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-subtle)" }}>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: "var(--accent-cyan)" }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: "linear-gradient(90deg, var(--accent-cyan), transparent)" }}
      />
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-6">What We Build</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-extrabold leading-none"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Our Services
            </h2>
            <p className="lg:max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              From single-page marketing sites to complex enterprise platforms — we engineer digital products
              that perform.
            </p>
          </div>
          <div className="accent-line mt-8" />
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
