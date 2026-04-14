import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
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
  title: "inklet — Your Second Brain, On Display",
  description:
    "inklet is a distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI, with an option for fully private, local processing.",
  openGraph: {
    title: "inklet — Your Second Brain, On Display",
    description:
      "A family of e-ink displays that surface the right information in the right room — powered by AI.",
    type: "website",
    siteName: "inklet",
  },
  twitter: {
    card: "summary_large_image",
    title: "inklet — Your Second Brain, On Display",
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
      <body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
