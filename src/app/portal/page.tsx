export const metadata = {
  title: "Portal - inklet",
  description:
    "inklet Portal — your cloud dashboard for ambient life. Coming soon.",
  openGraph: {
    title: "Portal - inklet",
    description:
      "Your cloud dashboard for ambient life. Manage all inklet displays from one place.",
    url: "https://iminklet.com/portal",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Portal - inklet",
    description:
      "Your cloud dashboard for ambient life. Manage all inklet displays from one place.",
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function PortalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-[#f5f3ed] -mt-16 pt-16">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-4">
          inklet Portal
        </h1>
        <p className="text-[#555] font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-wider">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
