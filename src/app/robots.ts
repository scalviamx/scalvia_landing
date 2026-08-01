import type { MetadataRoute } from "next";
import { SITE_ORIGIN, hiddenRoutes } from "@/config/public-allowlist";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = hiddenRoutes
    .filter((route) => route.path.startsWith("/"))
    .map((route) => route.path);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: disallowedPaths,
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}
