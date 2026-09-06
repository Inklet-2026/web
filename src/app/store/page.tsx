import { createPageMetadata } from "@/lib/metadata";
import StoreConfigurator from "@/components/StoreConfigurator";
import StorePortalPricing from "@/components/StorePortalPricing";
import { getStoreJsonLd } from "@/lib/structured-data";

const TITLE = "inklet Store - E-Ink Displays, Hubs & Bundles";
const DESCRIPTION =
  "Explore inklet D1 e-ink displays, Compute Hub H1, and whole-home bundles. Choose your display color and stand, and compare Portal subscription plans.";

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/store",
});

export default function StorePage() {
  return (
    <div className="pt-48">
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreConfigurator />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-32">
        <StorePortalPricing />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStoreJsonLd()) }}
      />
    </div>
  );
}
