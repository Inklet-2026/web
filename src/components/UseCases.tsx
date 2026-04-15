"use client";

import { motion } from "framer-motion";
import EInkDisplay from "@/components/EInkDisplay";
import type { Screen } from "@/data/screens";
import { screens as allScreens } from "@/data/screens";

const useCases = [
  {
    tagline: "Tonight's dinner, at a glance",
    description:
      "Recipes, grocery lists, meal plans — right where you cook.",
  },
  {
    tagline: "Your focus list, front and center",
    description: "Tasks, deadlines, meeting notes — no phone required.",
  },
  {
    tagline: "Weather, calendar, family schedule",
    description: "The household dashboard everyone walks past.",
  },
  {
    tagline: "Wake up to what matters",
    description: "Sleep data, morning briefing, daily intention.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function UseCases() {
  return (
    <section id="use-cases" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20"
        >
          One brain, every room.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {useCases.map((useCase, i) => (
            <motion.div
              key={allScreens[i].label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <EInkDisplay
                screens={[allScreens[i]]}
                animated={false}
                showLabel={false}
              />
              <div className="mt-6">
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs text-[#aaa] uppercase tracking-[3px]">
                  {allScreens[i].label}
                </span>
                <h3 className="font-[family-name:var(--font-newsreader)] text-xl mt-2 mb-2">
                  {useCase.tagline}
                </h3>
                <p className="text-[#666] text-sm">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
