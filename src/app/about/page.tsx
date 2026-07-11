import About from "@/components/About";
import { getOrganizationJsonLd } from "@/lib/structured-data";

const TITLE = "About inklet — Ambient E-Ink Displays for Your Information";
const DESCRIPTION =
  "inklet is built by inklet LLC — ambient e-ink displays for notes, PDFs, tasks, and room-based information. Not a drawing tablet or trackpad app.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://iminklet.com/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://iminklet.com/about",
    images: [{ url: "https://iminklet.com/social-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://iminklet.com/social-image.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationJsonLd()) }}
      />
    </>
  );
}
