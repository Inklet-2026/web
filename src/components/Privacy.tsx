import { HiOutlineShieldCheck, HiOutlineServer, HiOutlineWifi, HiOutlineCode } from "react-icons/hi";

const points = [
  { icon: HiOutlineWifi, text: "Self-hosted on your LAN" },
  { icon: HiOutlineServer, text: "On-device AI" },
  { icon: HiOutlineShieldCheck, text: "No cloud dependency" },
  { icon: HiOutlineCode, text: "Open-source friendly" },
];

export default function Privacy() {
  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-8">
          Your thoughts stay yours.
        </h2>

        <p className="text-lg text-[#666] leading-relaxed max-w-2xl mx-auto mb-16">
          inklet offers a local compute hub* — every note, every query, every
          AI decision processed entirely on your home network. No cloud. No
          data leaves your walls. OTA updates are still delivered to keep your
          device secure and up to date. For families and professionals who
          believe privacy isn&apos;t a feature — it&apos;s a right.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((point) => (
            <div key={point.text} className="flex flex-col items-center gap-3">
              <point.icon className="text-[#888]" size={28} />
              <span className="text-sm text-[#666]">{point.text}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#bbb] font-[family-name:var(--font-ibm-plex-mono)] mt-10">
          * Only available with Pro Bundle
        </p>
      </div>
    </section>
  );
}
