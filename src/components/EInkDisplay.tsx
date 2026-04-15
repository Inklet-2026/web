"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { HiOutlineHome } from "react-icons/hi";
import {
  MdOutlineKitchen,
  MdOutlineMenuBook,
  MdOutlineBed,
} from "react-icons/md";
import Image from "next/image";
import type { Screen } from "@/data/screens";

function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const date = now.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      const clock = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setTime(`${date} ${clock}`);
    };
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  return (
    <div className="absolute top-2 left-3 right-3 flex items-center justify-between z-[7] eink-label-text">
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#999]">
        {time}
      </span>
      <div className="flex items-center gap-1">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[9px] text-[#999]">
          100%
        </span>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="text-[#999]">
          <rect x="0.5" y="0.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="2" y="2" width="11" height="6" rx="0.5" fill="currentColor" />
          <rect x="15" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}

const roomIcons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  kitchen: MdOutlineKitchen,
  study: MdOutlineMenuBook,
  hallway: HiOutlineHome,
  bedroom: MdOutlineBed,
};

interface EInkDisplayProps {
  screens: Screen[];
  animated?: boolean;
  interval?: number;
  initialIndex?: number;
  showLabel?: boolean;
}

export default function EInkDisplay({
  screens,
  animated = true,
  interval = 5000,
  initialIndex = 0,
  showLabel = true,
}: EInkDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(true);
  const [ghostContent, setGhostContent] = useState<Screen | null>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const current = screens[currentIndex];

  const setFlash = useCallback(
    (opacity: number, duration: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!flashRef.current) return resolve();
        flashRef.current.style.transition = `opacity ${duration}ms ease`;
        flashRef.current.style.opacity = String(opacity);
        setTimeout(resolve, duration);
      });
    },
    []
  );

  const wait = useCallback(
    (ms: number) => new Promise<void>((r) => setTimeout(r, ms)),
    []
  );

  const einkRefresh = useCallback(
    async (nextIndex: number) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const totalFlashes = Math.random() < 0.5 ? 1 : 2;

      // Show ghost of current content
      setGhostContent(screens[currentIndex]);
      if (ghostRef.current) {
        ghostRef.current.style.transition = "none";
        ghostRef.current.style.opacity = "0.5";
      }

      // Hide current content
      setIsVisible(false);

      if (totalFlashes === 1) {
        // 1 flash: ~300ms flash + ~700ms ghost = ~1s
        await setFlash(1, 80);
        await wait(60);
        setCurrentIndex(nextIndex);
        setIsVisible(true);
        await setFlash(0, 120);
        await wait(20);
        if (ghostRef.current) {
          ghostRef.current.style.transition = "opacity 700ms ease-out";
          ghostRef.current.style.opacity = "0";
        }
      } else {
        // 2 flashes: ~500ms flash + ~500ms ghost = ~1s
        await setFlash(1, 70);
        await wait(30);
        await setFlash(0.15, 70);
        await wait(30);
        await setFlash(1, 70);
        await wait(40);
        setCurrentIndex(nextIndex);
        setIsVisible(true);
        await setFlash(0, 100);
        await wait(20);
        if (ghostRef.current) {
          ghostRef.current.style.transition = "opacity 500ms ease-out";
          ghostRef.current.style.opacity = "0";
        }
      }

      await wait(totalFlashes === 1 ? 700 : 500);
      setGhostContent(null);
      isAnimating.current = false;
    },
    [currentIndex, screens, setFlash, wait]
  );

  useEffect(() => {
    if (!animated || screens.length <= 1) return;
    const timer = setInterval(() => {
      const next = (currentIndex + 1) % screens.length;
      einkRefresh(next);
    }, interval);
    return () => clearInterval(timer);
  }, [animated, screens.length, interval, currentIndex, einkRefresh]);

  /*
   * Layout: the frame PNG (2303×1664) has a transparent cutout.
   * Cutout insets: top 6.6%, left 4.8%, bottom 18.6%, right 4.8%
   * We use the frame as an overlay image; content sits behind it
   * and shows through the transparent hole.
   */

  return (
    <div className="w-full max-w-[620px]">
      {/* Device container — aspect ratio matches the frame image */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "2303 / 1664" }}
      >
        {/* Screen background — positioned to fill the transparent hole */}
        <div
          className="absolute bg-[#f0f1f3] select-none"
          style={{ top: "6.6%", left: "4.8%", right: "4.8%", bottom: "18.6%" }}
        >
          {/* Matte frosted texture */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Status bar — date/time + battery */}
          <StatusBar />

          {/* Flash overlay */}
          <div
            ref={flashRef}
            className="absolute inset-0 z-[6] pointer-events-none opacity-0"
            style={{ background: "#202020" }}
          />

          {/* Ghost layer — old content text */}
          <div
            ref={ghostRef}
            className="absolute inset-0 z-[4] pointer-events-none opacity-0 flex items-center justify-center p-6 md:p-10"
          >
            {ghostContent && (
              <div className="text-center eink-text">
                <span className="font-[family-name:var(--font-inter)] font-medium text-[11px] tracking-[3px] uppercase text-[#ccc9c0] mb-5 block" style={{ filter: "contrast(0.4) blur(0.5px)" }}>
                  {ghostContent.subtitle}
                </span>
                <div className="font-[family-name:var(--font-newsreader)] text-[32px] md:text-[38px] text-[#c0bdb5] leading-tight mb-4 whitespace-pre-line" style={{ filter: "contrast(0.5) blur(0.6px)" }}>
                  {ghostContent.title}
                </div>
                <div className="w-9 h-[1.5px] bg-[#d5d2c9] mx-auto my-3.5" style={{ filter: "blur(0.3px)" }} />
                <div className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] md:text-[14px] text-[#ccc9c0]" style={{ filter: "contrast(0.4) blur(0.5px)" }}>
                  {ghostContent.detail}
                </div>
              </div>
            )}
          </div>

          {/* Screen content */}
          <div className="relative w-full h-full flex items-center justify-center p-6 md:p-10">
            <div
              className={`text-center eink-text transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <span className="font-[family-name:var(--font-inter)] font-medium text-[11px] tracking-[3px] uppercase text-[#888] mb-5 block eink-label-text">
                {current.subtitle}
              </span>
              <div className="font-[family-name:var(--font-newsreader)] text-[32px] md:text-[38px] text-[#222] leading-tight mb-4 whitespace-pre-line eink-heading">
                {current.title}
              </div>
              <div className="w-9 h-[1.5px] bg-[#bbb] mx-auto my-3.5" style={{ filter: "blur(0.3px)" }} />
              <div className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] md:text-[14px] text-[#444] tracking-wide leading-relaxed eink-body-text">
                {current.detail}
              </div>
            </div>
          </div>

        </div>

        {/* Frame image overlay — sits on top, transparent hole reveals content */}
        <Image
          src="/front_frame.png"
          alt="inklet display"
          fill
          className="relative z-[20] pointer-events-none object-contain"
          priority
        />
      </div>

      {/* Progress bar + room label */}
      {showLabel && (() => {
        const Icon = roomIcons[current.label] || HiOutlineHome;
        return (
          <div className="mt-2">
            {animated && screens.length > 1 && (
              <div className="w-full h-[1.5px] bg-[#e8e8e8] overflow-hidden mb-3">
                <div
                  key={currentIndex}
                  className="h-full bg-[#ccc] rounded-full"
                  style={{
                    animation: `progress ${interval}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                  }}
                />
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-[#aaa]">
              <Icon size={14} />
              <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] capitalize">
                {current.label}
              </span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
