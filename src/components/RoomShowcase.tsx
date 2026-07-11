"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Room {
  label: string;
  subtitle: string;
  title: string;
  detail: string;
  caption: string;
}

const ROOMS: Room[] = [
  {
    label: "Kitchen",
    subtitle: "Grocery run",
    title: "12 items —\nfarmers market",
    detail: "synced from your phone · 8:04 am",
    caption: "Lists live where you cook.",
  },
  {
    label: "Study",
    subtitle: "Focus — 3 tasks left",
    title: "Ship landing page\nby Friday",
    detail: "next: review PR #42 · standup 2pm",
    caption: "Tasks wait at your desk.",
  },
  {
    label: "Bedside",
    subtitle: "Wind down",
    title: "Tomorrow:\n3 meetings, rain",
    detail: "first call 9:30 · umbrella by the door",
    caption: "Tomorrow, before you sleep.",
  },
];

// Static status bar — mirrors the homepage simulator, but frozen (no live clock)
function StaticStatusBar() {
  return (
    <div className="absolute top-1.5 left-2 right-2 lg:top-2 lg:left-3 lg:right-3 flex items-center justify-between z-[7] eink-label-text">
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[6px] lg:text-[8px] text-[#999]">
        Apr 14  09:41
      </span>
      <div className="flex items-center gap-0.5 lg:gap-1">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[6px] lg:text-[8px] text-[#999]">
          100%
        </span>
        <svg
          className="w-[12px] h-[7px] lg:w-[16px] lg:h-[9px] text-[#999]"
          viewBox="0 0 18 10"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="2" y="2" width="11" height="6" rx="0.5" fill="currentColor" />
          <rect x="15" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

/*
 * Static e-ink device — same front panel as the homepage simulator.
 * The frame PNG (2303×1664) has a transparent cutout; content sits behind it
 * and shows through. Cutout insets: top 6.6%, left/right 4.8%, bottom 18.6%.
 */
function DeviceCard({ room }: { room: Room }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "2303 / 1664" }}>
      {/* Screen background — fills the frame's transparent cutout */}
      <div
        className="absolute bg-[#f0f1f3] select-none"
        style={{ top: "5.2%", left: "3.4%", right: "3.4%", bottom: "17.2%" }}
      >
        {/* Matte frosted texture */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />

        <StaticStatusBar />

        {/* Screen content — static, no flash / rotation */}
        <div className="relative w-full h-full flex items-center justify-center p-3 lg:p-5">
          <div className="text-center eink-text">
            <span className="font-[family-name:var(--font-inter)] font-medium text-[7px] lg:text-[9px] tracking-[2px] uppercase text-[#888] mb-1.5 lg:mb-2.5 block eink-label-text">
              {room.subtitle}
            </span>
            <div className="font-[family-name:var(--font-newsreader)] text-[14px] lg:text-[18px] text-[#222] leading-tight mb-1.5 lg:mb-2.5 whitespace-pre-line eink-heading">
              {room.title}
            </div>
            <div
              className="w-4 lg:w-6 h-[1px] bg-[#bbb] mx-auto my-1.5 lg:my-2"
              style={{ filter: "blur(0.3px)" }}
            />
            <div className="font-[family-name:var(--font-ibm-plex-mono)] text-[8px] lg:text-[10px] text-[#444] tracking-wide leading-relaxed eink-body-text">
              {room.detail}
            </div>
          </div>
        </div>
      </div>

      {/* Frame overlay — transparent cutout reveals the screen */}
      <Image
        src="/front_frame.png"
        alt={`inklet D1 in the ${room.label.toLowerCase()}`}
        fill
        className="relative z-[20] pointer-events-none object-contain"
      />
    </div>
  );
}

export default function RoomShowcase() {
  return (
    <section id="use-cases" className="bg-[#1a1a1a] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-[#f5f3ed] text-center mb-16"
        >
          One brain, every room.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: i * 0.12 },
                },
              }}
              className="flex flex-col items-center"
            >
              <DeviceCard room={room} />
              <p className="mt-5 text-sm text-[#a8a39a] text-center">
                {room.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
