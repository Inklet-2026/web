import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Rise from "@/components/Rise";
import SocialProof from "@/components/SocialProof";
import { disambiguationFaq } from "@/data/about-faq";

const TEAM = [
  { name: "Kevin Zhong", role: "Founder & Software Engineer", photo: "/yiz.png" },
  { name: "Christian Wang", role: "Embedded Engineer", photo: "/ziqianw.png" },
  { name: "Tony Qiu", role: "Backend Engineer", photo: "/fuyuq.png" },
];

/*
 * The portraits are pencil drawings on a dark vignette. `multiply` drops the
 * white of the paper so the graphite sits straight on the page background —
 * no frame, no card, the way a drawing would actually read — and the radial
 * mask fades out the vignette that would otherwise show as a dark square.
 */
const PORTRAIT_MASK =
  "radial-gradient(ellipse 62% 70% at 50% 44%, #000 62%, transparent 88%)";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow text-[#aaa]">
      {children}
    </p>
  );
}

export default function About() {
  return (
    <>
      {/* Hero — the story hook */}
      <section className="pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <Rise>
              <Eyebrow>Company</Eyebrow>
              <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08] mt-5">
                Your information, out of your pocket — and into your space.
              </h1>
            </Rise>
            <Rise delay={0.15} className="mt-7">
              <p className="text-lg text-[#666] leading-relaxed mb-5">
                inklet is built by <strong className="font-medium text-[#1a1a1a]">inklet LLC</strong>. We
                design ambient e-ink displays — hardware and software that surface
                your notes, PDFs, tasks, and schedules on quiet, paper-like screens
                throughout your home.
              </p>
              <p className="text-lg text-[#666] leading-relaxed">
                Our first product, the{" "}
                <Link
                  href="/display"
                  className="underline underline-offset-[3px] hover:text-[#1a1a1a] transition-colors"
                >
                  inklet D1
                </Link>
                , isn&apos;t a phone, a tablet, or another glowing rectangle asking
                for your attention. It&apos;s a screen that lives in your space,
                shows you the right thing at the right moment — and then gets out of
                the way.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      {/* Philosophy — heading left */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <Eyebrow>Why we build this</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-[34px] font-light leading-[1.25] mt-4">
              Information should find you, not the other way around.
            </h2>
          </div>
          <div className="md:col-span-8 md:pt-1">
            <p className="text-[#666] leading-[1.8] mb-5">
              Everything you need to know already exists somewhere — a note, a
              document, a calendar, a list. But it&apos;s trapped behind a glowing
              screen that also holds a thousand other things competing for your
              attention. To read one line, you unlock, you search, and you get
              pulled into everything else.
            </p>
            <p className="text-[#666] leading-[1.8]">
              We think that&apos;s backwards. Technology should behave like good
              furniture: useful, quiet, and simply there when you need it. A
              glance should replace an unlock. The right information should appear
              where you already are — the kitchen, the desk, the hallway — without
              a notification, a feed, or a fight for your focus.
            </p>
          </div>
        </div>
      </section>

      {/* Vision — heading right (staggered) */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 md:order-2">
            <Eyebrow>Where we&apos;re headed</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-[34px] font-light leading-[1.25] mt-4">
              Ambient by default. Private by design.
            </h2>
          </div>
          <div className="md:col-span-8 md:order-1 md:pt-1">
            <p className="text-[#666] leading-[1.8] mb-5">
              We&apos;re building toward a home where computing recedes into the
              background — where a handful of ambient displays, coordinated by AI
              that can run entirely on your own network, quietly keep everyone in
              sync. No cloud required, no data leaving your walls, no new thing to
              check.
            </p>
            <p className="text-[#666] leading-[1.8]">
              Just the right information, in the right room, on paper-like screens
              that last months on a charge. To us, privacy isn&apos;t a feature we
              add later — it&apos;s the foundation everything else is built on.
            </p>
          </div>
        </div>
      </section>

      {/* Team — a small team, on purpose */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow>Team</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mt-4">
              A small team, on purpose.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2ded1]">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-center text-center px-6 py-10 sm:py-2"
              >
                <Image
                  src={m.photo}
                  alt={`${m.name}, ${m.role}`}
                  width={512}
                  height={512}
                  className="w-44 h-44 mb-4"
                  style={{
                    mixBlendMode: "multiply",
                    maskImage: PORTRAIT_MASK,
                    WebkitMaskImage: PORTRAIT_MASK,
                  }}
                />
                <div className="text-base font-medium">{m.name}</div>
                <div className="text-sm text-[#999] mt-1">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Name disambiguation — same accordion as the Display FAQ */}
      <div className="border-t border-[#e8e5db]">
        <FAQ
          items={disambiguationFaq}
          title="Frequently asked questions"
          id="faq"
        />
      </div>

      {/* CTA */}
      <section className="border-t border-[#e8e5db] py-28 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Love what we&apos;re making?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://discord.gg/pEpJSqMP7V"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Join us on Discord
            </a>
            <Link
              href="/journal"
              className="inline-flex items-center px-8 py-4 border border-[#e8e5db] text-[#666] rounded-full text-sm font-medium hover:border-[#ccc] hover:text-[#1a1a1a] transition-colors"
            >
              Read our Journal
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof widgets */}
      <SocialProof />
    </>
  );
}
