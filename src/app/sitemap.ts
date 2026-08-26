import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://iminklet.com";
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/display`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/hub`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/store`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/portal`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
    {
      url: `${baseUrl}/journal`,
      lastModified: new Date(`${journalPosts[0].publishedAt}T12:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${baseUrl}/developers`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), priority: 0.3 },
  ];

  const posts: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(`${post.publishedAt}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
