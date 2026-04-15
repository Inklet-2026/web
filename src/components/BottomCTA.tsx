"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const plans = [
  {
    name: "Single Display",
    original: 199,
    sale: 179,
    features: [
      "1 × inklet e-ink display",
      "1 month free cloud subscription ($20)",
      "Notion, Craft & Obsidian sync",
      "AI-powered content routing",
    ],
    savings: "$20 + $20 off",
    shipping: "Est. shipping by Q4 2026",
    highlight: false,
  },
  {
    name: "Home Bundle",
    original: 749,
    sale: 649,
    features: [
      "4 × inklet e-ink displays",
      "6 months free cloud subscription ($120)",
      "Cover every room — kitchen, study, hallway, bedroom",
      "AI-powered content routing",
    ],
    savings: "$100 + $120 off",
    shipping: "Est. shipping by Q4 2026",
    highlight: true,
  },
  {
    name: "Pro Bundle",
    subtitle: "Self-Hosted Edition",
    original: 1499,
    sale: 1099,
    features: [
      "4 × inklet e-ink displays",
      "1 × inklet compute hub",
      "Fully local — no cloud required",
      "All AI processing on your network",
    ],
    savings: "$400 off",
    shipping: "Est. shipping by Q2 2027",
    highlight: false,
  },
];

export default function BottomCTA() {
  return (
    <section id="pricing" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-4">
            Ready to think out loud?
          </h2>
          <p className="text-lg text-[#666]">
            Back us on Kickstarter at early-bird pricing.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col bg-white/50 ${
                plan.highlight
                  ? "ring-2 ring-[#1a1a1a]"
                  : "ring-1 ring-[#e8e5db]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f3ed] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-1">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] tracking-wide text-[#aaa]">
                    {plan.subtitle}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                    ${plan.sale}
                  </span>
                  <span className="text-[#bbb] text-xs">+ tax</span>
                  <span className="text-[#aaa] line-through text-sm">
                    ${plan.original}
                  </span>
                </div>
                <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] mt-1 block text-[#aaa]">
                  {plan.savings}
                </span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <HiOutlineCheck
                      className="shrink-0 mt-0.5 text-[#aaa]"
                      size={14}
                    />
                    <span className="text-[#666]">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[10px] text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)] mt-6 pt-4 border-t border-[#e8e5db]">
                {plan.shipping}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-center mt-12"
        >
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Back us on Kickstarter →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
