"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { offers } from "@/data/offers";
import { ServiceCard, containerVariants } from "@/components/cards/ServiceCard";

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(0,212,255,0.045), transparent 70%)" }}
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
              className="font-display font-extrabold leading-none tracking-[-0.04em]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Our Packages
            </h2>
            <p className="lg:max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Three clear packages for businesses ready to grow online — or let&apos;s scope something
              custom. Pick the one that fits where you are right now.
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
          {offers.map((offer, i) => (
            <ServiceCard key={offer.id} service={offer} index={i} />
          ))}
        </motion.div>

        {/* Capabilities link */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a
            href="/capabilities"
            className="text-sm transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
          >
            Need something more specific? See our full capabilities →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
