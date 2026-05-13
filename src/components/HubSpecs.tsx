"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const specs = [
  { label: "SBC", value: "Orange Pi 6 Plus" },
  { label: "H1 Memory", value: "16GB" },
  { label: "H1 Pro Memory", value: "32GB" },
  { label: "H1 Model", value: "Gemma 4 E4B" },
  { label: "H1 Pro Model", value: "Gemma 4 26B A4B" },
  { label: "Connectivity", value: "Wi-Fi 6 · Bluetooth 5.3 · Ethernet" },
  { label: "Availability", value: "Est. Q2 2027" },
];

export default function HubSpecs() {
  return (
    <section className="py-32">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-16"
        >
          Under the hood.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="divide-y divide-[#e8e5db]"
        >
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline justify-between py-4"
            >
              <span className="text-sm text-[#888]">{spec.label}</span>
              <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#1a1a1a]">
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
