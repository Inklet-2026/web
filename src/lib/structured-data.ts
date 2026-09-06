import { GITHUB_URL, PACKAGE_NAME, SDK_VERSION } from "@/data/sdk";
import { SITE_NAME, siteUrl } from "@/lib/site";

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteUrl("/#website"),
    name: SITE_NAME,
    alternateName: ["iminklet", "iminklet.com"],
    url: siteUrl(),
    inLanguage: "en-US",
    publisher: {
      "@id": siteUrl("/#organization"),
    },
  };
}

export function getStoreJsonLd() {
  // The store compares different products. Offers belong on individual product
  // pages once the campaign is live and the purchase terms are confirmed.
  const products = [
    { name: "inklet Display D1", path: "/display" },
    { name: "inklet Compute Hub H1", path: "/hub" },
    { name: "inklet Portal", path: "/portal" },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "inklet products",
    url: siteUrl("/store"),
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: siteUrl(product.path),
    })),
  };
}

export function getHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": siteUrl("/hub#product"),
    url: siteUrl("/hub"),
    image: [siteUrl("/inklet-h1-black.png"), siteUrl("/inklet-h1-white.png")],
    name: "inklet Compute Hub H1",
    description:
      "On-device AI for your entire home. Every note, every query, every decision — processed locally on your network. No cloud, no subscription. Privacy by design.",
    brand: { "@type": "Brand", name: "inklet" },
    category: "Smart Home Hub",
    sku: "INKLET-H1",
    color: ["Black", "White"],
    additionalProperty: [
      { "@type": "PropertyValue", name: "SBC", value: "Orange Pi 6 Plus" },
      { "@type": "PropertyValue", name: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.3, Ethernet" },
    ],
    // Add an Offer only after Kickstarter opens for orders.
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteUrl("/#organization"),
    name: SITE_NAME,
    legalName: "inklet LLC",
    url: siteUrl(),
    logo: {
      "@type": "ImageObject",
      url: siteUrl("/logo.png"),
    },
    description:
      "Makers of distributed e-ink displays powered by AI.",
    sameAs: [
      "https://x.com/inkletLLC",
      "https://www.linkedin.com/company/inklet",
      "https://github.com/inklethq",
    ],
    founder: {
      "@type": "Person",
      name: "Kevin Zhong",
    },
  };
}

export function getDisplayJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": siteUrl("/display#product"),
    url: siteUrl("/display"),
    image: [siteUrl("/inklet-v1-black.png"), siteUrl("/inklet-v1-white.png")],
    name: "inklet Display D1",
    description:
      "A 7.5-inch ambient e-ink display that surfaces notes, PDFs, tasks, and schedules in the right room — AI-routed, with months of battery life.",
    brand: { "@type": "Brand", name: "inklet" },
    category: "Smart Home Display",
    sku: "INKLET-D1",
    color: ["Black", "White"],
    additionalProperty: [
      { "@type": "PropertyValue", name: "Screen Size", value: "7.5 inches" },
      { "@type": "PropertyValue", name: "Resolution", value: "800×480" },
      { "@type": "PropertyValue", name: "Battery", value: "2000mAh" },
      { "@type": "PropertyValue", name: "Display Type", value: "E-ink" },
    ],
    // Add an Offer only after Kickstarter opens for orders.
  };
}

export function getPortalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "inklet Portal",
    url: siteUrl("/portal"),
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web, iOS, macOS",
    description:
      "Manage every inklet e-ink display from one dashboard — push notes and PDFs, sync Notion, Craft, and Obsidian, and let AI route content by room.",
  };
}

export function getSdkJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "SoftwareSourceCode"],
    name: "inklet Portal SDK",
    url: siteUrl("/developers"),
    alternateName: PACKAGE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Node.js 20+",
    softwareVersion: SDK_VERSION,
    programmingLanguage: "TypeScript",
    codeRepository: GITHUB_URL,
    description:
      "Server-side TypeScript SDK for inklet e-ink displays — push text, links, images, and PDFs, and let Inklet handle layout, routing, and rendering.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
