"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function HomeHero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] mb-8"
        >
          Information should find you,
          <br />
          not the other way around.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.8, delay: 0.2 } } }}
          className="text-[#666] text-base md:text-lg leading-relaxed max-w-xl mx-auto"
        >
          Modern technology competes for your attention. We believe the answer to
          information fragmentation isn't to reject everything or accept it all
          uncritically — it's to organize and surface what matters, right where
          you need it.
        </motion.p>
      </div>
    </section>
  );
}
