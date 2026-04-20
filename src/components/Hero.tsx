import EInkDisplay from "@/components/EInkDisplay";
import { screens } from "@/data/screens";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Left: Copy */}
        <div>
          <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-[1.1] mb-6">
            Your second brain,
            <br />
            on eInk display.
          </h1>
          <p className="text-lg text-[#666] leading-relaxed max-w-lg mb-10">
            inklet is a family of e-ink displays that surface the right
            information in the right room — powered by AI, synced from the tools
            you already use. No glowing screens. No pings. Just clarity,
            everywhere.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Back us on Kickstarter
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-6 py-3 text-[#666] text-sm hover:text-[#1a1a1a] transition-colors"
            >
              Learn more ↓
            </a>
          </div>
        </div>

        {/* Right: E-ink device */}
        <div className="flex justify-center lg:justify-end">
          <EInkDisplay screens={screens} />
        </div>
      </div>
    </section>
  );
}
