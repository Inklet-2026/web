import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import { getProductJsonLd, getOrganizationJsonLd, getWebSiteJsonLd } from "@/lib/structured-data";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  title: "inklet — Ambient Information, Everywhere",
  description:
    "inklet builds ambient technology that surfaces the right information in the right place. No glowing screens. No pings. Just clarity.",
  openGraph: {
    title: "inklet — Ambient Information, Everywhere",
    description:
      "Ambient technology that surfaces the right information in the right place.",
    type: "website",
    siteName: "inklet",
  },
  twitter: {
    card: "summary_large_image",
    title: "inklet — Ambient Information, Everywhere",
    description:
      "Ambient technology that surfaces the right information in the right place.",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D0LYSP1FQL" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-D0LYSP1FQL');`,
          }}
        />
      </head>
      <body className="bg-[#f5f3ed] text-[#1a1a1a] font-[family-name:var(--font-inter)] antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
