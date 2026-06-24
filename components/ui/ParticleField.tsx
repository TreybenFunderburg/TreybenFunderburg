"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

const ACCENT = "0, 212, 255"; // cyan — keep in sync with --accent-cyan

/**
 * Site-wide animated particle network on a single fixed canvas behind all
 * content. Particles drift and connect with faint lines; near the cursor they
 * light up and reach toward it. Tuned for performance — no per-particle radial
 * gradients (those tank the frame rate), capped count, and squared-distance
 * math to avoid sqrt in the hot path.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  // Cursor tracked in a ref so mousemove never triggers React renders.
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const seed = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Dense field — plenty of dots so the cursor interaction is obvious.
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      particles.current = Array.from({ length: Math.min(count, 220) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.5 + 0.25,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.004,
      }));
    };
    seed();

    const LINK = 100; // particle-to-particle link distance (short = cheap w/ many dots)
    const LINK2 = LINK * LINK;
    const MOUSE = 250; // cursor influence radius — wide so the effect is obvious
    const MOUSE2 = MOUSE * MOUSE;
    const MIN_SPEED = 0.22; // floor so the field never stalls
    const MAX_SPEED = 1.1; // ceiling so cursor pulls stay controlled

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const ps = particles.current;
      const m = mouse.current;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];

        // Cursor interaction: clear pull toward the cursor + a glowing link line.
        let near = 0;
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE2) {
            const dist = Math.sqrt(d2) || 1;
            const t = 1 - dist / MOUSE;
            near = t;
            p.vx += (dx / dist) * t * 0.16;
            p.vy += (dy / dist) * t * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${ACCENT}, ${t * 0.45})`;
            ctx.lineWidth = 0.5 + t * 0.8;
            ctx.stroke();
          }
        }

        // Constant lively drift, clamped to a speed band so it neither stalls
        // (looks frozen) nor flings off after a cursor pull.
        const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > MAX_SPEED) {
          p.vx *= MAX_SPEED / sp;
          p.vy *= MAX_SPEED / sp;
        } else if (sp < MIN_SPEED) {
          if (sp > 0.001) {
            p.vx *= MIN_SPEED / sp;
            p.vy *= MIN_SPEED / sp;
          } else {
            p.vx = (Math.random() - 0.5) * MIN_SPEED * 2;
            p.vy = (Math.random() - 0.5) * MIN_SPEED * 2;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        // Particle-to-particle links (squared distance, no sqrt until needed).
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const t = 1 - Math.sqrt(d2) / LINK;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${ACCENT}, ${t * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Dot — clearly brighter and larger near the cursor.
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse)) + near * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + near * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${Math.min(a, 1)})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => seed();
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
    />
  );
}
