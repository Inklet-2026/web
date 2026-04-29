import Link from "next/link";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

const productLinks = [
  { label: "Display D1", href: "/display" },
  { label: "Portal", href: "/portal" },
  { label: "Portal SDK", href: "/developers" },
];

const companyLinks = [
  { label: "Store", href: "/store" },
  { label: "Kickstarter", href: KICKSTARTER_URL, external: true },
  { label: "Product Hunt", href: "https://www.producthunt.com/products/inklet", external: true },
  { label: "Contact Us", href: "mailto:core@iminklet.com" },
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

          <div className="flex gap-24">
            {/* Products */}
            <div>
              <h4 className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#aaa] tracking-[2px] uppercase mb-4">
                Products
              </h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
                    >
                      {link.label}
                    </Link>
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
