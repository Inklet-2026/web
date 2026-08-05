import DisplayHero from "@/components/DisplayHero";
import DisplayProblem from "@/components/DisplayProblem";
import HowItWorks from "@/components/HowItWorks";
import DisplayBento from "@/components/DisplayBento";
import DisplayVideo from "@/components/DisplayVideo";
import RoomShowcase from "@/components/RoomShowcase";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { getDisplayJsonLd } from "@/lib/structured-data";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

const TITLE =
  "inklet Display D1 — 7.5″ Ambient E-Ink Display for Notes, PDFs & Tasks";
const DESCRIPTION =
  "inklet D1 is a 7.5-inch ambient e-ink display that surfaces notes, PDFs, tasks, and schedules in the right room — AI-routed, months of battery, from $179.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/display" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/display",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function DisplayPage() {
  return (
    <>
      <DisplayHero />
      <DisplayProblem />
      <HowItWorks />
      <DisplayBento />
      <RoomShowcase />
      <DisplayVideo />
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
              className="inline-flex items-center px-8 py-4 border border-[#e8e5db] text-[#666] rounded-full text-sm font-medium hover:border-[#ccc] hover:text-[#1a1a1a] transition-colors"
            >
              Back us on Kickstarter
            </a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getDisplayJsonLd()) }}
      />
    </>
  );
}
