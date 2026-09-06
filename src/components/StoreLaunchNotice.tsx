const KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/clckkkkk/inklet";

export default function StoreLaunchNotice() {
  return (
    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs tracking-[1px] text-[#7a6a4f]">
      Stay tuned for{" "}
      <a
        href={KICKSTARTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-[#1a1a1a]"
      >
        Kickstarter
      </a>
    </span>
  );
}
