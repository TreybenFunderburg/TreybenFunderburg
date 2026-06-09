export interface Project {
  id: number;
  slug: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  year: string;
  featured: boolean;
}

// Add new projects by appending to this array — no component changes needed
export const projects: Project[] = [
  {
    id: 1,
    slug: "american-lumber-and-plywood",
    name: "American Lumber & Plywood",
    url: "https://lumber-and-plywood.vercel.app/",
    description:
      "A clean B2B site for a wholesale building materials supplier — nationwide shipping, cut-to-size services, and a buying experience built for contractors.",
    longDescription:
      "A clean B2B site for a wholesale building materials supplier — nationwide shipping, cut-to-size services, and a buying experience built for contractors.",
    tags: ["Next.js", "Tailwind", "B2B", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 2,
    slug: "fun-chiropractic",
    name: "Fun Chiropractic",
    url: "https://funchiropractic.net",
    description: "Chiropractic clinic website with modern design and online booking",
    longDescription:
      "A full-featured clinic website built to convert new patients, featuring streamlined online booking, service pages, and a professional brand presence that builds trust before the first visit.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    category: "Healthcare",
    year: "2024",
    featured: true,
  },
  {
    id: 3,
    slug: "queen-city-plumbing",
    name: "Queen City Plumbing",
    url: "https://queencity.funderworks.studio",
    description:
      "A complete local business site for a Charlotte plumbing company — built to rank locally, load fast, and convert emergency callers into booked jobs.",
    longDescription:
      "A complete local business site for a Charlotte plumbing company — built to rank locally, load fast, and convert emergency callers into booked jobs.",
    tags: ["Local SEO", "Next.js", "Tailwind"],
    category: "Spec Work",
    year: "2026",
    featured: true,
  },
  {
    id: 4,
    slug: "cedar-park-family-dental",
    name: "Cedar Park Family Dental",
    url: "https://cedarpark.funderworks.studio",
    description:
      "A clean, trust-forward site for a Charlotte family dental practice — calm palette, clear services, and a booking flow designed for new patient conversion.",
    longDescription:
      "A clean, trust-forward site for a Charlotte family dental practice — calm palette, clear services, and a booking flow designed for new patient conversion.",
    tags: ["Local Business", "Next.js", "Tailwind"],
    category: "Spec Work",
    year: "2026",
    featured: true,
  },
  {
    id: 5,
    slug: "art-of-aesthetics",
    name: "Art of Aesthetics",
    url: "https://artofestheticsspa.com/",
    description: "Creative studio portfolio with elegant visual presentation",
    longDescription:
      "A sophisticated portfolio site for a creative studio that puts the work front and center, with editorial typography, refined animations, and a visual identity that speaks to high-end clientele.",
    tags: ["Next.js", "Framer Motion", "TypeScript", "Design"],
    category: "Creative",
    year: "2024",
    featured: true,
  },
  {
    id: 6,
    slug: "dc-slurry-and-striping",
    name: "D&C Slurry & Striping",
    url: "https://dc-slurry-and-striping.vercel.app/",
    description:
      "A conversion-focused site for a Southern California parking lot maintenance company with 45,000+ completed projects — services, project gallery, and a free estimate flow.",
    longDescription:
      "A conversion-focused site for a Southern California parking lot maintenance company with 45,000+ completed projects — services, project gallery, and a free estimate flow.",
    tags: ["Next.js", "Tailwind", "Local Business", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 7,
    slug: "lukkes-striping-prestige",
    name: "Lukkes Striping — Prestige",
    url: "https://lukkes-striping.vercel.app/prestige",
    description:
      "A prestige landing page for a union-certified pavement contractor targeting stadiums, theme parks, and institutional venues — credential-forward design built for high-stakes bids.",
    longDescription:
      "A prestige landing page for a union-certified pavement contractor targeting stadiums, theme parks, and institutional venues — credential-forward design built for high-stakes bids.",
    tags: ["Next.js", "Tailwind", "B2B", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 8,
    slug: "lukkes-striping-kinetic",
    name: "Lukkes Striping — Kinetic",
    url: "https://lukkes-striping.vercel.app/kinetic",
    description:
      "A bold, high-energy landing page for a union pavement contractor serving Southern California's largest venues — built for overnight mobilization requests and fast bid conversions.",
    longDescription:
      "A bold, high-energy landing page for a union pavement contractor serving Southern California's largest venues — built for overnight mobilization requests and fast bid conversions.",
    tags: ["Next.js", "Tailwind", "B2B", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 9,
    slug: "saunders-supply",
    name: "Saunders Supply Company",
    url: "https://saunders-supply.vercel.app/",
    description:
      "A modern storefront site for a 75-year-old building materials supplier in Suffolk, Virginia — organized product lines, contractor accounts, and local service info.",
    longDescription:
      "A modern storefront site for a 75-year-old building materials supplier in Suffolk, Virginia — organized product lines, contractor accounts, and local service info.",
    tags: ["Next.js", "Tailwind", "Local Business", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 10,
    slug: "vortex-express-car-wash",
    name: "Vortex Express Car Wash",
    url: "https://vortex-car-wash.vercel.app/",
    description:
      "A space-themed site for a locally-owned express car wash in Suffolk, VA — tiered wash packages, unlimited membership signup, and fleet plan conversions.",
    longDescription:
      "A space-themed site for a locally-owned express car wash in Suffolk, VA — tiered wash packages, unlimited membership signup, and fleet plan conversions.",
    tags: ["Next.js", "Tailwind", "Local Business", "Vercel"],
    category: "Commercial",
    year: "2025",
    featured: true,
  },
  {
    id: 11,
    slug: "horyzon-studio",
    name: "Horyzon Studio",
    url: "https://house-showcase-bice.vercel.app/",
    description:
      "A minimal, concept-forward portfolio for a creative design studio — clean spatial layouts and refined visual presentation.",
    longDescription:
      "A minimal, concept-forward portfolio for a creative design studio — clean spatial layouts and refined visual presentation.",
    tags: ["Next.js", "Tailwind", "Design", "Vercel"],
    category: "Creative",
    year: "2025",
    featured: true,
  },
];
