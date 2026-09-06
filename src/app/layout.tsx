import type { Metadata } from "next";
import {
  Newsreader,
  Inter,
  IBM_Plex_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/structured-data";
import { createPageMetadata } from "@/lib/metadata";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
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
  ...createPageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  }),
  metadataBase: new URL(SITE_URL),
  // Individual pages declare their own canonical URL.
  alternates: undefined,
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="inklet Journal"
          href="/journal/rss.xml"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D0LYSP1FQL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-D0LYSP1FQL');`,
          }}
        />
      </head>
      <body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
        <MotionProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
