"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeDisplay() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-2 lg:order-1"
        >
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl md:text-4xl font-light mb-6">
            inklet Display D1
          </h2>
          <p className="text-[#666] leading-relaxed mb-8 max-w-md">
            An e-ink ambient display that blends into your space. No glowing
            screens, no notifications — just the right information, quietly
            appearing where you need it.
          </p>
          <Link
            href="/display"
            className="inline-flex items-center text-sm text-[#1a1a1a] border border-[#1a1a1a] px-6 py-3 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Discover more →
          </Link>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="order-1 lg:order-2"
        >
          <Image
            src="/inklet-v1-black.png"
            alt="inklet Display D1"
            width={900}
            height={675}
            className="w-[115%] max-w-none"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
