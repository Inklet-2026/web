"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement, forceReload?: boolean) => void;
    };
  }
}

export default function SocialProof() {
  const trustboxRef = useRef<HTMLDivElement>(null);

  const initTrustbox = () => {
    if (window.Trustpilot && trustboxRef.current) {
      window.Trustpilot.loadFromElement(trustboxRef.current, true);
    }
  };

  // Re-initialise on mount (e.g. client-side navigation, when the script is
  // already loaded). First load is handled by the <Script> onLoad below.
  useEffect(() => {
    initTrustbox();
  }, []);

  return (
    <section className="border-t border-[#e8e5db] py-14">
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={initTrustbox}
      />
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-start justify-center gap-x-6 gap-y-5">
        {/* Product Hunt */}
        <a
          href="https://www.producthunt.com/products/inklet?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-inklet-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="inklet - Your second brain, on e-ink displays. | Product Hunt"
            width={250}
            height={54}
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1134691&theme=light&t=1783845719217"
            className="h-[37.68px] w-auto"
          />
        </a>

        {/* Uneed — Product of the Day */}
        <a
          href="https://www.uneed.best/tool/inklet"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="inklet — Daily winner on Uneed"
            width={639}
            height={171}
            src="https://www.uneed.best/POTD1A.png"
            className="h-10 w-auto"
          />
        </a>

        {/* Uneed — Product of the Week, 3rd */}
        <a
          href="https://www.uneed.best/tool/inklet"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="inklet — Weekly winner, 3rd place on Uneed"
            width={702}
            height={171}
            src="https://www.uneed.best/POTW3A.png"
            className="h-10 w-auto"
          />
        </a>

        {/* Trustpilot */}
        <div
          ref={trustboxRef}
          className="trustpilot-widget w-[220px] -mr-[35px]"
          data-locale="en-US"
          data-template-id="56278e9abfbbba0bdcd568bc"
          data-businessunit-id="69f146418c4d26d079bf9cf0"
          data-style-height="40px"
          data-style-width="100%"
          data-token="f9c55c11-fea7-4f03-ac76-332c4fa525c9"
        >
          <a
            href="https://www.trustpilot.com/review/iminklet.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
