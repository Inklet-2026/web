import Image from "next/image";
import StaticPanel from "@/components/StaticPanel";
import type { JournalPost } from "@/data/journal";

export default function JournalArtwork({
  post,
  compact = false,
}: {
  post: JournalPost;
  compact?: boolean;
}) {
  return (
    <div className="relative isolate aspect-[40/21] overflow-hidden bg-[#efede6]">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          fill
          sizes={
            compact
              ? "(min-width: 768px) 552px, calc(100vw - 48px)"
              : "(min-width: 1152px) 1104px, calc(100vw - 48px)"
          }
          className="object-cover"
          loading="eager"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(115deg, rgba(255,255,255,0.45), transparent 42%), repeating-linear-gradient(0deg, rgba(70,65,55,0.025) 0, rgba(70,65,55,0.025) 1px, transparent 1px, transparent 4px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[7%] top-0 bottom-0 -z-10 w-px bg-[#ddd9cf]"
          />
          <div
            aria-hidden="true"
            className="absolute left-[7%] right-0 bottom-[10%] -z-10 h-px bg-[#ddd9cf]"
          />
          <div className="absolute inset-0 flex items-center justify-center px-8 py-6 md:px-12 md:py-8">
            <div
              className={`w-full drop-shadow-[0_24px_30px_rgba(58,52,43,0.13)] ${
                compact ? "max-w-[430px]" : "max-w-[650px]"
              }`}
            >
              <StaticPanel
                screen={post.screen}
                size={compact ? "compact" : "large"}
                eager
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
