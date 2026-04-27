import DisplayHero from "@/components/DisplayHero";
import HowItWorks from "@/components/HowItWorks";
import Showcase3D from "@/components/Showcase3D";
import Privacy from "@/components/Privacy";
import FAQ from "@/components/FAQ";
import Link from "next/link";

export const metadata = {
  title: "Display D1 - inklet",
  description:
    "inklet Display D1 is an ambient e-ink display that surfaces the right information in the right room — powered by AI.",
};

export default function DisplayPage() {
  return (
    <>
      <DisplayHero />
      <HowItWorks />
      <Showcase3D />
      <Privacy />
      <FAQ />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Ready to bring calm to every room?
          </p>
          <Link
            href="/store"
            className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Build my own →
          </Link>
        </div>
      </section>
    </>
  );
}
