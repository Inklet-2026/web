import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import { getProductJsonLd, getOrganizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: ["300", "400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "inklet — Your Second Brain, On eInk Display",
  description:
    "inklet is a distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI, with an option for fully private, local processing.",
  openGraph: {
    title: "inklet — Your Second Brain, On eInk Display",
    description:
      "A family of e-ink displays that surface the right information in the right room — powered by AI.",
    type: "website",
    siteName: "inklet",
  },
  twitter: {
    card: "summary_large_image",
    title: "inklet — Your Second Brain, On eInk Display",
    description:
      "A family of e-ink displays that surface the right information in the right room — powered by AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <link rel="icon" href="/logo_light.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo_dark.png" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getProductJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
