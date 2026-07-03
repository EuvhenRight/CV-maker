import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/builder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // NB: /analytics is intentionally omitted — internal dashboard, noindex.
  ];
}
