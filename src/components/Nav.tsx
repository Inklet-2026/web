"use client";

import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const KICKSTARTER_URL = "#"; // Replace with actual Kickstarter pre-launch URL

const navLinks = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f5f3ed]/80 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo placeholder */}
        <a
          href="#"
          className="font-[family-name:var(--font-newsreader)] text-xl text-[#1a1a1a] tracking-wide"
        >
          inklet
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm border border-[#1a1a1a] text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Back us on Kickstarter
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f3ed]/95 backdrop-blur-md border-t border-[#e8e5db] px-6 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm text-[#666] hover:text-[#1a1a1a]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-center border border-[#1a1a1a] text-[#1a1a1a] px-4 py-2 rounded-full hover:bg-[#1a1a1a] hover:text-[#f5f3ed] transition-colors"
          >
            Back us on Kickstarter
          </a>
        </div>
      )}
    </nav>
  );
}
