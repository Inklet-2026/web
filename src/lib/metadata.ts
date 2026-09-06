import type { Metadata } from "next";
import { SITE_NAME, siteUrl } from "@/lib/site";

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = siteUrl(path);
  const image = {
    url: siteUrl("/social-image.png"),
    width: 1200,
    height: 630,
    alt: "inklet ambient e-ink displays",
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    // Next.js replaces nested metadata objects instead of merging them.
    // Each page must include the shared Open Graph fields explicitly.
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@inkletLLC",
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
