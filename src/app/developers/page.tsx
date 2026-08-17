import SdkHero from "@/components/SdkHero";
import SdkPush from "@/components/SdkPush";
import SdkLifecycle from "@/components/SdkLifecycle";
import SdkResources from "@/components/SdkResources";
import SdkGuardrails from "@/components/SdkGuardrails";
import SdkStart from "@/components/SdkStart";
import { getSdkJsonLd } from "@/lib/structured-data";

const TITLE = "inklet Portal SDK — Push Content to E-Ink Displays from Code";
const DESCRIPTION =
  "The server-side TypeScript SDK for inklet displays. Push text, links, images, and PDFs with one call — Inklet handles layout, routing, and rendering for the panel.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/developers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/developers",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function DevelopersPage() {
  return (
    <div className="bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <SdkHero />
      <SdkPush />
      <SdkLifecycle />
      <SdkResources />
      <SdkGuardrails />
      <SdkStart />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSdkJsonLd()) }}
      />
    </div>
  );
}
