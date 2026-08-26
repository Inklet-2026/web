import Image from "next/image";

export interface PanelScreen {
  subtitle: string;
  title: string;
  detail: string;
  /** Clock shown in the status bar — keep it consistent with the story. */
  stamp: string;
  alt: string;
}

function StatusBar({ stamp }: { stamp: string }) {
  return (
    <div className="absolute top-1.5 left-2 right-2 lg:top-2 lg:left-3 lg:right-3 flex items-center justify-between z-[7] eink-label-text">
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[6px] lg:text-[8px] text-[#999]">
        {stamp}
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
 * Static e-ink device — same front panel as the homepage simulator, frozen.
 * The frame PNG (2303×1664) has a transparent cutout; content sits behind it
 * and shows through. Cutout insets: top 5.2%, left/right 3.4%, bottom 17.2%.
 */
/*
 * `compact` suits the three-up row; `large` is for a panel that carries a
 * section on its own, where the screen has to stay readable at a glance.
 */
const SIZES = {
  compact: {
    pad: "p-3 lg:p-5",
    subtitle: "text-[7px] lg:text-[9px] tracking-[2px] mb-1.5 lg:mb-2.5",
    title: "text-[14px] lg:text-[18px] mb-1.5 lg:mb-2.5",
    rule: "w-4 lg:w-6 my-1.5 lg:my-2",
    detail: "text-[8px] lg:text-[10px]",
  },
  large: {
    pad: "p-4 md:p-8",
    subtitle: "text-[9px] md:text-[12px] tracking-[3px] mb-2.5 md:mb-4",
    title: "text-[21px] md:text-[30px] mb-2.5 md:mb-4",
    rule: "w-5 md:w-8 my-2 md:my-3",
    detail: "text-[10px] md:text-[13px]",
  },
} as const;

export default function StaticPanel({
  screen,
  size = "compact",
  eager = false,
}: {
  screen: PanelScreen;
  size?: keyof typeof SIZES;
  eager?: boolean;
}) {
  const s = SIZES[size];
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

        <StatusBar stamp={screen.stamp} />

        <div className={`relative w-full h-full flex items-center justify-center ${s.pad}`}>
          <div className="text-center eink-text">
            <span className={`font-[family-name:var(--font-inter)] font-medium uppercase text-[#888] block eink-label-text ${s.subtitle}`}>
              {screen.subtitle}
            </span>
            <div className={`font-[family-name:var(--font-newsreader)] text-[#222] leading-tight whitespace-pre-line eink-heading ${s.title}`}>
              {screen.title}
            </div>
            <div
              className={`h-[1px] bg-[#bbb] mx-auto ${s.rule}`}
              style={{ filter: "blur(0.3px)" }}
            />
            <div className={`font-[family-name:var(--font-ibm-plex-mono)] text-[#444] tracking-wide leading-relaxed eink-body-text ${s.detail}`}>
              {screen.detail}
            </div>
          </div>
        </div>
      </div>

      {/* Frame overlay — transparent cutout reveals the screen */}
      <Image
        src="/front_frame.png"
        alt={screen.alt}
        fill
        className="relative z-[20] pointer-events-none object-contain"
        sizes={
          size === "large"
            ? "(min-width: 768px) 720px, calc(100vw - 48px)"
            : "(min-width: 768px) 510px, calc(100vw - 64px)"
        }
        loading={eager ? "eager" : "lazy"}
      />
    </div>
  );
}
