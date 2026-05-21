"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { brand } from "@/config/brand";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = ["#00d4ff", "#00d4ff", "#3b82f6", "#8b5cf6", "#00d4ff"];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
    particles.current = Array.from({ length: Math.min(count, 90) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.015 + 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ps = particles.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));

        // Draw connections
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist / maxDist) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
        gradient.addColorStop(0, p.color + "30");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

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
      className="font-display font-extrabold tracking-tight"
      style={{
        fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
        fontFamily: "var(--font-syne)",
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
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const nameParts = brand.name.split(" ");
  const heroHeadline = nameParts.join("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Particle Canvas */}
      <ParticleCanvas />

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
        <div className="max-w-5xl">
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
            <button onClick={scrollToContact} className="btn-primary cursor-none">
              Start a Project
              <ArrowRight size={14} />
            </button>
            <button onClick={scrollToServices} className="btn-outline cursor-none">
              Our Services
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-none"
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
