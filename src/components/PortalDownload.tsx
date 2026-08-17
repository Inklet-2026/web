"use client";

import { useState, useEffect } from "react";
import { SiApple } from "react-icons/si";
import { TbBrandWindows, TbWorld } from "react-icons/tb";
import type { IconType } from "react-icons";

type PlatformId = "macos" | "ios" | "windows" | "web";

const RELEASE_VERSION = "0.1.0";
const RELEASE_BASE = `https://github.com/inklethq/app/releases/download/v${RELEASE_VERSION}`;

const platforms: {
  id: PlatformId;
  label: string;
  Icon: IconType;
  href: string;
  version?: string;
  soon?: boolean;
}[] = [
  {
    id: "macos",
    label: "macOS",
    Icon: SiApple,
    href: `${RELEASE_BASE}/InkletPortal-${RELEASE_VERSION}-mac-arm64.dmg`,
    version: `v${RELEASE_VERSION}`,
  },
  {
    id: "windows",
    label: "Windows",
    Icon: TbBrandWindows,
    href: `${RELEASE_BASE}/InkletPortal-${RELEASE_VERSION}-win-x64-setup.exe`,
    version: `v${RELEASE_VERSION}`,
  },
  {
    id: "web",
    label: "Web",
    Icon: TbWorld,
    href: "https://portal.iminklet.com",
  },
  {
    id: "ios",
    label: "iOS",
    Icon: SiApple,
    href: "#",
    soon: true,
  },
];

function detectPlatform(): PlatformId {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Mac/.test(ua)) return "macos";
  if (/Win/.test(ua)) return "windows";
  return "web";
}

export default function PortalDownload() {
  const [detected, setDetected] = useState<PlatformId>("macos");

  useEffect(() => {
    setDetected(detectPlatform());
  }, []);

  return (
    <section id="download" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light text-center mb-4">
          Ready to orchestrate your ambient life?
        </p>
        <p className="text-sm text-[#888] text-center mb-14 max-w-lg mx-auto leading-relaxed">
          Desktop apps push content and sync notes. The web dashboard manages all your devices and knowledge base. iOS adds display pairing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {platforms.map((p) => {
            const isPrimary = p.id === detected;
            return (
              <div key={p.id} className="text-center">
                {p.soon ? (
                  <span className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#333] text-[#888] rounded-full text-sm font-medium cursor-default">
                    <p.Icon size={16} />
                    {p.label}
                    <sup className="text-[9px] text-[#555]">soon</sup>
                  </span>
                ) : isPrimary ? (
                  <a
                    href={p.href}
                    {...(p.id === "web" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#f5f3ed] text-[#1a1a1a] rounded-full text-sm font-medium hover:bg-[#e8e5db] transition-colors"
                  >
                    <p.Icon size={16} />
                    {p.label}
                  </a>
                ) : (
                  <a
                    href={p.href}
                    {...(p.id === "web" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 border border-[#333] text-[#888] rounded-full text-sm font-medium hover:border-[#555] hover:text-[#f5f3ed] transition-colors"
                  >
                    <p.Icon size={16} />
                    {p.label}
                  </a>
                )}
                {p.version && (
                  <p className="text-[10px] text-[#888] font-[family-name:var(--font-ibm-plex-mono)] mt-2.5">
                    {p.version}
                  </p>
                )}
                {p.id === "macos" && (
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <a
                      href={`${RELEASE_BASE}/InkletPortal-${RELEASE_VERSION}-mac-arm64.dmg`}
                      className="text-[10px] text-[#888] hover:text-[#ccc] font-[family-name:var(--font-ibm-plex-mono)] transition-colors"
                    >
                      Apple Silicon
                    </a>
                    <span className="text-[#888] text-[10px]">·</span>
                    <a
                      href={`${RELEASE_BASE}/InkletPortal-${RELEASE_VERSION}-mac-x64.dmg`}
                      className="text-[10px] text-[#888] hover:text-[#ccc] font-[family-name:var(--font-ibm-plex-mono)] transition-colors"
                    >
                      Intel
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
