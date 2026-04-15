export default function Footer() {
  return (
    <footer className="border-t border-[#e8e5db] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo placeholder */}
        <span className="font-[family-name:var(--font-newsreader)] text-lg text-[#1a1a1a]">
          inklet
        </span>

        {/* Copyright */}
        <span className="text-sm text-[#aaa]">
          © {new Date().getFullYear()} inklet
        </span>
      </div>
    </footer>
  );
}
