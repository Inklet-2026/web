"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const integrations = [
  { label: "Calendar", value: "Google Calendar · Apple Calendar" },
  { label: "Notes", value: "Notion · Obsidian · Craft" },
  { label: "Tasks", value: "Todoist · Apple Reminders" },
  { label: "Weather", value: "Built-in" },
  { label: "Smart Home", value: "HomeKit · Home Assistant" },
  { label: "Custom", value: "Portal SDK" },
];

export default function PortalIntegrations() {
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
          Works with your tools.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="divide-y divide-[#333]"
        >
          {integrations.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between py-4"
            >
              <span className="text-sm text-[#666]">{item.label}</span>
              <span className="text-sm font-[family-name:var(--font-ibm-plex-mono)] text-[#f5f3ed]">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
