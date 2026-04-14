"use client";

import { motion } from "framer-motion";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BottomCTA() {
  return (
    <section className="py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-6">
          Ready to think out loud?
        </h2>
        <p className="text-lg text-[#666] mb-10">
          Be the first to back inklet on Kickstarter.
        </p>
        <a
          href={KICKSTARTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Back us on Kickstarter →
        </a>
      </motion.div>
    </section>
  );
}
