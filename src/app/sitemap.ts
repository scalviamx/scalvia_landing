import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes } from "@/config/public-allowlist";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date("2026-08-01T00:00:00.000Z"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
