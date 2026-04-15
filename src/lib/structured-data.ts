export function getProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "inklet",
    description:
      "A distributed e-ink display system that surfaces your notes, tasks, and ideas in the right room — powered by AI.",
    brand: {
      "@type": "Brand",
      name: "inklet",
    },
    category: "Smart Home Display",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "179",
      highPrice: "1099",
      priceCurrency: "USD",
      offerCount: "3",
      availability: "https://schema.org/PreOrder",
      offers: [
        {
          "@type": "Offer",
          name: "Single Display",
          price: "179",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
        {
          "@type": "Offer",
          name: "Home Bundle",
          price: "649",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
        {
          "@type": "Offer",
          name: "Pro Bundle — Self-Hosted Edition",
          price: "1099",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
      ],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "inklet",
    description:
      "Makers of distributed e-ink displays powered by AI.",
  };
}
