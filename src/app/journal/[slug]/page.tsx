import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JournalArtwork from "@/components/JournalArtwork";
import {
  formatJournalDate,
  getJournalPost,
  journalPosts,
} from "@/data/journal";

type JournalPostPageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = "https://iminklet.com";
const JOURNAL_URL = `${SITE_URL}/journal`;
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/social-image.png`;

export const dynamicParams = false;

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: JournalPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);

  if (!post) {
    return { title: "Journal post not found — inklet" };
  }

  const url = `${JOURNAL_URL}/${post.slug}`;
  const image = post.image
    ? `${SITE_URL}${post.image}`
    : DEFAULT_SOCIAL_IMAGE;
  const publishedTime = `${post.publishedAt}T12:00:00Z`;

  return {
    title: `${post.title} — inklet Journal`,
    description: post.excerpt,
    authors: [{ name: post.author, url: `${SITE_URL}/about` }],
    creator: post.author,
    publisher: "inklet LLC",
    category: post.category,
    keywords: [post.category, "inklet", "e-ink", "ambient computing"],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "inklet",
      locale: "en_US",
      publishedTime,
      modifiedTime: publishedTime,
      authors: [post.author],
      section: post.category,
      tags: [post.category, "e-ink", "ambient computing"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.imageAlt ?? post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      site: "@inkletLLC",
      creator: "@inkletLLC",
      images: [{ url: image, alt: post.imageAlt ?? post.title }],
    },
  };
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const { slug } = await params;
  const post = getJournalPost(slug);

  if (!post) notFound();

  const url = `${JOURNAL_URL}/${post.slug}`;
  const image = post.image
    ? `${SITE_URL}${post.image}`
    : DEFAULT_SOCIAL_IMAGE;
  const publishedTime = `${post.publishedAt}T12:00:00Z`;
  const authorJsonLd = {
    "@type": post.authorType ?? "Organization",
    name: post.author,
    url: post.authorType === "Person" ? `${SITE_URL}/about` : SITE_URL,
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${post.title} — inklet Journal`,
        description: post.excerpt,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: { "@id": `${url}#primaryimage` },
        datePublished: publishedTime,
        dateModified: publishedTime,
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: image,
        contentUrl: image,
        width: 1200,
        height: 630,
        caption: post.imageAlt ?? post.title,
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        headline: post.title,
        name: post.title,
        description: post.excerpt,
        image: { "@id": `${url}#primaryimage` },
        datePublished: publishedTime,
        dateModified: publishedTime,
        inLanguage: "en-US",
        articleSection: post.category,
        keywords: [post.category, "inklet", "e-ink", "ambient computing"],
        author: authorJsonLd,
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "inklet LLC",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        isPartOf: {
          "@type": "Blog",
          "@id": `${JOURNAL_URL}#blog`,
          name: "inklet Journal",
          url: JOURNAL_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: JOURNAL_URL,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <>
      <article>
        <header
          className={`pt-32 md:pt-40 px-6 text-center ${
            post.image ? "pb-16 md:pb-20" : "pb-10 md:pb-12"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <Link
              href="/journal"
              className="eyebrow inline-flex text-[#aaa] hover:text-[#1a1a1a] transition-colors"
            >
              Journal · {post.category}
            </Link>
            <h1 className="font-[family-name:var(--font-newsreader)] text-5xl md:text-7xl font-light leading-[0.98] tracking-[-0.035em] mt-6">
              {post.title}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-[#666] leading-[1.75] mt-8">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#999] uppercase">
              <time dateTime={post.publishedAt}>{formatJournalDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-y border-[#dedbd2]">
              <div className="max-w-4xl mx-4 sm:mx-8 lg:mx-auto border-x border-[#dedbd2]">
                <JournalArtwork post={post} />
              </div>
            </div>
          </div>
        )}

        {!post.image && (
          <div className="max-w-6xl mx-auto px-6">
            <div className="border-t border-[#dedbd2]" />
          </div>
        )}

        <div
          className={`max-w-3xl mx-auto px-6 pb-16 md:pb-24 ${
            post.image ? "pt-16 md:pt-24" : "pt-10 md:pt-12"
          }`}
        >
          {post.blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={`${block.type}-${index}`}
                  className="font-[family-name:var(--font-newsreader)] text-2xl md:text-3xl font-light leading-[1.2] mt-12 mb-4"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "quote") {
              return (
                <blockquote
                  key={`${block.type}-${index}`}
                  className="font-[family-name:var(--font-inter)] text-base md:text-lg font-medium text-[#2f2e2a] leading-[1.8] my-7"
                >
                  {block.text}
                </blockquote>
              );
            }

            return (
              <p
                key={`${block.type}-${index}`}
                className="font-[family-name:var(--font-inter)] text-base md:text-lg text-[#4f4c47] leading-[1.8] mb-7"
              >
                {block.text}
              </p>
            );
          })}

          <div className="mt-14">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              <span aria-hidden="true">←</span> Back to Journal
            </Link>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
