"use client";

import { useEffect, useState } from "react";
import StaticPanel, { type PanelScreen } from "@/components/StaticPanel";

interface Moment {
  time: string;
  place: string;
  heading: string;
  body: string;
  screen: PanelScreen;
}

/*
 * One person, one home, one day — read left to right as a sequence, not as a
 * catalogue of rooms. Each panel's status bar carries that moment's own clock,
 * so the three screens agree with the story instead of all reading 09:41.
 */
const DAY: Moment[] = [
  {
    time: "8:55",
    place: "Desk",
    heading: "Start with what matters.",
    body: "Today's three things are already on the desk — before the laptop is open, before the first thread pulls you somewhere else.",
    screen: {
      subtitle: "Focus — 3 tasks left",
      title: "Ship landing page\nby Friday",
      detail: "next: review PR #42 · standup 2pm",
      stamp: "Apr 14  08:55",
      alt: "inklet D1 on a desk in the morning",
    },
  },
  {
    time: "18:10",
    place: "Kitchen",
    heading: "The recipe, where your hands are.",
    body: "Sent from your phone an hour ago. Wet hands, nothing to unlock, no screen going dark halfway through step four.",
    screen: {
      subtitle: "Tonight",
      title: "Braised short ribs",
      detail: "sear 8 min · braise 3 h · serves 4",
      stamp: "Apr 14  18:10",
      alt: "inklet D1 in a kitchen in the evening",
    },
  },
  {
    time: "21:30",
    place: "By the door",
    heading: "Tomorrow, before the rush.",
    body: "Tomorrow's schedule, the weather, and what to take with you — waiting where you'll actually walk past it.",
    screen: {
      subtitle: "Wind down",
      title: "Tomorrow:\n3 meetings, rain",
      detail: "first call 9:30 · umbrella by the door",
      stamp: "Apr 14  21:30",
      alt: "inklet D1 by the front door at night",
    },
  },
];

const DWELL = 2600;

export default function RoomShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % DAY.length),
      DWELL
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="use-cases" className="bg-[#1a1a1a] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#6e6961] tracking-[3px] uppercase mb-4">
            Showcase
          </p>
          <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-[#f5f3ed]">
            A day with inklet.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8">
          {DAY.map((m, i) => {
            const on = i === active;
            return (
              <div
                key={m.time}
                className={`day-moment flex flex-col transition-opacity duration-700 ${
                  on ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#f5f3ed] tabular-nums">
                    {m.time}
                  </span>
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tracking-[2px] uppercase text-[#6e6961]">
                    {m.place}
                  </span>
                </div>

                {/* Doubles as the divider and the dwell indicator */}
                <div className="h-[1.5px] bg-[#2f2f2c] overflow-hidden mb-5">
                  {on && (
                    <div
                      key={active}
                      className="day-progress h-full bg-[#a8a39a]"
                      style={{
                        animation: `progress ${DWELL}ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards`,
                      }}
                    />
                  )}
                </div>

                <StaticPanel screen={m.screen} />

                <h3 className="font-[family-name:var(--font-newsreader)] text-xl font-light text-[#f5f3ed] mt-6 mb-2">
                  {m.heading}
                </h3>
                <p className="text-sm text-[#a8a39a] leading-relaxed">
                  {m.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
