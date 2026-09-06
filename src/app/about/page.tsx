import { createPageMetadata } from "@/lib/metadata";
import About from "@/components/About";

const TITLE = "About inklet - Ambient E-Ink Displays";
const DESCRIPTION =
  "Meet the team behind inklet: connected e-ink displays and software that bring notes, tasks, and useful information into the spaces where you live and work.";

export const metadata = createPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  return <About />;
}
