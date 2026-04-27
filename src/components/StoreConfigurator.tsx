"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import StoreCountdown from "./StoreCountdown";
import { HiOutlineCheck } from "react-icons/hi";

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

type PlanId = "single" | "home" | "pro";

const PLANS = [
  { id: "single" as PlanId, label: "Single Display", count: 1, base: 179, original: 199 },
  { id: "home" as PlanId, label: "Home Bundle", count: 4, base: 649, original: 749 },
  { id: "pro" as PlanId, label: "Pro Bundle", count: 4, base: 1099, original: 1499 },
];

const BUNDLE_DETAILS: Record<string, { features: string[]; shipping: string }> = {
  single: {
    features: [
      "1 × inklet e-ink display",
      "1 month free cloud subscription ($10)",
      "AI-powered content routing",
    ],
    shipping: "Est. shipping by Q4 2026",
  },
  home: {
    features: [
      "4 × inklet e-ink displays",
      "6 months free cloud subscription ($60)",
      "Cover every room — kitchen, study, hallway, bedroom",
      "AI-powered content routing",
    ],
    shipping: "Est. shipping by Q4 2026",
  },
  pro: {
    features: [
      "4 × inklet e-ink displays",
      "1 × inklet compute hub",
      "Fully local — no cloud required",
      "All AI processing on your network",
    ],
    shipping: "Est. shipping by Q2 2027",
  },
};

function QtyControl({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#e8e5db] text-sm">
      <span>
        {label}
        {suffix && (
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] ml-2">
            {suffix}
          </span>
        )}
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-7 h-7 rounded-full border border-[#e8e5db] text-[#aaa] flex items-center justify-center hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors text-sm"
        >
          −
        </button>
        <span className="font-[family-name:var(--font-ibm-plex-mono)] w-4 text-center">
          {value}
        </span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-full border border-[#e8e5db] text-[#aaa] flex items-center justify-center hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function StoreConfigurator() {
  const [plan, setPlan] = useState<PlanId>("single");
  const [color, setColor] = useState<"black" | "white">("black");
  const [stand, setStand] = useState("regular");
  const [activeImage, setActiveImage] = useState(GALLERY_IMAGES[0]);

  const [colorQty, setColorQty] = useState({ black: 2, white: 2 });
  const [standQty, setStandQty] = useState({ regular: 4, magnet: 0, wood: 0 });

  const currentPlan = PLANS.find((p) => p.id === plan)!;
  const isBundle = plan !== "single";

  function handleColorChange(c: "black" | "white") {
    setColor(c);
    setActiveImage(COLOR_IMAGES[c]);
  }

  function updateColorQty(key: "black" | "white", value: number) {
    const other = key === "black" ? "white" : "black";
    const max = currentPlan.count;
    const clamped = Math.min(value, max);
    setColorQty({ [key]: clamped, [other]: max - clamped } as typeof colorQty);
  }

  function updateStandQty(key: string, value: number) {
    const max = currentPlan.count;
    const others = Object.entries(standQty).filter(([k]) => k !== key);
    const othersTotal = others.reduce((s, [, v]) => s + v, 0);
    const clamped = Math.min(value, max - othersTotal + standQty[key as keyof typeof standQty]);
    setStandQty((prev) => ({ ...prev, [key]: Math.max(0, clamped) }));
  }

  const woodCount = isBundle ? standQty.wood : (stand === "wood" ? 1 : 0);
  const totalPrice = currentPlan.base + woodCount * 10;
  const totalOriginal = currentPlan.original + woodCount * 10;

  const planInfo = BUNDLE_DETAILS[plan];

  const standTotal = useMemo(
    () => Object.values(standQty).reduce((s, v) => s + v, 0),
    [standQty]
  );
  const standValid = !isBundle || standTotal === currentPlan.count;

  return (
    <div>
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
          <div className="flex gap-2 mb-6">
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
          <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa]">
            <span>7.5" e-ink · 800×480 · 2000mAh</span>
          </div>
          <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] mt-1">
            {planInfo?.shipping ?? "Est. shipping by Q4 2026"}
          </div>
        </div>

        {/* Configuration */}
        <div className="flex flex-col">
          <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-6">
            inklet Display D1
          </h2>

          {/* Plan selector */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setPlan(p.id);
                    if (p.count === 4) {
                      setColorQty({ black: 2, white: 2 });
                      setStandQty({ regular: p.count, magnet: 0, wood: 0 });
                    }
                  }}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-center transition-colors ${
                    plan === p.id
                      ? "border-[#1a1a1a] bg-white/50"
                      : "border-[#e8e5db] hover:border-[#ccc] text-[#666]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plan details */}
          {planInfo && (
            <div className="mb-6 p-4 rounded-xl bg-white/30 border border-[#e8e5db]">
              <ul className="space-y-1.5">
                {planInfo.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[#666]">
                    <HiOutlineCheck className="shrink-0 mt-0.5 text-[#aaa]" size={12} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Color */}
          <div className="mb-6">
            <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
              Color
            </span>
            {isBundle ? (
              <div className="grid grid-cols-2 gap-2">
                <QtyControl
                  label="Black"
                  value={colorQty.black}
                  onChange={(v) => updateColorQty("black", v)}
                />
                <QtyControl
                  label="White"
                  value={colorQty.white}
                  onChange={(v) => updateColorQty("white", v)}
                />
              </div>
            ) : (
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
            )}
          </div>

          {/* Stand */}
          <div className="mb-6">
            <span className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-wider uppercase mb-2 block">
              Stand
              {isBundle && !standValid && (
                <span className="ml-2 text-[#c97] normal-case tracking-normal">
                  ({standTotal}/{currentPlan.count} selected)
                </span>
              )}
            </span>
            {isBundle ? (
              <div className="flex flex-col gap-2">
                {STANDS.map((s) => (
                  <QtyControl
                    key={s.id}
                    label={s.label}
                    value={standQty[s.id as keyof typeof standQty]}
                    onChange={(v) => updateStandQty(s.id, v)}
                    suffix={s.price > 0 ? `+$${s.price}/ea` : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {STANDS.map((s) => {
                  const isSelected = stand === s.id;
                  const woodSelected = stand === "wood";
                  let priceLabel = "";
                  let priceColor = "text-[#aaa]";
                  if (s.price > 0) {
                    priceLabel = `+$${s.price}`;
                    if (isSelected) priceColor = "text-[#1a1a1a]";
                  } else if (woodSelected) {
                    priceLabel = "-$10";
                  }
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStand(s.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                        isSelected
                          ? "border-[#1a1a1a] bg-white/50"
                          : "border-[#e8e5db] hover:border-[#ccc]"
                      }`}
                    >
                      <span>{s.label}</span>
                      {priceLabel && (
                        <span className={`font-[family-name:var(--font-ibm-plex-mono)] ${priceColor}`}>
                          {priceLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price + Countdown */}
          <div className="mb-6">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                  ${totalPrice}
                </span>
                <span className="text-[#aaa] line-through text-sm">
                  ${totalOriginal}
                </span>
              </div>
              <StoreCountdown />
            </div>
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
    </div>
  );
}
