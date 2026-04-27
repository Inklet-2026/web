import HomeHero from "@/components/HomeHero";
import HomeDisplay from "@/components/HomeDisplay";
import HomePortal from "@/components/HomePortal";

const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/315339880?ref=5bbouo&token=026dc52e";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeDisplay />
      <HomePortal />
      <section className="py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light mb-8">
            Information should find you,
            <br />
            not the other way around.
          </p>
          <a
            href={KICKSTARTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#1a1a1a] text-[#f5f3ed] rounded-full text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Back us on Kickstarter →
          </a>
        </div>
      </section>
    </>
  );
}
