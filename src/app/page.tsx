import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import HomePortal from "@/components/HomePortal";
import HomeSDK from "@/components/HomeSDK";
import { getFaqJsonLd } from "@/lib/structured-data";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

export const metadata = {
  title:
    "inklet — Ambient E-Ink Display for Notes, PDFs, and Your Second Brain",
  description:
    "inklet is an ambient e-ink display system that brings notes, PDFs, tasks, and useful information into the right room without another glowing screen.",
  alternates: { canonical: "https://iminklet.com" },
  openGraph: {
    title:
      "inklet — Ambient E-Ink Display for Notes, PDFs, and Your Second Brain",
    description:
      "inklet is an ambient e-ink display system that brings notes, PDFs, tasks, and useful information into the right room without another glowing screen.",
    url: "https://iminklet.com",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title:
      "inklet — Ambient E-Ink Display for Notes, PDFs, and Your Second Brain",
    description:
      "inklet is an ambient e-ink display system that brings notes, PDFs, tasks, and useful information into the right room without another glowing screen.",
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomePortal />
      <HomeSDK />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Information should find you,
            <br />
            not the other way around.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Learn more →
            </Link>
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border border-[#e8e5db] text-[#666] rounded-full text-sm font-medium hover:border-[#ccc] hover:text-[#1a1a1a] transition-colors"
            >
              Back us on Kickstarter
            </a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
    </>
  );
}
