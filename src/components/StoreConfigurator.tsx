"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import StoreCountdown from "./StoreCountdown";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

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

type Tab = "display" | "hub" | "bundles";
type BundleId = "home" | "pro";
type HubRam = "16" | "32";

const DISPLAY_SPECS_EXTRA = [
  "1 × inklet e-ink display",
  "1 month free cloud subscription ($10)",
];

const HUB_SPECS: Record<HubRam, string[]> = {
  "16": ["Orange Pi 6 Plus", "Gemma 4 E4B"],
  "32": ["Orange Pi 6 Plus", "Gemma 4 26B A4B"],
};

const HUB_RAM_OPTIONS = [
  { id: "16" as HubRam, label: "16GB", price: 0 },
  { id: "32" as HubRam, label: "32GB", price: 450 },
];

const HUB_PRICING: Record<HubRam, { kickstarter: number; msrp: number }> = {
  "16": { kickstarter: 749, msrp: 899 },
  "32": { kickstarter: 1199, msrp: 1399 },
};

const BUNDLE_PLANS = [
  { id: "home" as BundleId, label: "Home Bundle", count: 4, base: 649, original: 749 },
  { id: "pro" as BundleId, label: "Pro Bundle", count: 4, base: 1099, original: 1499 },
];

const BUNDLE_DETAILS: Record<BundleId, { features: string[]; shipping: string }> = {
  home: {
    features: [
      "4 × inklet e-ink displays",
      "6 months free cloud subscription ($60)",
    ],
    shipping: "Est. shipping by Q4 2026",
  },
  pro: {
    features: [
      "4 × inklet e-ink displays",
      "1 × inklet compute hub",
    ],
    shipping: "Est. shipping by Q2 2027",
  },
};

const TABS: { id: Tab; label: string }[] = [
  { id: "display", label: "Display" },
  { id: "hub", label: "Compute Hub" },
  { id: "bundles", label: "Bundles" },
];

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

const HUB_COLOR_IMAGES: Record<string, string> = {
  black: "/inklet-h1-black.png",
  white: "/inklet-h1-white.png",
};

const HUB_GALLERY_IMAGES = [
  "/inklet-h1-black.png",
  "/inklet-h1-white.png",
  "/inklet-h1-desk.jpg",
];

