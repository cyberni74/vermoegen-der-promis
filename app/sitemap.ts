import type { MetadataRoute } from "next";
import { getAllArticles, getCategories } from "@/lib/articles";
import { getSiteUrl, PUBLISHED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date(PUBLISHED);
  const staticPaths = ["", "/vermoegen", "/ueber-uns", "/impressum", "/datenschutz"];
  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path || "/"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...getCategories().map((category) => ({
      url: `${base}/kategorie/${category.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...getAllArticles().map((article) => ({
      url: `${base}/vermoegen/${article.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
