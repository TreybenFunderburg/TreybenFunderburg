import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: brand.seo.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${brand.seo.url}/capabilities`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
