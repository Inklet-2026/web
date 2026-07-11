"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FAQ from "@/components/FAQ";
import { disambiguationFaq } from "@/data/about-faq";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

const TEAM = [
  { name: "Kevin Zhong", role: "Founder & Frontend", initials: "KZ" },
  { name: "Christian Wang", role: "Embedded Eng", initials: "CW" },
  { name: "Tony Qiu", role: "Backend Eng", initials: "TQ" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-80px" },
  variants: fadeUp,
} as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[3px] uppercase">
      {children}
    </p>
  );
}

export default function About() {
  return (
    <>
      {/* Hero — the story hook */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...inView} className="max-w-3xl">
            <Eyebrow>Company</Eyebrow>
            <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light leading-[1.12] mt-5 mb-8">
              Your information, out of your pocket — and into your space.
            </h1>
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
          </motion.div>
        </div>
      </section>

      {/* Philosophy — heading left */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-12">
          <motion.div {...inView} className="md:col-span-4">
            <Eyebrow>Why we build this</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-[34px] font-light leading-[1.25] mt-4">
              Information should find you, not the other way around.
            </h2>
          </motion.div>
          <motion.div {...inView} className="md:col-span-8 md:pt-1">
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
          </motion.div>
        </div>
      </section>

      {/* Vision — heading right (staggered) */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-12">
          <motion.div {...inView} className="md:col-span-4 md:order-2">
            <Eyebrow>Where we&apos;re headed</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-[34px] font-light leading-[1.25] mt-4">
              Ambient by default. Private by design.
            </h2>
          </motion.div>
          <motion.div {...inView} className="md:col-span-8 md:order-1 md:pt-1">
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
          </motion.div>
        </div>
      </section>

      {/* Team — a small team, on purpose */}
      <section className="border-t border-[#e8e5db] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...inView} className="text-center mb-14">
            <Eyebrow>Team</Eyebrow>
            <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mt-4">
              A small team, on purpose.
            </h2>
          </motion.div>
          <motion.div
            {...inView}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="flex flex-col items-center text-center border border-[#e0ddd6] rounded-2xl bg-[#fdfcf9] py-10 px-6"
              >
                <span className="w-16 h-16 rounded-full bg-[#eceae4] flex items-center justify-center font-[family-name:var(--font-newsreader)] text-xl text-[#888] mb-5">
                  {m.initials}
                </span>
                <div className="text-base font-medium">{m.name}</div>
                <div className="text-sm text-[#999] mt-1">{m.role}</div>
              </div>
            ))}
          </motion.div>
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
          <motion.p
            {...inView}
            className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8"
          >
            Love what we&apos;re making?
          </motion.p>
          <motion.div
            {...inView}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={KICKSTARTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Back us on Kickstarter →
            </a>
            <a
              href="mailto:core@iminklet.com"
              className="inline-flex items-center px-8 py-4 border border-[#e8e5db] text-[#666] rounded-full text-sm font-medium hover:border-[#ccc] hover:text-[#1a1a1a] transition-colors"
            >
              Contact us
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
