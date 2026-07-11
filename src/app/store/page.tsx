import StoreConfigurator from "@/components/StoreConfigurator";
import StorePortalPricing from "@/components/StorePortalPricing";
import { getStoreJsonLd, getHubJsonLd } from "@/lib/structured-data";

const TITLE = "inklet Store — Buy the D1 E-Ink Display, Compute Hub H1 & Bundles";
const DESCRIPTION =
  "Get the inklet D1 ambient e-ink display from $179 early bird. Choose color and stand, add the local Compute Hub H1, or save with a whole-home bundle.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/store" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/store",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function StorePage() {
  return (
    <div className="pt-48">
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreConfigurator />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <StorePortalPricing />
      </section>

      {getStoreJsonLd().map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHubJsonLd()) }}
      />
    </div>
  );
}
