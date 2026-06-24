"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Building2,
  HardHat,
  Wine,
  TreePine,
  HeartPulse,
  Droplets,
  Sparkles,
  Palette,
  Globe,
  type LucideIcon,
} from "lucide-react";
import posthog from "posthog-js";
import { projects } from "@/data/projects";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Per-project icon + accent colour, keyed by slug. Chosen to "match" the work
 * and add colour so the list pops. ORDER curates a diverse cross-section of the
 * studio's work — SaaS products alongside websites across industries.
 */
const META: Record<string, { icon: LucideIcon; color: string }> = {
  foundry: { icon: Boxes, color: "#818cf8" }, // flagship CRM + payments platform — indigo
  "mainstay-hq": { icon: Building2, color: "#38bdf8" }, // property SaaS — sky
  buildledger: { icon: HardHat, color: "#f59e0b" }, // construction SaaS — amber
  "lumiere-gala-command": { icon: Wine, color: "#c084fc" }, // gala SaaS — wine purple
  "american-lumber-and-plywood": { icon: TreePine, color: "#84cc16" }, // lumber — lime
  "fun-chiropractic": { icon: HeartPulse, color: "#34d399" }, // healthcare — emerald
  "queen-city-plumbing": { icon: Droplets, color: "#22d3ee" }, // plumbing — cyan
  "vortex-express-car-wash": { icon: Sparkles, color: "#60a5fa" }, // car wash — blue
  "horyzon-studio": { icon: Palette, color: "#f472b6" }, // creative — pink
};

const ORDER = [
  "foundry",
  "mainstay-hq",
  "buildledger",
  "lumiere-gala-command",
  "american-lumber-and-plywood",
  "fun-chiropractic",
  "queen-city-plumbing",
  "vortex-express-car-wash",
  "horyzon-studio",
];

const bySlug = new Map(projects.map((p) => [p.slug, p]));
const items = ORDER.map((slug) => bySlug.get(slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p)
);

/**
 * Hero side panel — a glass card listing a diverse cross-section of recent work,
 * echoing the "Recent Projects" panel on resurgence.cloud.
 */
export function RecentProjects() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease }}
      className="glass p-5 w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span
          className="text-[0.7rem] uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent-cyan)" }}
        >
          Recent Projects
        </span>
        {/* Pulsing LIVE badge */}
        <span
          className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.62rem] tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#34d399",
            background: "rgba(52, 211, 153, 0.1)",
            border: "1px solid rgba(52, 211, 153, 0.25)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: "#34d399" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "#34d399" }}
            />
          </span>
          LIVE
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {items.map((p, i) => {
          const meta = META[p.slug] ?? { icon: Globe, color: "#00d4ff" };
          const Icon = meta.icon;
          return (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("hero_recent_project_clicked", { project: p.slug })
              }
              className="group flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors duration-200 hover:bg-white/[0.03]"
              style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)" }}
              whileHover={{ x: 3 }}
            >
              {/* Colored icon chip */}
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                style={{
                  color: meta.color,
                  background: `${meta.color}1f`,
                  border: `1px solid ${meta.color}40`,
                }}
              >
                <Icon size={16} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className="text-sm font-semibold truncate transition-colors duration-200"
                  style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                >
                  {p.name}
                </div>
                <div
                  className="text-[0.66rem] truncate"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-subtle)" }}
                >
                  {p.category} · {p.year}
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="shrink-0 opacity-30 transition-all duration-200 group-hover:opacity-100"
                style={{ color: meta.color }}
              />
            </motion.a>
          );
        })}
      </div>
    </motion.aside>
  );
}
