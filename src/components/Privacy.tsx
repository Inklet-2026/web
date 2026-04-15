"use client";

import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineServer, HiOutlineWifi, HiOutlineCode } from "react-icons/hi";

const points = [
  { icon: HiOutlineWifi, text: "Self-hosted on your LAN" },
  { icon: HiOutlineServer, text: "On-device AI" },
  { icon: HiOutlineShieldCheck, text: "No cloud dependency" },
  { icon: HiOutlineCode, text: "Open-source friendly" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Privacy() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-8"
        >
          Your thoughts stay yours.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-lg text-[#666] leading-relaxed max-w-2xl mx-auto mb-16"
        >
          inklet offers a local compute hub* — every note, every query, every
          AI decision processed entirely on your home network. No cloud. No
          data leaves your walls. OTA updates are still delivered to keep your
          device secure and up to date. For families and professionals who
          believe privacy isn&apos;t a feature — it&apos;s a right.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {points.map((point) => (
            <div key={point.text} className="flex flex-col items-center gap-3">
              <point.icon className="text-[#888]" size={28} />
              <span className="text-sm text-[#666]">{point.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-xs text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)] mt-10"
        >
          * Only available with Pro Bundle
        </motion.p>
      </div>
    </section>
  );
}
