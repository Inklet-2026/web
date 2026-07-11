import DisplayHero from "@/components/DisplayHero";
import HowItWorks from "@/components/HowItWorks";
import DisplayBento from "@/components/DisplayBento";
import RoomShowcase from "@/components/RoomShowcase";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import Link from "next/link";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

export const metadata = {
  title: "Display D1 - inklet",
  description:
    "inklet Display D1 is an ambient e-ink display that surfaces the right information in the right room — powered by AI.",
  openGraph: {
    title: "Display D1 - inklet",
    description:
      "An ambient e-ink display that surfaces the right information in the right room — powered by AI.",
    url: "https://iminklet.com/display",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Display D1 - inklet",
    description:
      "An ambient e-ink display that surfaces the right information in the right room — powered by AI.",
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function DisplayPage() {
  return (
    <>
      <DisplayHero />
      <DisplayBento />
      <HowItWorks />
      <RoomShowcase />
      <Privacy />
      <FAQ />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Ready to bring calm to every room?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/store"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Build my own →
            </Link>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
            >
              Back us on Kickstarter →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
