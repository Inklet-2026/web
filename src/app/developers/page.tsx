export const metadata = {
  title: "Developers - inklet",
  description:
    "inklet Portal SDK — build custom integrations for your displays. Coming soon.",
  openGraph: {
    title: "Developers - inklet",
    description:
      "Build custom integrations for your inklet displays with the Portal SDK.",
    url: "https://iminklet.com/developers",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Developers - inklet",
    description:
      "Build custom integrations for your inklet displays with the Portal SDK.",
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-4">
          inklet Portal SDK
        </h1>
        <p className="text-[#555] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-wider">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
