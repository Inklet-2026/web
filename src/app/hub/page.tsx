import HubHero from "@/components/HubHero";
import HubFeatures from "@/components/HubFeatures";
import HubSpecs from "@/components/HubSpecs";

export const metadata = {
  title: "Compute Hub H1 - inklet",
  description:
    "inklet Compute Hub H1 — on-device AI for your entire home. No cloud, no subscription. Powered by Orange Pi 6 Plus and Gemma 4.",
};

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
    </>
  );
}
