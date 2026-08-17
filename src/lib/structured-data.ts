import { faqItems } from "@/data/faq";
import { GITHUB_URL, PACKAGE_NAME, SDK_VERSION } from "@/data/sdk";

const KICKSTARTER_URL = "https://www.kickstarter.com/projects/clckkkkk/inklet";

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
      highPrice: "1199",
      priceCurrency: "USD",
      offerCount: "5",
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
        {
          "@type": "Offer",
          name: "Compute Hub H1",
          price: "749",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
        {
          "@type": "Offer",
          name: "Compute Hub H1 Pro",
          price: "1199",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
      ],
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "inklet LLC",
    alternateName: ["inklet display", "iminklet"],
    url: "https://iminklet.com",
  };
}

export function getStoreJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "inklet Display D1",
      description:
        "An ambient e-ink display that surfaces the right information in the right room — powered by AI, synced from Notion, Craft, and Obsidian.",
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
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "179",
        highPrice: "1099",
        priceCurrency: "USD",
        offerCount: "3",
        availability: "https://schema.org/PreOrder",
        priceValidUntil: "2026-07-31",
        url: "https://www.kickstarter.com/projects/clckkkkk/inklet",
        offers: [
          {
            "@type": "Offer",
            name: "Single Display",
            price: "179",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            priceValidUntil: "2026-07-31",
            description: "1 × inklet e-ink display, 1 month free cloud subscription",
          },
          {
            "@type": "Offer",
            name: "Home Bundle",
            price: "649",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            priceValidUntil: "2026-07-31",
            description: "4 × inklet e-ink displays, 6 months free cloud subscription",
          },
          {
            "@type": "Offer",
            name: "Pro Bundle — Self-Hosted Edition",
            price: "1099",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            priceValidUntil: "2026-07-31",
            description: "4 × inklet e-ink displays, 1 × inklet compute hub, fully local",
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "inklet Portal",
      description:
        "Cloud dashboard for ambient life — AI-powered content routing, Notion/Craft/Obsidian sync, OTA firmware updates.",
      brand: { "@type": "Brand", name: "inklet" },
      category: "Software Subscription",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "10",
        highPrice: "100",
        priceCurrency: "USD",
        offerCount: "2",
        availability: "https://schema.org/PreOrder",
        offers: [
          {
            "@type": "Offer",
            name: "Monthly",
            price: "10",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            description: "inklet Portal monthly subscription",
          },
          {
            "@type": "Offer",
            name: "Annual",
            price: "100",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
            description: "inklet Portal annual subscription — save 17%",
          },
        ],
      },
    },
  ];
}

export function getHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
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
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "749",
      highPrice: "1199",
      priceCurrency: "USD",
      offerCount: "2",
      availability: "https://schema.org/PreOrder",
      priceValidUntil: "2027-06-30",
      offers: [
        {
          "@type": "Offer",
          name: "inklet Compute Hub H1",
          price: "749",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          priceValidUntil: "2027-06-30",
          description: "16GB unified memory, Gemma 4 E4B, fully local AI processing",
        },
        {
          "@type": "Offer",
          name: "inklet Compute Hub H1 Pro",
          price: "1199",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
          priceValidUntil: "2027-06-30",
          description: "32GB unified memory, Gemma 4 26B A4B, fully local AI processing, priority support",
        },
      ],
    },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "inklet LLC",
    url: "https://iminklet.com",
    description:
      "Makers of distributed e-ink displays powered by AI.",
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
    offers: {
      "@type": "Offer",
      name: "inklet D1 — early bird",
      price: "179",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      priceValidUntil: "2026-07-31",
      url: KICKSTARTER_URL,
    },
  };
}

export function getPortalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "inklet Portal",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web, iOS, macOS",
    description:
      "Manage every inklet e-ink display from one dashboard — push notes and PDFs, sync Notion, Craft, and Obsidian, and let AI route content by room.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "10",
      highPrice: "100",
      priceCurrency: "USD",
      offerCount: "2",
      offers: [
        {
          "@type": "Offer",
          name: "Monthly",
          price: "10",
          priceCurrency: "USD",
          description: "inklet Portal monthly subscription",
        },
        {
          "@type": "Offer",
          name: "Annual",
          price: "100",
          priceCurrency: "USD",
          description: "inklet Portal annual subscription — save 17%",
        },
      ],
    },
  };
}

export function getSdkJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "inklet Portal SDK",
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

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
