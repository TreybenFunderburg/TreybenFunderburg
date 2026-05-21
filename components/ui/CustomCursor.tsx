"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  const ringSpring = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = () => {
      isHovering.current = true;
      if (ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(0, 212, 255, 0.9)";
        ringRef.current.style.background = "rgba(0, 212, 255, 0.06)";
      }
    };

    const onLeave = () => {
      isHovering.current = false;
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "rgba(255, 255, 255, 0.3)";
        ringRef.current.style.background = "transparent";
      }
    };

    const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");

    window.addEventListener("mousemove", moveCursor);
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll("a, button, [data-cursor-hover]");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        id="cursor-dot"
        ref={dotRef}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#fff",
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        id="cursor-ring"
        ref={ringRef}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          background: "transparent",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
        }}
      />
    </>
  );
}
