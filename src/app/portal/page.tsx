import PortalHero from "@/components/PortalHero";
import PortalFeatures from "@/components/PortalFeatures";
import PortalShowcase from "@/components/PortalShowcase";
import PortalDownload from "@/components/PortalDownload";
import { getPortalJsonLd } from "@/lib/structured-data";

const TITLE = "inklet Portal — Dashboard for Your Ambient E-Ink Displays";
const DESCRIPTION =
  "inklet Portal manages every inklet e-ink display from one dashboard — push notes and PDFs, sync Notion, Craft and Obsidian, and let AI route content by room.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/portal" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/portal",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function PortalPage() {
  return (
    <div className="bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <PortalHero />
      <PortalFeatures />
      <PortalShowcase />
      <PortalDownload />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getPortalJsonLd()) }}
      />
    </div>
  );
}
