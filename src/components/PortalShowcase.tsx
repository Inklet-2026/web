"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SiObsidian, SiLogseq, SiNotion } from "react-icons/si";
import { TbBrandCraft } from "react-icons/tb";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const items = [
  {
    label: "Push",
    title: "Push anything, instantly",
    description:
      "Type, paste, or upload — Portal sends your content to the right display. Auto mode lets AI decide what goes where; Manual mode lets you choose the exact device and how long it stays.",
    src: "/portal/portal-home.png",
    alt: "inklet Portal push interface with Auto and Manual modes",
    width: 1220,
    height: 420,
  },
  {
    label: "Sync",
    title: "Your notes, always current",
    description:
      "Connect your favorite note-taking apps and set a sync cadence — manual, every 12 hours, daily, or weekly. Your displays always reflect your latest thinking.",
    src: "/portal/portal-sources.png",
    alt: "Portal sources panel showing Obsidian, Logseq, Notion, and Craft integrations",
    width: 750,
    height: 700,
  },
  {
    label: "Manual",
    title: "Choose where it goes",
    description:
      "Pick exactly which display — Study, Living Room, Desk — and how long content stays. From a 10-minute flash reminder to a full week of persistent reference.",
    src: "/portal/portal-manual.png",
    alt: "Portal manual mode with device selection and duration options",
    width: 630,
    height: 780,
  },
  {
    label: "Auto",
    title: "One tab away",
    description:
      "Portal reads your active tab and auto-suggests pushing the current page to your displays. Press Tab to accept — articles, recipes, references, sent in one keystroke.",
    src: "/portal/portal-extension.mp4",
    alt: "Portal auto-suggesting current webpage, press Tab to accept",
    width: 1200,
    height: 750,
    video: true,
  },
];

export default function PortalShowcase() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6 space-y-40">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              i % 2 === 1 ? "lg:[direction:rtl]" : ""
            }`}
          >
            <div className="lg:[direction:ltr]">
              {"video" in item ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto rounded-2xl"
                />
              )}
            </div>

            <div className="lg:[direction:ltr]">
              <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#555] tracking-[3px] uppercase mb-3">
                {item.label}
              </p>
              <h3 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-4">
                {item.title}
              </h3>
              <p className="text-[#888] leading-relaxed">
                {item.description}
              </p>
              {item.label === "Sync" && (
                <div className="flex items-center gap-6 mt-6">
                  {[
                    { Icon: SiObsidian, name: "Obsidian" },
                    { Icon: SiLogseq, name: "Logseq" },
                    { Icon: SiNotion, name: "Notion" },
                    { Icon: TbBrandCraft, name: "Craft" },
                  ].map(({ Icon, name }) => (
                    <div key={name} className="flex items-center gap-2">
                      <Icon size={16} className="text-[#555]" />
                      <span className="text-xs text-[#555] font-[family-name:var(--font-ibm-plex-mono)]">
                        {name}
                      </span>
                    </div>
                  ))}
                  <span className="text-xs text-[#444]">
                    & more on the way
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
