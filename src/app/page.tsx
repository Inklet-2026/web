import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import HomePortal from "@/components/HomePortal";
import HomeSDK from "@/components/HomeSDK";
import { getFaqJsonLd } from "@/lib/structured-data";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

/* Blur radius doubles as the band tightens toward the edge. */
const BLUR_STEPS = [
  { blur: 2, reach: 100 },
  { blur: 5, reach: 72 },
  { blur: 12, reach: 44 },
  { blur: 26, reach: 20 },
];

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
      {/*
        Full-bleed closing band. The newsprint sits still while the section
        scrolls over it — the page reads as a window cut through to something
        fixed behind it. bg-scroll on small screens because iOS ignores fixed
        attachment and stretches the image instead.
      */}
      <section className="relative isolate overflow-hidden py-36 md:py-48 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{ backgroundImage: "url(/newsprint.jpg)" }}
        />

        {/*
          One even wash over the whole image — not a radial one. Anywhere the
          veil changes density it draws an edge of its own, which is exactly
          the seam that showed up before.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          style={{
            background: [
              // Resolve to paper before the section ends — the footer draws
              // its own top rule, and an image dying on that line reads as a
              // hard edge however soft the fade is.
              "linear-gradient(to bottom, #f5f3ed 0%, rgba(245,243,237,0) 18%, rgba(245,243,237,0) 74%, #f5f3ed 94%, #f5f3ed 100%)",
              "rgba(245,243,237,0.86)",
            ].join(", "),
          }}
        />

        {/*
          Progressive blur sits *above* the wash, so what gets blurred is the
          finished, evenly veiled picture. Blurring the bare photograph and
          then laying a veil over it leaves the veil crisp — that mismatch is
          what read as a line.
        */}
        {(["top", "bottom"] as const).map((edge) => (
          <div
            key={edge}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 -z-10 h-32 md:h-44 ${
              edge === "top" ? "top-0" : "bottom-0"
            }`}
          >
            {BLUR_STEPS.map(({ blur, reach }) => {
              // Solid at the outer edge, fading to nothing `reach`% inward —
              // stops must ascend or the browser clamps them into a hard line.
              const dir = edge === "top" ? "to top" : "to bottom";
              const mask = `linear-gradient(${dir}, transparent ${100 - reach}%, #000 100%)`;
              return (
                <div
                  key={blur}
                  className="absolute inset-0"
                  style={{
                    backdropFilter: `blur(${blur}px)`,
                    WebkitBackdropFilter: `blur(${blur}px)`,
                    maskImage: mask,
                    WebkitMaskImage: mask,
                  }}
                />
              );
            })}
          </div>
        ))}

        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-10">
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
              className="inline-flex items-center px-8 py-4 bg-[#f5f3ed]/70 backdrop-blur-[2px] border border-[#d8d3c6] text-[#555] rounded-full text-sm font-medium hover:bg-[#f5f3ed] hover:text-[#1a1a1a] transition-colors"
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
