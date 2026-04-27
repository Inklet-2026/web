import StoreCountdown from "@/components/StoreCountdown";
import StoreConfigurator from "@/components/StoreConfigurator";
import StoreBundles from "@/components/StoreBundles";
import StorePortalPricing from "@/components/StorePortalPricing";

export const metadata = {
  title: "Store — inklet",
  description:
    "Get the inklet Display D1 at early bird pricing. Choose your color, stand, and bundle.",
};

export default function StorePage() {
  return (
    <div className="pt-24">
      {/* D1 Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreCountdown />
        <StoreConfigurator />
      </section>

      {/* Bundles */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <StoreBundles />
      </section>

      {/* Portal Subscription */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <StorePortalPricing />
      </section>
    </div>
  );
}
