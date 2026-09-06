import { createPageMetadata } from "@/lib/metadata";
import SdkHero from "@/components/SdkHero";
import SdkPush from "@/components/SdkPush";
import SdkLifecycle from "@/components/SdkLifecycle";
import SdkResources from "@/components/SdkResources";
import SdkGuardrails from "@/components/SdkGuardrails";
import SdkStart from "@/components/SdkStart";
import { getSdkJsonLd } from "@/lib/structured-data";

const TITLE = "inklet SDK - TypeScript for E-Ink Displays";
const DESCRIPTION =
  "Push text, links, images, and PDFs to inklet e-ink displays with the TypeScript SDK. inklet handles layout, room routing, and rendering.";

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/developers",
});

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
