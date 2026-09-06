import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/journal";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestJournalDate = journalPosts
    .map((post) => post.publishedAt)
    .sort()
    .at(-1);

  // Omit dates where no reliable content modification date is recorded.
  // A new build does not mean every page's content changed.
  const pages: MetadataRoute.Sitemap = [
    { url: siteUrl() },
    { url: siteUrl("/display") },
    { url: siteUrl("/hub") },
    { url: siteUrl("/store") },
    { url: siteUrl("/portal") },
    { url: siteUrl("/about") },
    {
      url: siteUrl("/journal"),
      lastModified: latestJournalDate,
    },
    { url: siteUrl("/developers") },
    { url: siteUrl("/privacy-policy") },
  ];

  const posts: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: siteUrl(`/journal/${post.slug}`),
    lastModified: post.publishedAt,
  }));

  return [...pages, ...posts];
}
