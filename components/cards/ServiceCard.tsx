"use client";

import { motion } from "framer-motion";
import { Monitor, Layers, Users, ShoppingBag, Zap, LucideIcon } from "lucide-react";

// Satisfies both Service (no price) and Offer (with price)
export interface CardItem {
  icon: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  deliveryTime?: string;
}

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Layers,
  Users,
  ShoppingBag,
  Zap,
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function ServiceCard({ service, index }: { service: CardItem; index: number }) {
  const Icon = iconMap[service.icon] ?? Zap;

  return (
    <motion.div
      variants={cardVariants}
      className="glass glass-hover relative p-8 flex flex-col gap-6 group"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Watermark index — big faint number behind the content */}
      <span
        aria-hidden="true"
        className="absolute top-2 right-5 font-display font-extrabold leading-none pointer-events-none select-none"
        style={{ fontSize: "5.5rem", color: "rgba(255, 255, 255, 0.035)", zIndex: 0 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

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
        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
        {service.description}
      </p>

      {/* Price — only rendered when present (Offer cards, not capability cards) */}
      {service.price && (
        <div
          className="pt-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="text-sm font-semibold" style={{ color: "var(--accent-cyan)" }}>
            {service.price}
          </div>
          {service.deliveryTime && (
            <div className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>
              {service.deliveryTime}
            </div>
          )}
        </div>
      )}

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
