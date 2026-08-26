import type { Metadata } from "next";
import Link from "next/link";
import JournalArtwork from "@/components/JournalArtwork";
import Rise from "@/components/Rise";
import { formatJournalDate, journalPosts } from "@/data/journal";

const TITLE = "Journal — Notes from inklet";
const DESCRIPTION =
  "Product stories, field notes, and ideas from inklet about ambient computing, e-ink, and bringing useful information into the spaces where we live and work.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/journal" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/journal",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function JournalPage() {
  const featuredPost = journalPosts.find((post) => post.featured) ?? journalPosts[0];
  const latestPosts = journalPosts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <>
      <section className="pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <Rise>
              <p className="eyebrow text-[#aaa] mb-4">Journal</p>
              <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08]">
                Notes from a quieter kind of computing.
              </h1>
            </Rise>
            <Rise delay={0.15} className="mt-7">
              <p className="max-w-2xl text-lg text-[#666] leading-relaxed">
                Product stories, field notes, and ideas about bringing useful
                information into the spaces where we live and work.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6">
        <Link
          href={`/journal/${featuredPost.slug}`}
          aria-label={`Read ${featuredPost.title}`}
          className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#999]"
        >
          <article className="grid md:grid-cols-2 border-y border-[#dedbd2]">
            <div className="py-10 md:pr-12 flex flex-col justify-center">
              <p className="eyebrow text-[#aaa]">
                {featuredPost.category} ·{" "}
                <time dateTime={featuredPost.publishedAt}>
                  {formatJournalDate(featuredPost.publishedAt)}
                </time>{" "}
                · Featured
              </p>
              <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.02em] mt-4 transition-colors group-hover:text-[#666]">
                {featuredPost.title}
              </h2>
              <p className="text-[#666] leading-[1.75] mt-4">
                {featuredPost.excerpt}
              </p>
              <span className="inline-flex items-center self-start gap-2 mt-6 text-sm font-medium transition-colors group-hover:text-[#666]">
                Read the story <span aria-hidden="true">→</span>
              </span>
            </div>
            <div className="md:border-l border-[#dedbd2] md:pl-0 border-t md:border-t-0">
              <JournalArtwork post={featuredPost} compact />
            </div>
          </article>
        </Link>
      </section>

      {latestPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <p className="eyebrow text-[#aaa] mb-7">
            Latest
          </p>
          <div>
            {latestPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                aria-label={`Read ${post.title}`}
                className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#999]"
              >
                <article
                  className={`grid grid-cols-[1fr_auto] md:grid-cols-[150px_1fr_auto] gap-x-6 md:gap-x-10 gap-y-3 py-8 border-[#dedbd2] ${
                    index === 0 ? "border-y" : "border-b"
                  }`}
                >
                  <div className="col-span-2 md:col-span-1 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#999] leading-[1.7] uppercase">
                    <time dateTime={post.publishedAt}>{formatJournalDate(post.publishedAt)}</time>
                    <br />
                    {post.category}
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light leading-[1.15] transition-colors group-hover:text-[#666]">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#777] leading-[1.7] mt-3 max-w-3xl">
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-[#999] transition-transform group-hover:translate-x-1 group-hover:text-[#1a1a1a] pt-1"
                  >
                    →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
