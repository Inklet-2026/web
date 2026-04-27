"use client";

import { motion } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const plans = [
  { name: "Monthly", price: "$10", period: "/mo", badge: null },
  { name: "Annual", price: "$100", period: "/yr", badge: "Save 17%" },
];

const features = [
  "Notion, Craft & Obsidian sync",
  "AI-powered content routing",
  "Cloud dashboard",
  "OTA firmware updates",
];

export default function StorePortalPricing() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
    >
      <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light text-center mb-12">
        inklet Portal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col bg-white/50 ${
              plan.badge
                ? "ring-2 ring-[#1a1a1a]"
                : "ring-1 ring-[#e8e5db]"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-[#f5f3ed] text-[10px] font-medium uppercase tracking-[2px] px-4 py-1 rounded-full">
                {plan.badge}
              </span>
            )}

            <h3 className="font-[family-name:var(--font-newsreader)] text-xl mb-4">
              {plan.name}
            </h3>

            <div className="mb-6">
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                {plan.price}
              </span>
              <span className="text-[#aaa] text-sm">{plan.period}</span>
            </div>

            <ul className="space-y-3 flex-1">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <HiOutlineCheck
                    className="shrink-0 mt-0.5 text-[#aaa]"
                    size={14}
                  />
                  <span className="text-[#666]">{feature}</span>
                </li>
              ))}
            </ul>

            <span className="mt-6 w-full text-center px-6 py-3 border border-[#e8e5db] text-[#bbb] rounded-full text-sm cursor-default select-none">
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
