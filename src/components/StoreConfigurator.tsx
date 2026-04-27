"use client";

import { useState } from "react";
import Image from "next/image";
import StoreCountdown from "./StoreCountdown";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

const COLOR_IMAGES: Record<string, string> = {
  black: "/inklet-v1-black.png",
  white: "/inklet-v1-white.png",
};

const GALLERY_IMAGES = [
  "/inklet-v1-black.png",
  "/inklet-v1-white.png",
  "/inklet-v1-hallway.png",
  "/inklet-v1-kitchen.png",
  "/inklet-v1-kitchen2.png",
];

const STANDS = [
  { id: "regular", label: "Regular Stand", price: 0 },
  { id: "magnet", label: "Fridge Magnet", price: 0 },
  { id: "wood", label: "Solid Wood Stand", price: 10 },
];

const BASE_PRICE = 179;
const ORIGINAL_PRICE = 199;

export default function StoreConfigurator() {
  const [color, setColor] = useState<"black" | "white">("black");
  const [stand, setStand] = useState("regular");
  const [activeImage, setActiveImage] = useState(GALLERY_IMAGES[0]);

  const standAddon = STANDS.find((s) => s.id === stand)?.price ?? 0;
  const totalPrice = BASE_PRICE + standAddon;
  const totalOriginal = ORIGINAL_PRICE + standAddon;

  function handleColorChange(c: "black" | "white") {
    setColor(c);
    setActiveImage(COLOR_IMAGES[c]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Gallery */}
      <div>
        <div className="aspect-[4/3] relative bg-white/50 rounded-2xl overflow-hidden mb-4">
          <Image
            src={activeImage}
            alt="inklet Display D1"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex gap-2">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              onClick={() => setActiveImage(src)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                activeImage === src
                  ? "border-[#1a1a1a]"
                  : "border-[#e8e5db] hover:border-[#ccc]"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="flex flex-col justify-center">
        <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-2">
          inklet Display D1
        </h2>
        <p className="text-xs text-[#aaa] font-[family-name:var(--font-ibm-plex-mono)] mb-6">
          Single Display
        </p>

        {/* Color */}
        <div className="mb-6">
          <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
            Color
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => handleColorChange("black")}
              className={`w-8 h-8 rounded-full bg-[#2a2a2a] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                color === "black" ? "ring-2 ring-[#1a1a1a]" : ""
              }`}
              aria-label="Black"
            />
            <button
              onClick={() => handleColorChange("white")}
              className={`w-8 h-8 rounded-full bg-[#e8e5db] border border-[#ccc] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                color === "white" ? "ring-2 ring-[#1a1a1a]" : ""
              }`}
              aria-label="White"
            />
          </div>
        </div>

        {/* Stand */}
        <div className="mb-6">
          <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
            Stand
          </span>
          <div className="flex flex-col gap-2">
            {STANDS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStand(s.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                  stand === s.id
                    ? "border-[#1a1a1a] bg-white/50"
                    : "border-[#e8e5db] hover:border-[#ccc]"
                }`}
              >
                <span>{s.label}</span>
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]">
                  {s.price === 0 ? "Free" : `+$${s.price}`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price + Countdown */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
              ${totalPrice}
            </span>
            <span className="text-[#aaa] line-through text-sm">
              ${totalOriginal}
            </span>
          </div>
          <div className="mt-2">
            <StoreCountdown />
          </div>
        </div>

        {/* Specs */}
        <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]">
          <span>7.5" e-ink</span>
          <span>800×480</span>
          <span>2000mAh</span>
        </div>

        {/* CTA */}
        <a
          href={KICKSTARTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
        >
          Back on Kickstarter →
        </a>
      </div>
    </div>
  );
}