export default function StoreConfigurator() {
  const [tab, setTab] = useState<Tab>("display");

  // Display state
  const [color, setColor] = useState<"black" | "white">("black");
  const [stand, setStand] = useState("regular");
  const [activeImage, setActiveImage] = useState(GALLERY_IMAGES[0]);

  // Hub state
  const [hubColor, setHubColor] = useState<"black" | "white">("black");
  const [hubRam, setHubRam] = useState<HubRam>("16");
  const [hubActiveImage, setHubActiveImage] = useState(HUB_GALLERY_IMAGES[0]);

  // Bundle state
  const [bundle, setBundle] = useState<BundleId>("home");
  const [colorQty, setColorQty] = useState({ black: 2, white: 2 });
  const [standQty, setStandQty] = useState({ regular: 4, magnet: 0, wood: 0 });

  const currentBundle = BUNDLE_PLANS.find((p) => p.id === bundle)!;
  const hubPrice = HUB_PRICING[hubRam];

  function handleColorChange(c: "black" | "white") {
    setColor(c);
    setActiveImage(COLOR_IMAGES[c]);
  }

  function updateColorQty(key: "black" | "white", value: number) {
    const other = key === "black" ? "white" : "black";
    const max = currentBundle.count;
    const clamped = Math.min(value, max);
    setColorQty({ [key]: clamped, [other]: max - clamped } as typeof colorQty);
  }

  function updateStandQty(key: string, value: number) {
    const max = currentBundle.count;
    const others = Object.entries(standQty).filter(([k]) => k !== key);
    const othersTotal = others.reduce((s, [, v]) => s + v, 0);
    const clamped = Math.min(value, max - othersTotal + standQty[key as keyof typeof standQty]);
    setStandQty((prev) => ({ ...prev, [key]: Math.max(0, clamped) }));
  }

  const standTotal = useMemo(
    () => Object.values(standQty).reduce((s, v) => s + v, 0),
    [standQty]
  );
  const standValid = standTotal === currentBundle.count;

  const displayWoodCount = stand === "wood" ? 1 : 0;
  const displayPrice = 179 + displayWoodCount * 10;
  const displayOriginal = 199 + displayWoodCount * 10;

  const bundleWoodCount = standQty.wood;
  const bundlePrice = currentBundle.base + bundleWoodCount * 10;
  const bundleOriginal = currentBundle.original + bundleWoodCount * 10;

  const bundleInfo = BUNDLE_DETAILS[bundle];
  const isProBundle = bundle === "pro";

  const shippingText =
    tab === "display"
      ? "Est. shipping by Q4 2026"
      : tab === "hub"
        ? "Est. shipping by Q2 2027"
        : bundleInfo.shipping;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Gallery */}
        <div>
          {tab === "hub" ? (
            <>
              <div className="aspect-[4/3] relative bg-white/50 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={hubActiveImage}
                  alt={`inklet Compute Hub H1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex gap-2 mb-6">
                {HUB_GALLERY_IMAGES.map((src) => (
                  <button
                    key={src}
                    onClick={() => setHubActiveImage(src)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                      hubActiveImage === src
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
            </>
          ) : (
            <>
              <div className="aspect-[4/3] relative bg-white/50 rounded-2xl overflow-hidden mb-4">
                <Image
                  src={activeImage}
                  alt="inklet D1"
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
            </>
          )}
          <div className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] mt-4 space-y-1">
            {tab === "display" && DISPLAY_SPECS_EXTRA.map((s) => (
              <span key={s} className="block">{s}</span>
            ))}
            {tab === "hub" && HUB_SPECS[hubRam].map((s) => (
              <span key={s} className="block">{s}</span>
            ))}
            {tab === "bundles" && bundleInfo.features.map((s) => (
              <span key={s} className="block">{s}</span>
            ))}
            {tab !== "hub" && (
              <span className="block">7.5&quot; e-ink · 800×480 · 2000mAh</span>
            )}
            <span className="block">{shippingText}</span>
          </div>
        </div>

        {/* Configuration */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="grid grid-cols-3 mb-6 border-b border-[#e8e5db]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-3 text-sm text-center transition-colors relative ${
                  tab === t.id
                    ? "text-[#1a1a1a]"
                    : "text-[#aaa] hover:text-[#666]"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1a1a1a]" />
                )}
              </button>
            ))}
          </div>

          {/* Display tab */}
          {tab === "display" && (
            <>
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-6">
                inklet D1
              </h2>

              {/* Color */}
              <div className="mb-6">
                <span className="eyebrow text-[#aaa] mb-2 block">
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
                <span className="eyebrow text-[#aaa] mb-2 block">
                  Stand
                </span>
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
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                      ${displayPrice}
                    </span>
                    <span className="text-[#aaa] line-through text-sm">
                      ${displayOriginal}
                    </span>
                  </div>
                  <StoreCountdown />
                </div>
              </div>

              <a
                href={KICKSTARTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
              >
                Back on Kickstarter →
              </a>
            </>
          )}

          {/* Compute Hub tab */}
          {tab === "hub" && (
            <>
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-6">
                {hubRam === "32" ? "inklet H1 Pro" : "inklet H1"}
              </h2>

              {/* Color */}
              <div className="mb-6">
                <span className="eyebrow text-[#aaa] mb-2 block">
                  Color
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => { setHubColor("black"); setHubActiveImage(HUB_COLOR_IMAGES.black); }}
                    className={`w-8 h-8 rounded-full bg-[#2a2a2a] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                      hubColor === "black" ? "ring-2 ring-[#1a1a1a]" : ""
                    }`}
                    aria-label="Black"
                  />
                  <button
                    onClick={() => { setHubColor("white"); setHubActiveImage(HUB_COLOR_IMAGES.white); }}
                    className={`w-8 h-8 rounded-full bg-[#e8e5db] border border-[#ccc] ring-offset-2 ring-offset-[#f5f3ed] transition-shadow ${
                      hubColor === "white" ? "ring-2 ring-[#1a1a1a]" : ""
                    }`}
                    aria-label="White"
                  />
                </div>
              </div>

              {/* RAM */}
              <div className="mb-6">
                <span className="eyebrow text-[#aaa] mb-2 block">
                  Memory
                </span>
                <div className="flex flex-col gap-2">
                  {HUB_RAM_OPTIONS.map((r) => {
                    const isSelected = hubRam === r.id;
                    const upgradeSelected = hubRam === "32";
                    let priceLabel = "";
                    let priceColor = "text-[#aaa]";
                    if (r.price > 0) {
                      priceLabel = `+$${r.price}`;
                      if (isSelected) priceColor = "text-[#1a1a1a]";
                    } else if (upgradeSelected) {
                      priceLabel = `-$${HUB_RAM_OPTIONS[1].price}`;
                    }
                    return (
                      <button
                        key={r.id}
                        onClick={() => setHubRam(r.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                          isSelected
                            ? "border-[#1a1a1a] bg-white/50"
                            : "border-[#e8e5db] hover:border-[#ccc]"
                        }`}
                      >
                        <span>{r.label}</span>
                        {priceLabel && (
                          <span className={`font-[family-name:var(--font-ibm-plex-mono)] ${priceColor}`}>
                            {priceLabel}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                    ${hubPrice.kickstarter}
                  </span>
                  <span className="text-[#aaa] line-through text-sm">
                    ${hubPrice.msrp}
                  </span>
                </div>
              </div>

              <span className="w-full text-center px-8 py-4 bg-[#ccc] text-[#888] rounded-full text-sm font-medium cursor-default">
                Available Soon
              </span>
            </>
          )}

          {/* Bundles tab */}
          {tab === "bundles" && (
            <>
              <h2 className="font-[family-name:var(--font-newsreader)] text-3xl font-light mb-6">
                Save More with Bundles
              </h2>

              {/* Bundle selector */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-2">
                  {BUNDLE_PLANS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setBundle(p.id);
                        setColorQty({ black: 2, white: 2 });
                        setStandQty({ regular: p.count, magnet: 0, wood: 0 });
                      }}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-center transition-colors ${
                        bundle === p.id
                          ? "border-[#1a1a1a] bg-white/50"
                          : "border-[#e8e5db] hover:border-[#ccc] text-[#666]"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color qty */}
              <div className="mb-6">
                <span className="eyebrow text-[#aaa] mb-2 block">
                  Color
                </span>
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
              </div>

              {/* Stand qty */}
              <div className="mb-6">
                <span className="eyebrow text-[#aaa] mb-2 block">
                  Stand
                  {!standValid && (
                    <span className="ml-2 text-[#c97] normal-case tracking-normal">
                      ({standTotal}/{currentBundle.count} selected)
                    </span>
                  )}
                </span>
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
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-4xl font-light">
                      ${bundlePrice}
                    </span>
                    <span className="text-[#aaa] line-through text-sm">
                      ${bundleOriginal}
                    </span>
                  </div>
                  {!isProBundle && <StoreCountdown />}
                </div>
              </div>

              {isProBundle ? (
                <span className="w-full text-center px-8 py-4 bg-[#ccc] text-[#888] rounded-full text-sm font-medium cursor-default">
                  Available Soon
                </span>
              ) : (
                <a
                  href={KICKSTARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
                >
                  Back on Kickstarter →
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
