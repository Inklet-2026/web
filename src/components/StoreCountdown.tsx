"use client";

import { useState, useEffect } from "react";

const DEADLINE = new Date("2026-07-31T00:00:00-07:00").getTime();

function getTimeLeft() {
  const diff = DEADLINE - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function StoreCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center py-8">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[2px] text-[#7a6a4f]">
          early bird has ended
        </span>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[2px] text-[#7a6a4f] mb-3">
        early bird ends in
      </div>
      <div className="font-[family-name:var(--font-ibm-plex-mono)] text-2xl text-[#1a1a1a] tracking-wider">
        {timeLeft.days}d · {pad(timeLeft.hours)}h · {pad(timeLeft.minutes)}m ·{" "}
        {pad(timeLeft.seconds)}s
      </div>
    </div>
  );
}
