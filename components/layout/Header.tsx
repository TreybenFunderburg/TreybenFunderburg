"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { brand } from "@/config/brand";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40));
  }, [scrollY]);

  const handleNav = (href: string) => {
    setMobileOpen(false);

    // Full path navigation (e.g. /capabilities)
    if (href.startsWith("/") && !href.startsWith("/#")) {
      router.push(href);
      return;
    }

    // Hash anchor handling
    const hash = href.startsWith("#") ? href : href.slice(1); // normalize "/#about" -> "#about"

    // If we're not on the homepage, route to the homepage with the hash so the
    // browser scrolls to the section after navigation
    if (pathname !== "/") {
      router.push(`/${hash}`);
      return;
    }

    // We're on the homepage — scroll to the anchor
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => {
              if (pathname !== "/") {
                router.push("/");
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-3 group cursor-none"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold"
              style={{
                background: "var(--accent-cyan)",
                color: "#000",
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
              }}
            >
              {brand.shortName}
            </div>
            <span
              className="text-sm font-semibold tracking-widest uppercase hidden sm:block"
              style={{ color: "var(--text-primary)", letterSpacing: "0.15em" }}
            >
              {brand.name}
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-xs tracking-widest uppercase transition-colors duration-300 cursor-none"
                style={{ color: "var(--text-muted)" }}
                whileHover={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.4 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleNav("#contact")}
              className="btn-primary text-xs cursor-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Start a Project
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white cursor-none p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "rgba(10, 10, 10, 0.98)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-2xl font-display font-bold uppercase tracking-widest cursor-none"
                  style={{ color: "var(--text-muted)" }}
                  whileHover={{ color: "var(--accent-cyan)", x: 8 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => handleNav("#contact")}
                className="mt-4 btn-primary cursor-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Start a Project
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
