export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    icon: "Monitor",
    title: "Custom Website Design & Development",
    description:
      "Pixel-perfect, blazing-fast websites engineered to impress visitors and drive conversions from day one.",
    features: ["Responsive & Mobile-First", "SEO Optimized", "Performance-Tuned", "Custom CMS"],
  },
  {
    id: 2,
    icon: "Layers",
    title: "Full Stack Web Applications",
    description:
      "End-to-end application development with modern frameworks — from architecture through deployment.",
    features: ["React / Next.js", "Node.js Backends", "Database Design", "Cloud Deployment"],
  },
  {
    id: 3,
    icon: "Users",
    title: "CRM Systems & Business Software",
    description:
      "Purpose-built internal tools and CRM platforms that streamline operations and eliminate busywork.",
    features: ["Custom Workflows", "Data Dashboards", "Team Portals", "Automated Reporting"],
  },
  {
    id: 4,
    icon: "ShoppingBag",
    title: "E-Commerce Solutions",
    description:
      "High-converting storefronts and marketplaces built for growth, with seamless payment and inventory management.",
    features: ["Shopify / Custom", "Payment Integration", "Inventory Systems", "Analytics"],
  },
  {
    id: 5,
    icon: "Zap",
    title: "API Integrations & Automation",
    description:
      "Connect your tools, automate repetitive tasks, and build integrations that save your team hundreds of hours.",
    features: ["REST & GraphQL APIs", "Webhook Systems", "Third-Party Integrations", "Workflow Automation"],
  },
];
