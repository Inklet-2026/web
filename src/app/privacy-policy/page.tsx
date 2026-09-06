import { createPageMetadata } from "@/lib/metadata";
import { LAST_UPDATED, PRIVACY_POLICY_HTML } from "@/data/privacy-policy";

export const metadata = createPageMetadata({
  title: "Privacy Policy - inklet",
  description:
    "How inklet LLC collects, uses, and protects your information when you use inklet products and the inklet Portal.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-12 pb-8 border-b border-[#e8e5db]">
          <p className="eyebrow text-[#aaa] mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light text-[#1a1a1a] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#888]">Last updated: {LAST_UPDATED}</p>
        </header>

        <div
          className="legal"
          dangerouslySetInnerHTML={{ __html: PRIVACY_POLICY_HTML }}
        />
      </div>
    </section>
  );
}
