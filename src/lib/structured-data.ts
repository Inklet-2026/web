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
