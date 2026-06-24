import type { Metadata } from "next";
import { CapabilitiesGrid } from "@/components/cards/CapabilitiesGrid";
import { CapabilitiesCTA } from "@/components/ui/CapabilitiesCTA";

export const metadata: Metadata = {
  title: "Capabilities — Funderworks",
  description:
    "Everything Funderworks builds: websites, web applications, CRMs, e-commerce, integrations, and automation. Modern stacks, clean code, built to convert.",
};

export default function CapabilitiesPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.3 }} />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 relative">
          <div className="eyebrow mb-6">Capabilities</div>
          <h1
            className="font-display font-extrabold leading-none tracking-[-0.04em] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--text-primary)",
            }}
          >
            Everything we build.
          </h1>
          <p
            className="text-base leading-relaxed max-w-xl mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            The three packages on our homepage cover most projects. Here&apos;s the full picture
            of what&apos;s possible when we work together.
          </p>
          <div className="accent-line" />
        </div>
      </section>

      {/* Capabilities Grid */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.3 }} />
        <div className="max-w-7xl mx-auto px-6 relative">
          <CapabilitiesGrid />
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "var(--bg-surface)" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p
            className="text-base leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Got something that doesn&apos;t fit a neat category? That&apos;s usually the most
            interesting work.
          </p>
          <CapabilitiesCTA />
        </div>
      </section>
    </>
  );
}
