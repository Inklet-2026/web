import StoreConfigurator from "@/components/StoreConfigurator";
import StorePortalPricing from "@/components/StorePortalPricing";
import { getStoreJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Store - inklet",
  description:
    "Get the inklet Display D1 at early bird pricing. Choose your color, stand, and bundle.",
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
    </div>
  );
}
