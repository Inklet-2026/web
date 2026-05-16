"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "One dashboard, every display",
    description:
      "Control what appears on every inklet display from a single place. Update content, check status, and manage rooms — all from your browser or phone.",
  },
  {
    number: "02",
    title: "Sync the tools you use",
    description:
      "Connect Google Calendar, Notion, Obsidian, Todoist, and more. Your data flows in automatically — no copy-paste, no manual updates.",
  },
  {
    number: "03",
    title: "AI-powered routing",
    description:
      "Portal's AI decides what goes where. Recipes to the kitchen, meeting agendas to the study, weather to the hallway — context-aware, hands-free.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PortalFeatures() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-center mb-20"
        >
          Your displays, orchestrated.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature) => (
            <motion.div
              key={feature.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#555] tracking-wider">
                {feature.number}
              </span>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl mt-3 mb-4">
                {feature.title}
              </h3>
              <p className="text-[#888] leading-relaxed text-[15px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
