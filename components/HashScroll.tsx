"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    // Run once on mount — if there's a hash in the URL, scroll to it after
    // a short delay so the page has time to render its sections
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Two attempts — immediate, and after a paint cycle, to handle slow renders
    scrollToHash();
    const timeout = setTimeout(scrollToHash, 100);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
