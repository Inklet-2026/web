import StoreConfigurator from "@/components/StoreConfigurator";
import StorePortalPricing from "@/components/StorePortalPricing";
import { getStoreJsonLd, getHubJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Store - inklet",
  description:
    "Get the inklet Display D1 and Compute Hub at early bird pricing. Choose your configuration.",
  openGraph: {
    title: "Store - inklet",
    description:
      "Get the inklet Display D1 and Compute Hub at early bird pricing. Choose your configuration.",
    url: "https://iminklet.com/store",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Store - inklet",
    description:
      "Get the inklet Display D1 and Compute Hub at early bird pricing. Choose your configuration.",
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
