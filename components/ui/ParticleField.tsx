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
  glow: boolean; // a subset of dots get a soft pulsing halo
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
      const total = Math.min(count, 220);
      // ~1 in 6.5 dots glows + pulses for life without being distracting.
      particles.current = Array.from({ length: total }, () => {
        const glow = Math.random() < 0.15;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.26,
          radius: glow ? Math.random() * 1.6 + 1.2 : Math.random() * 1.3 + 0.7,
          alpha: Math.random() * 0.5 + 0.28,
          pulse: Math.random() * Math.PI * 2,
          // glowers pulse faster/wider so the field visibly breathes
          pulseSpeed: (glow ? 0.02 : 0.01) + Math.random() * 0.01,
          glow,
        };
      });
    };
    seed();

    const LINK = 110; // particle-to-particle link distance (the constellation)
    const LINK2 = LINK * LINK;
    const MOUSE = 190; // cursor influence radius — modest so it stays subtle
    const MOUSE2 = MOUSE * MOUSE;
    const MIN_SPEED = 0.09; // floor so the field never fully stalls
    const MAX_SPEED = 0.42; // ceiling — slow, calm drift

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
            // very gentle nudge — barely perceptible, just enough to feel alive
            p.vx += (dx / dist) * t * 0.04;
            p.vy += (dy / dist) * t * 0.04;
            // faint, thin link to the cursor (no bright star-burst)
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${ACCENT}, ${t * 0.16})`;
            ctx.lineWidth = 0.4 + t * 0.3;
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

        // Pulse 0..1 — used for both brightness and halo size.
        const pulse = 0.5 + 0.5 * Math.sin(p.pulse);

        // Soft pulsing halo for the subset of "glower" dots (and any dot the
        // cursor is touching) — this is what gives the field life.
        const haloStrength = p.glow ? 0.35 + 0.4 * pulse : near * 0.3;
        if (haloStrength > 0.04) {
          const haloR = (p.radius + 2) * (p.glow ? 4 + pulse * 3 : 5) + near * 6;
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
          g.addColorStop(0, `rgba(${ACCENT}, ${Math.min(haloStrength * 0.5, 0.6)})`);
          g.addColorStop(1, `rgba(${ACCENT}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Bright core — brighter when glowing/pulsing and slightly near cursor.
        const a =
          p.alpha * (p.glow ? 0.55 + 0.45 * pulse : 0.7 + 0.3 * pulse) +
          near * 0.35;
        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.radius + (p.glow ? pulse * 0.8 : 0) + near * 0.9,
          0,
          Math.PI * 2
        );
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
