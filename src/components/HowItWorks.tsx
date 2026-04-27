"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiNotion, SiObsidian } from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Capture from anywhere",
    description:
      "Send a note, save a recipe, clip a task — from your phone, your laptop, or straight from Notion, Craft, and Obsidian. inklet meets you where your ideas already live.",
    icons: true,
  },
  {
    number: "02",
    title: "AI sorts it for you",
    description:
      "Our on-device AI reads what you saved and figures out where it belongs. Work tasks route to your study. Recipes land in the kitchen. You never have to organize a thing.",
    icons: false,
  },
  {
    number: "03",
    title: "It just appears",
    description:
      "No notification. No buzz. The right screen quietly updates with exactly what you need, when you need it. e-ink means no backlight, no eye strain — it sits in your space like a picture frame, not a gadget.",
    icons: false,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20"
        >
          Three steps to calm clarity.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#aaa] tracking-wider">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {step.title}
              </h3>
              <p className="text-[#666] leading-relaxed text-[15px]">
                {step.description}
              </p>
              {step.icons && (
                <div className="flex items-center gap-4 mt-6 text-[#999]">
                  <SiNotion size={20} title="Notion" />
                  <HiOutlineDocumentText size={22} title="Craft" />
                  <SiObsidian size={20} title="Obsidian" />
                  <span className="text-xs text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)]">
                    + more
                  </span>
                </div>
              )}
              {step.number === "01" && (
                <Link
                  href="/store"
                  className="inline-block mt-4 text-xs text-[#aaa] hover:text-[#1a1a1a] transition-colors font-[family-name:var(--font-ibm-plex-mono)]"
                >
                  Learn more →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
