"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const navLinks: { label: string; href?: string; soon?: boolean }[] = [
  { label: "Display", href: "/display" },
  { label: "Hub", href: "/hub" },
  { label: "Portal", href: "/portal" },
  { label: "SDK", href: "/developers" },
  { label: "Store", href: "/store" },
  { label: "About", href: "/about" },
];

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

/** Pages that open on ink rather than paper, so the nav starts light on them. */
const DARK_PAGES = ["/portal", "/developers"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isDarkPage = DARK_PAGES.includes(pathname);
  const lightNav = isDarkPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f5f3ed]/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={`font-[family-name:var(--font-newsreader)] text-xl tracking-wide transition-colors ${
            lightNav ? "text-[#f5f3ed]" : "text-[#1a1a1a]"
          }`}
        >
          inklet
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                className={`text-sm cursor-default select-none ${
                  lightNav ? "text-[#555]" : "text-[#bbb]"
                }`}
              >
                {link.label}
                <sup
                  className={`text-[10px] ml-0.5 ${
                    lightNav ? "text-[#444]" : "text-[#aaa]"
                  }`}
                >
                  soon
                </sup>
              </span>
            ) : (
              <Link
                key={link.label}
                href={link.href!}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? lightNav
                      ? "text-[#f5f3ed]"
                      : "text-[#1a1a1a]"
                    : lightNav
                      ? "text-[#888] hover:text-[#f5f3ed]"
                      : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-5 py-2 text-[13px] font-medium transition-colors ${
              lightNav
                ? "bg-[#f5f3ed] text-[#1a1a1a] hover:bg-white"
                : "bg-[#1a1a1a] text-[#f5f3ed] hover:bg-[#333]"
            }`}
          >
            Back on Kickstarter
          </a>
        </div>

        <button
          className={`md:hidden transition-colors ${
            lightNav ? "text-[#f5f3ed]" : "text-[#1a1a1a]"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#f5f3ed]/95 backdrop-blur-md border-t border-[#e8e5db] px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) =>
            link.soon ? (
              <span key={link.label} className="block text-sm text-[#bbb]">
                {link.label}
                <sup className="text-[10px] ml-0.5 text-[#aaa]">soon</sup>
              </span>
            ) : (
              <Link
                key={link.label}
                href={link.href!}
                className={`block text-sm ${
                  pathname === link.href
                    ? "text-[#1a1a1a]"
                    : "text-[#666] hover:text-[#1a1a1a]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-5 py-2.5 bg-[#1a1a1a] text-[#f5f3ed] text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Back on Kickstarter →
          </a>
        </div>
      )}
    </nav>
  );
}
