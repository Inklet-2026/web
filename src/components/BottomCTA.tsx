"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function PriceTag({
  original,
  sale,
}: {
  original: number;
  sale: number;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-[family-name:var(--font-newsreader)] text-4xl font-light">
        ${sale}
      </span>
      <span className="text-[#aaa] line-through text-sm">${original}</span>
    </div>
  );
}

const plans = [
  {
    name: "Single Display",
    original: 199,
    sale: 179,
    features: [
      "1 × inklet e-ink display",
      "3 months cloud subscription free",
      "Notion, Craft & Obsidian sync",
      "AI-powered content routing",
    ],
    savings: "$20 off + $60 free cloud",
    highlight: false,
  },
  {
    name: "Home Bundle",
    original: 749,
    sale: 699,
    features: [
      "4 × inklet e-ink displays",
      "3 months cloud subscription free",
      "Cover every room — kitchen, study, hallway, bedroom",
      "AI-powered content routing",
    ],
    savings: "$50 off + $60 free cloud",
    highlight: true,
  },
  {
    name: "Home Bundle Pro",
    subtitle: "Self-Hosted Edition",
    original: 1499,
    sale: 1299,
    features: [
      "4 × inklet e-ink displays",
      "Gemma 4 compute hub included",
      "Fully local — no cloud required",
      "All AI processing on your network",
    ],
    savings: "$200 off",
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
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-[#1a1a1a] text-[#f5f3ed] ring-1 ring-[#333]"
                  : "bg-white/50 ring-1 ring-[#e8e5db]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f3ed] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1 rounded-full border border-[#444]">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-1">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <span
                    className={`text-xs font-[family-name:var(--font-ibm-plex-mono)] tracking-wide ${
                      plan.highlight ? "text-[#999]" : "text-[#aaa]"
                    }`}
                  >
                    {plan.subtitle}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <PriceTag original={plan.original} sale={plan.sale} />
                <span
                  className={`text-xs font-[family-name:var(--font-ibm-plex-mono)] mt-1 block ${
                    plan.highlight ? "text-[#888]" : "text-[#aaa]"
                  }`}
                >
                  Kickstarter early bird · {plan.savings}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <HiOutlineCheck
                      className={`shrink-0 mt-0.5 ${
                        plan.highlight ? "text-[#888]" : "text-[#aaa]"
                      }`}
                      size={14}
                    />
                    <span
                      className={
                        plan.highlight ? "text-[#ccc]" : "text-[#666]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={KICKSTARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center text-sm font-medium py-3 rounded-full transition-colors ${
                  plan.highlight
                    ? "bg-[#f5f3ed] text-[#1a1a1a] hover:bg-white"
                    : "bg-[#1a1a1a] text-[#f5f3ed] hover:bg-[#333]"
                }`}
              >
                Back us on Kickstarter
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
