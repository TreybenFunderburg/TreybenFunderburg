import Image from "next/image";
import { brand } from "@/config/brand";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${brand.name} logo`}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.2))" }}
            />
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
              © {year} {brand.name}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-center" style={{ color: "var(--text-subtle)" }}>
              Charlotte, NC · {brand.email}
            </p>
            <p className="text-xs text-center" style={{ color: "var(--text-subtle)" }}>
              Built with Next.js · Deployed on Vercel
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={brand.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-300"
              style={{ color: "var(--text-subtle)" }}
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href={brand.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-300"
              style={{ color: "var(--text-subtle)" }}
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="p-2 transition-colors duration-300"
              style={{ color: "var(--text-subtle)" }}
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
