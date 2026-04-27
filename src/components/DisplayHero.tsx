import Image from "next/image";

export default function DisplayHero() {
  return (
    <section className="min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        <div>
          <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-6">
            inklet Display D1
          </h1>
          <p className="text-lg text-[#666] leading-relaxed max-w-lg">
            An ambient e-ink display that surfaces the right information in the
            right room — powered by AI, synced from the tools you already use.
          </p>
        </div>
        <div className="lg:justify-end">
          <Image
            src="/inklet-v1-black.png"
            alt="inklet Display D1"
            width={900}
            height={675}
            className="w-[115%] max-w-none"
            priority
          />
        </div>
      </div>
    </section>
  );
}
