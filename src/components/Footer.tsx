export default function Footer() {
  return (
    <footer className="border-t border-[#e8e5db] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo placeholder */}
        <span className="font-[family-name:var(--font-newsreader)] text-lg text-[#1a1a1a]">
          inklet
        </span>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-[#aaa]">
          <a href="#" className="hover:text-[#666] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#666] transition-colors">
            Terms
          </a>
        </div>

        {/* Copyright */}
        <span className="text-sm text-[#aaa]">
          © {new Date().getFullYear()} inklet
        </span>
      </div>
    </footer>
  );
}
