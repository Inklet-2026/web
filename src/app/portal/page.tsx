import PortalHero from "@/components/PortalHero";
import PortalFeatures from "@/components/PortalFeatures";
import PortalShowcase from "@/components/PortalShowcase";
import PortalDownload from "@/components/PortalDownload";

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
      <PortalDownload />
    </div>
  );
}
