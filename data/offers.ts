export interface Offer {
  id: string;
  icon: string;          // Lucide icon name — must exist in Services.tsx iconMap
  title: string;
  price: string;         // e.g. "$2,500 + $99/mo care"
  deliveryTime?: string; // e.g. "Launched in 2 weeks"
  description: string;
  features: string[];
}

export const offers: Offer[] = [
  {
    id: "starter-site",
    icon: "Monitor",
    title: "Starter Site",
    price: "$2,500 + $99/mo care",
    deliveryTime: "Launched in 2 weeks",
    description:
      "A clean, fast, mobile-ready website that gets your business online. Perfect for service businesses that need a professional presence without the complexity.",
    features: [
      "5 pages",
      "Mobile-first design",
      "SEO basics",
      "Contact form",
      "Launched in 2 weeks",
    ],
  },
  {
    id: "growth-site",
    icon: "Layers",
    title: "Growth Site",
    price: "$4,500 + $199/mo care",
    deliveryTime: "Launched in 4 weeks",
    description:
      "A custom-designed site built to capture leads and rank locally. Comes with a CMS you can update yourself, booking integration, and the local SEO setup to back it up.",
    features: [
      "Up to 10 pages",
      "Custom design",
      "CMS (edit your own content)",
      "Lead capture",
      "Local SEO",
      "Booking integration",
    ],
  },
  {
    id: "custom-build",
    icon: "Zap",
    title: "Custom Build",
    price: "From $7,500 + $349/mo care",
    description:
      "For businesses that need something bigger — e-commerce, member portals, CRMs, integrations, or multi-location platforms. We scope it to fit exactly what you need.",
    features: [
      "E-commerce",
      "Member portals",
      "CRM systems",
      "Third-party integrations",
      "Multi-location support",
      "Scoped per project",
    ],
  },
];
