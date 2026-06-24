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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
  {
    id: 11,
    slug: "lumiere-gala-command",
    name: "Lumière — Gala Command Suite",
    url: "https://events-coordinator.vercel.app/",
    description:
      "An elegant event management platform for high-end fundraising galas — guest intelligence, drag-and-drop seating, live auctions, and lightning-fast check-in.",
    longDescription:
      "An elegant event management platform for high-end fundraising galas — guest intelligence, drag-and-drop seating, live auctions, and lightning-fast check-in.",
    tags: ["Next.js", "Tailwind", "SaaS", "Vercel"],
    category: "Software",
    year: "2025",
    featured: true,
  },
  {
    id: 16,
    slug: "foundry",
    name: "Foundry",
    url: "https://foundry.resurgence.cloud/",
    description:
      "A full-stack CRM and payments platform — the cloud that powers client businesses end to end, from pipelines and automations to integrated billing.",
    longDescription:
      "Foundry is our full CRM and payment system: a unified cloud platform that runs the back office for client businesses — contact and pipeline management, marketing automations, dashboards, and integrated payments. It's the foundation products like MainstayHQ and BuildLedger are built on.",
    tags: ["SaaS", "CRM", "Payments", "Platform"],
    category: "Software",
    year: "2026",
    featured: true,
  },
  {
    id: 13,
    slug: "mainstay-hq",
    name: "MainstayHQ",
    url: "https://mainstayhq.deploys.resurgence.cloud",
    description:
      "A property management platform that unifies units, leases, maintenance, and online rent collection into a single dashboard for landlords and property managers.",
    longDescription:
      "A property management SaaS that replaces the patchwork of spreadsheets and disconnected tools — track occupancy across an entire portfolio, manage individual lease details, handle maintenance requests, and collect rent online, all from one dashboard.",
    tags: ["SaaS", "Next.js", "PropTech", "Dashboard"],
    category: "Software",
    year: "2026",
    featured: true,
  },
  {
    id: 14,
    slug: "buildledger",
    name: "BuildLedger",
    url: "https://buildledger.deploys.resurgence.cloud/",
    description:
      "A construction financial platform that brings estimating, proposals, change orders, invoicing, and job costing into one place — no more re-entering data across tools.",
    longDescription:
      "An integrated platform for builders and contractors that runs a project from bid to closeout — estimating and takeoffs, branded proposals with e-signatures, automated change orders, client selection portals, and real-time budget-vs-actual job costing organized by custom cost codes.",
    tags: ["SaaS", "Construction", "Next.js", "Dashboard"],
    category: "Software",
    year: "2026",
    featured: true,
  },
  {
    id: 15,
    slug: "my-happy-family",
    name: "My Happy Family",
    url: "https://mhf-website.vercel.app/",
    description:
      "A corporate site for a second-generation family enterprise spanning real estate development, property management, and multi-unit franchise operations.",
    longDescription:
      "A polished corporate presence for My Happy Family — a family-run business operating across development, operations, and management, from residential and commercial real estate to a portfolio of Burger King franchises across Virginia and Pennsylvania. The site conveys hands-on, community-first ownership at scale.",
    tags: ["Next.js", "Tailwind", "Corporate", "Vercel"],
    category: "Commercial",
    year: "2026",
    featured: true,
  },
  {
    id: 12,
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
];
