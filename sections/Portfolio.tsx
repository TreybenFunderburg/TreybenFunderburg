"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div variants={itemVariants} className="relative group">
      {/* Large faded number */}
      <div
        className="absolute -top-8 left-0 font-display font-extrabold leading-none pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(5rem, 12vw, 9rem)",
          color: "rgba(0, 212, 255, 0.04)",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`View ${project.name}`}
      >
        <div
          className="glass glass-hover relative p-8 md:p-12 cursor-none overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {/* Hover glow corner */}
          <div
            className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(0,212,255,0.08), transparent 70%)",
            }}
          />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Category + Year */}
              <div className="flex items-center gap-4 mb-4">
                <span className="tag">{project.category}</span>
                <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
                  {project.year}
                </span>
              </div>

              {/* Name */}
              <h3
                className="font-display font-bold mb-3 group-hover:text-glow-cyan transition-all duration-300"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                }}
              >
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6 max-w-xl" style={{ color: "var(--text-muted)" }}>
                {project.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-subtle)",
                }}
              >
                <motion.div
                  className="group-hover:rotate-45 group-hover:text-[var(--accent-cyan)] transition-all duration-300"
                >
                  <ArrowUpRight size={20} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div
            className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{ background: "linear-gradient(90deg, var(--accent-cyan), transparent)" }}
          />
        </div>
      </a>
    </motion.div>
  );
}

function ComingSoonCard() {
  return (
    <motion.div variants={itemVariants} className="relative">
      <div
        className="relative p-8 md:p-12 flex flex-col items-center justify-center min-h-48 text-center"
        style={{
          border: "1px dashed rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <div
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: "var(--text-subtle)" }}
        >
          More Coming Soon
        </div>
        <p className="text-sm max-w-xs" style={{ color: "var(--text-subtle)" }}>
          New projects launching soon. Stay tuned.
        </p>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow mb-6">Selected Work</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-extrabold leading-none"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Recent Projects
            </h2>
            <p className="lg:max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              A growing body of work — each project built with precision, purpose, and a relentless
              focus on results.
            </p>
          </div>
          <div className="accent-line mt-8" />
        </motion.div>

        {/* Projects */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <ComingSoonCard />
        </motion.div>
      </div>
    </section>
  );
}
