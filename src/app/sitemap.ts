import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://iminklet.com";
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/display`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/store`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/portal`, lastModified: new Date(), priority: 0.5 },
  ];
}
