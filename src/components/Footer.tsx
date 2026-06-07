import Link from "next/link";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

const productLinks = [
  { label: "Display D1", href: "/display" },
  { label: "Compute Hub H1", href: "/store#hub" },
  { label: "Portal", href: "/portal" },
  { label: "Portal SDK", href: "/developers", soon: true },
];

const companyLinks = [
  { label: "Store", href: "/store" },
  { label: "Kickstarter", href: KICKSTARTER_URL, external: true },
  { label: "Product Hunt", href: "https://www.producthunt.com/products/inklet", external: true },
  { label: "Contact Us", href: "mailto:core@iminklet.com" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", soon: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e5db] pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-[family-name:var(--font-newsreader)] text-xl text-[#1a1a1a] tracking-wide"
            >
              inklet
            </Link>
            <p className="text-sm text-[#888] mt-3 leading-relaxed max-w-[240px]">
              Your second brain, on e-ink display.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-10 md:gap-24">
            {/* Products */}
            <div>
              <h4 className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[2px] uppercase mb-4">
                Products
              </h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    {"soon" in link ? (
                      <span className="text-sm text-[#bbb] cursor-default select-none">
                        {link.label}
                        <sup className="text-[10px] ml-0.5 text-[#aaa]">soon</sup>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[2px] uppercase mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[2px] uppercase mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    {"soon" in link ? (
                      <span className="text-sm text-[#bbb] cursor-default select-none">
                        {link.label}
                        <sup className="text-[10px] ml-0.5 text-[#aaa]">soon</sup>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e8e5db] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#aaa]">
            Designed on Earth · Assembled in China
          </span>
          <span className="text-xs text-[#aaa]">
            © {new Date().getFullYear()} inklet LLC
          </span>
        </div>
      </div>
    </footer>
  );
}
