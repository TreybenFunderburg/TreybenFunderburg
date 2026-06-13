"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function CapabilitiesCTA() {
  return (
    <Link
      href="/#contact"
      className="btn-primary"
      onClick={() => posthog.capture("capabilities_cta_clicked")}
    >
      Let&apos;s talk →
    </Link>
  );
}
