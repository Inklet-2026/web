import PortalHero from "@/components/PortalHero";
import PortalFeatures from "@/components/PortalFeatures";
import PortalShowcase from "@/components/PortalShowcase";

export const metadata = {
  title: "Portal - inklet",
  description:
    "inklet Portal — your cloud dashboard for ambient life. Manage all inklet displays from one place.",
  openGraph: {
    title: "Portal - inklet",
    description:
      "Your cloud dashboard for ambient life. Manage all inklet displays from one place.",
    url: "https://iminklet.com/portal",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Portal - inklet",
    description:
      "Your cloud dashboard for ambient life. Manage all inklet displays from one place.",
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function PortalPage() {
  return (
    <div className="bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <PortalHero />
      <PortalFeatures />
      <PortalShowcase />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Ready to orchestrate your ambient life?
          </p>
          <span className="inline-flex items-center px-8 py-4 bg-[#333] text-[#888] rounded-full text-sm font-medium cursor-default">
            Coming Soon
          </span>
        </div>
      </section>
    </div>
  );
}
