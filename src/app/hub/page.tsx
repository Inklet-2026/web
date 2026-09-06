import { createPageMetadata } from "@/lib/metadata";
import HubHero from "@/components/HubHero";
import HubFeatures from "@/components/HubFeatures";
import HubSpecs from "@/components/HubSpecs";
import { getHubJsonLd } from "@/lib/structured-data";

const TITLE = "inklet H1 - Private AI Hub for E-Ink Displays";
const DESCRIPTION =
  "inklet H1 runs Gemma 4 locally on your home network to route notes, PDFs, and tasks to your inklet e-ink displays. No cloud, no subscription.";

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/hub",
});

export default function HubPage() {
  return (
    <>
      <HubHero />
      <HubFeatures />
      <HubSpecs />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Ready to run AI on your own terms?
          </p>
          <span className="inline-flex items-center px-8 py-4 bg-[#ccc] text-[#888] rounded-full text-sm font-medium cursor-default">
            Available Soon
          </span>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHubJsonLd()) }}
      />
    </>
  );
}
