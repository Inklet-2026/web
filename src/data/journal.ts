export type JournalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "code";
      code: string;
      lang?: string;
      filename?: string;
    }
  | {
      type: "links";
      links: { label: string; href: string }[];
    };

export interface JournalPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  authorType?: "Organization" | "Person";
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  screen: {
    subtitle: string;
    title: string;
    detail: string;
    stamp: string;
    alt: string;
  };
  blocks: JournalBlock[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "v0-1-is-coming",
    category: "SDK release",
    title: "inklet SDK v0.1: from your data to the wall",
    excerpt:
      "Turn a script, feed, or workflow into a quiet e-ink display—and follow it from source material to a frame confirmed in the room.",
    publishedAt: "2026-08-26",
    readingTime: "7 min read",
    author: "inklet team",
    featured: true,
    image: "/v0.1-pencil-sketch.png",
    imageAlt:
      "The original pencil sketch announcing the inklet SDK v0.1 release",
    screen: {
      subtitle: "inklet SDK",
      title: "v0.1 is here.",
      detail: "npm install @inklethq/sdk",
      stamp: "Aug 26 09:00",
      alt: "inklet SDK v0.1 release announcement",
    },
    blocks: [
      {
        type: "paragraph",
        text: "The pencil sketch above began as our way of saying v0.1 was coming. It is here now. But the useful part is not that there is a package on npm. It is that a developer can now take something their software already knows, decide how much control to keep, and carry it all the way to a frame an inklet display confirms in the room.",
      },
      {
        type: "paragraph",
        text: "That complete path is what v0.1 releases: source material, intent, routing, layout, rendering, delivery, and confirmation, exposed through one server-side TypeScript SDK. You can use it from a cron job, a backend route, a webhook, or a worker. The screen can become the quiet last step of a workflow you already have.",
      },
      {
        type: "heading",
        text: "Picture one useful thing",
      },
      {
        type: "paragraph",
        text: "Imagine a small script that runs every weekday at eight. It already knows today's three priorities, one number the team should watch, and the link behind that number. Today, the output might end up in a log, an inbox, or another dashboard someone has to remember to open. With the SDK, that same output can become a daily brief waiting on the right desk when the day begins.",
      },
      {
        type: "paragraph",
        text: "The input does not have to begin as a polished screen. It can be a sentence from your database, a link to a report, a chart your job just rendered, or a PDF another system produced. Build those pieces as Assets, add one sentence describing what matters, and let inklet turn them into something made for a glance instead of another session.",
      },
      {
        type: "code",
        lang: "bash",
        code: "npm install @inklethq/sdk",
      },
      {
        type: "code",
        lang: "ts",
        filename: "daily-brief.ts",
        code: `import { Inklet } from "@inklethq/sdk";

const inklet = new Inklet({ pat: process.env.INKLET_PAT! });

const result = await inklet.push.auto({
  idempotencyKey: "daily-brief-" + new Date().toISOString().slice(0, 10),
  title: "Daily brief",
  intent: "Lead with today's priorities; keep the metric secondary",
  assets: [
    inklet.assets.text("Ship onboarding, review the pilot, call Sam."),
    inklet.assets.text("Weekly activation is up 12%."),
    inklet.assets.link("https://example.com/report"),
  ],
});

console.log(result.contentId, result.state);`,
      },
      {
        type: "heading",
        text: "Choose the part you want to own",
      },
      {
        type: "paragraph",
        text: "For the daily brief, Auto is the shortest path. You provide the material and the intent; inklet chooses compatible displays and builds the layout. It works when the information matters more than the exact room or typography—team updates, a changing reading list, a report that should find the people who need it.",
      },
      {
        type: "paragraph",
        text: "Manual is for the moment when place is part of the meaning. Send a dinner plan to the kitchen, a visitor note to the front desk, or a project status to the display beside the team working on it. You choose the Display; inklet still reads, summarizes, and lays out what you send.",
      },
      {
        type: "paragraph",
        text: "Hardcode is for the cases where your software already made the picture. A custom renderer, generative artwork, a carefully dithered dashboard, or a status board can send one finished PNG or JPEG to one Display. inklet handles delivery and panel scaling without changing the composition. Hardcode works on Free and Pro; Auto and Manual use inklet AI and require Pro.",
      },
      {
        type: "quote",
        text: "Bring the information. Choose the room if it matters. Choose every pixel if that matters more.",
      },
      {
        type: "heading",
        text: "The whole path is now visible",
      },
      {
        type: "paragraph",
        text: "A call to push is the beginning of the physical journey, not the end of an HTTP request. The text, links, images, and files you send are Assets. Together with your intent, they become Content: the durable job inklet can fetch, summarize, route, and process. When that work is ready, the Content points to one or more Presentations—one rendered frame for each Display it should reach.",
      },
      {
        type: "paragraph",
        text: "From there, a Presentation moves from preparing to queued, then published when the Display asks for work, and finally confirmed when the panel reports that it is showing the frame. That last state closes a gap most software integrations leave open: your application can know the difference between 'the API accepted it,' 'the image exists,' and 'it is actually on the wall.'",
      },
      {
        type: "heading",
        text: "Build around what happens next",
      },
      {
        type: "paragraph",
        text: "The initial push normally returns while the Content is still processing. That makes the SDK fit naturally into real background work: save the returned Content ID, let your job continue, and check the lifecycle when your product needs to show progress or react to failure. Once the Content is ready, read its Presentation IDs to see where Auto routed it or to inspect each finished frame.",
      },
      {
        type: "paragraph",
        text: "A Display wakes on its own sync interval, so physical confirmation may arrive minutes after rendering. Your integration can read the next sync time, show a useful status, retry safely with the same idempotency key, or alert only when something truly fails. Re-running the daily brief with the same date-based key replays the same push instead of creating a duplicate.",
      },
      {
        type: "heading",
        text: "What you can make with it",
      },
      {
        type: "paragraph",
        text: "A company can turn a scheduled query into a morning metric that appears without opening a dashboard. A household app can place tonight's plan in the kitchen and tomorrow's departures by the door. A personal tool can pull one idea out of a notes archive each day. A home-automation workflow can render its own compact status image and send it exactly as designed.",
      },
      {
        type: "paragraph",
        text: "These are different stories, but the integration is the same shape: take a signal from software, turn it into a quiet visual object, put it where it becomes useful, and keep enough state to know whether it arrived. The SDK does not prescribe the source. It gives the last mile a stable vocabulary and a complete lifecycle.",
      },
      {
        type: "paragraph",
        text: "v0.1 ships with typed ESM and CommonJS builds for Node.js 20 and newer. Asset builders validate inputs locally, binary uploads retry failed tickets once, PAT authentication stays in trusted server environments, and distinct error classes preserve the details an integration needs to decide what is safe to retry. Those mechanics are there to support the story, not become the story.",
      },
      {
        type: "heading",
        text: "The loop is closed",
      },
      {
        type: "paragraph",
        text: "This is what feels new to us about the release. v0.1 is not only a way to send a request toward a display. It is a complete main path from something your software knows to something a person can notice in the right place: source, intent, layout, render, delivery, confirmation.",
      },
      {
        type: "paragraph",
        text: "Start with one useful thing your application already produces. Create a PAT in Portal, install the package, and give that thing a place in the room. The guides cover the first push, all three control levels, and every state between accepted and actually on the wall.",
      },
      {
        type: "links",
        links: [
          { label: "Read the docs", href: "https://docs.iminklet.com" },
          {
            label: "View on npm",
            href: "https://www.npmjs.com/package/@inklethq/sdk",
          },
          {
            label: "Explore on GitHub",
            href: "https://github.com/inklethq/sdk",
          },
        ],
      },
    ],
  },
  {
    slug: "designing-a-reliable-last-mile-from-typescript-to-an-e-ink-panel",
    category: "Engineering",
    title: "Designing a reliable last mile from TypeScript to an e-ink panel",
    excerpt:
      "How inklet turns one TypeScript call into a retry-safe, observable delivery pipeline that ends only when the physical panel confirms the frame.",
    publishedAt: "2026-09-01",
    readingTime: "9 min read",
    author: "inklet team",
    screen: {
      subtitle: "Engineering note",
      title: "A reliable last mile\nfor e-ink.",
      detail: "idempotent · observable · confirmed",
      stamp: "Sep 01 09:00",
      alt: "An inklet display describing a reliable TypeScript to e-ink delivery pipeline",
    },
    blocks: [
      {
        type: "paragraph",
        text: "A server can accept a request in milliseconds. An e-ink panel may be asleep, offline, or halfway through showing an older frame. Between those two moments sit asset uploads, background processing, routing, rendering, a device queue, a network handoff, and the physical refresh itself.",
      },
      {
        type: "paragraph",
        text: "That makes the last mile different from an ordinary API call. A 200 response can mean the intent was accepted, but it cannot honestly mean the pixels are already on glass. We designed the inklet SDK around that distinction: every boundary has an identity, every asynchronous step has a state, and the final truth comes from the panel.",
      },
      {
        type: "quote",
        text: "Reliable delivery is not one successful request. It is a chain of facts that can survive retries, delays, and partial failure.",
      },
      {
        type: "heading",
        text: "Make the logical write repeatable",
      },
      {
        type: "paragraph",
        text: "The first problem appears before rendering: callers retry. A worker times out after the service commits, a process restarts before saving the response, or a scheduler runs the same job twice. Without an application-level identity, each retry can create another Content and eventually another frame.",
      },
      {
        type: "code",
        lang: "ts",
        filename: "daily-brief.ts",
        code: `import { Inklet } from "@inklethq/sdk";

const inklet = new Inklet({ pat: process.env.INKLET_PAT! });
const runDate = new Date().toISOString().slice(0, 10);

const result = await inklet.push.auto({
  idempotencyKey: "daily-brief-" + runDate,
  title: "Daily brief",
  intent: "Lead with the number; keep the source secondary",
  assets: [
    inklet.assets.text("Activation is up 12% week over week."),
    inklet.assets.link("https://example.com/report"),
  ],
});

console.log(result.contentId, result.state);`,
      },
      {
        type: "paragraph",
        text: "Every high-level push carries an idempotency key. Reusing the same key with the same request replays the original result instead of creating a second Content. Reusing it with a different body is rejected as a conflict. The key is scoped to the authenticated caller and route, so it describes one logical write rather than a global name.",
      },
      {
        type: "paragraph",
        text: "Confirmation is retry-safe as well. The service claims a processing run atomically, which means simultaneous or repeated confirms do not enqueue duplicate work. The useful rule for an integration is simple: derive the key from a stable fact in your own domain—a date, record ID, or job ID—and keep it when you retry.",
      },
      {
        type: "heading",
        text: "Move bytes without moving credentials",
      },
      {
        type: "paragraph",
        text: "Text and links fit in the Content request. Images and files do not. For binary Assets, the service first records the metadata and returns a short-lived upload ticket for each file. The SDK then uploads those bytes directly to storage in parallel before confirming that the Content is complete.",
      },
      {
        type: "code",
        lang: "text",
        code: `create Content
  → upload binary Assets in parallel
  → refresh failed tickets once
  → confirm the Content
  → enqueue processing once`,
      },
      {
        type: "paragraph",
        text: "This split keeps the personal access token on the inklet API origin. Presigned storage uploads carry only their ticket fields; the PAT is never attached. If one upload fails, the SDK asks for fresh tickets only for the failed asset indexes and retries them once. A partial confirmation gets one more targeted refresh-and-confirm cycle before becoming an AssetUploadError that names the indexes still missing.",
      },
      {
        type: "paragraph",
        text: "The orchestration is deliberately in the high-level push methods. Most applications should not need to coordinate create, upload, refresh, and confirm themselves, but each lower-level Content operation remains available when an integration needs control over the boundary.",
      },
      {
        type: "heading",
        text: "Let state machines tell the truth",
      },
      {
        type: "paragraph",
        text: "After confirmation, the synchronous part is over. A Content moves from pending to processing, then to ready or failed. While it is processing, its stage can report fetching links, summarizing, routing, or creating Presentations. Those stages are useful for observability; the top-level state is what application control flow should trust.",
      },
      {
        type: "code",
        lang: "ts",
        filename: "wait-for-content.ts",
        code: `async function waitForContent(contentId: string, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  let delay = 500;

  while (Date.now() < deadline) {
    const content = await inklet.contents.retrieve(contentId);

    if (content.state === "ready" || content.state === "failed") {
      return content;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    delay = Math.min(delay * 2, 5_000);
  }

  throw new Error("Content did not settle before the deadline");
}`,
      },
      {
        type: "paragraph",
        text: "Backoff and a deadline matter. Processing is asynchronous by design, so a fixed, endless poll loop turns normal latency into unnecessary load. A ready Content means its Presentation IDs have been persisted. It does not promise that every output file is already finished, and it definitely does not mean a physical panel has displayed one.",
      },
      {
        type: "heading",
        text: "Do not confuse rendered with displayed",
      },
      {
        type: "paragraph",
        text: "A Presentation is the immutable frame for one Display. Its lifecycle crosses the physical boundary: preparing while render workers produce PNG, RAW2, and RAW4 outputs; queued while it waits for the Display; published after the frame has been handed over; and confirmed only after the panel reports that it is showing it. A Presentation can also expire or fail without ever becoming current.",
      },
      {
        type: "paragraph",
        text: "We keep pending and current separate on the Display for exactly this reason. pendingPresentationId means a frame has been published but not confirmed. currentPresentationId means the last frame the device confirmed is on the glass. An offline Display keeps its last known values, so an application can distinguish a stale panel from a render that never left the queue.",
      },
      {
        type: "code",
        lang: "ts",
        filename: "physical-state.ts",
        code: `const display = await inklet.displays.retrieve("display_123");
const current = await inklet.displays.current(display.id, { format: "png" });

console.log({
  pending: display.pendingPresentationId,
  confirmed: display.currentPresentationId,
  nextSyncAt: display.nextSyncAt,
  currentFrame: current?.image?.url ?? null,
});`,
      },
      {
        type: "paragraph",
        text: "The Display controls the last clock. It may wake on a multi-minute sync interval to preserve battery, so a frame can be rendered and queued well before it is confirmed. nextSyncAt tells the application when the next handoff should happen. The confirmation, not elapsed wall time, is the authoritative signal.",
      },
      {
        type: "heading",
        text: "Fail closed where trust changes",
      },
      {
        type: "paragraph",
        text: "Reliability also means refusing ambiguous behavior. A PAT is a server credential, so the SDK rejects browser environments at construction and checks again before requests and uploads. Authenticated calls accept only relative SDK API paths, and redirects are refused instead of risking a credential crossing origins.",
      },
      {
        type: "paragraph",
        text: "Responses are parsed just as strictly. If a successful HTTP response does not match the shape the SDK expects, it becomes an InvalidResponseError rather than a half-valid object moving deeper into the application. Token values are redacted from backend error messages before they can reach logs.",
      },
      {
        type: "heading",
        text: "Give every failure a useful identity",
      },
      {
        type: "paragraph",
        text: "Every SDK error extends InkletError and preserves the backend code, HTTP status, request ID, and structured details. Configuration and browser-environment failures are local programming errors. Authentication, permissions, subscription state, rate limits, transport failures, and upload failures remain distinct classes because they demand different responses.",
      },
      {
        type: "paragraph",
        text: "A retry policy can therefore be narrow. Retry a NetworkError or RateLimitError with the same idempotency key. Surface an authentication or subscription problem to an operator. Treat invalid configuration as code that needs fixing. When support needs to trace a backend failure, pass the request ID rather than a token or an entire log dump.",
      },
      {
        type: "heading",
        text: "The chain of identities",
      },
      {
        type: "paragraph",
        text: "The system becomes debuggable because each layer answers a different question. The idempotency key identifies the caller's logical attempt. The Content ID identifies the accepted submission. Presentation IDs identify the immutable frames produced from it. The Display's pending and current Presentation IDs show what was offered and what was confirmed. A request ID ties an individual failure back to the service.",
      },
      {
        type: "quote",
        text: "From TypeScript to e-ink, reliability comes from never asking one status to mean more than it can prove.",
      },
      {
        type: "heading",
        text: "What reliable means here",
      },
      {
        type: "paragraph",
        text: "The SDK cannot make a sleeping panel synchronous, and it should not pretend to. What it can do is make every transition explicit and safe to repeat: accept one logical write, move its bytes without leaking credentials, process it once, render immutable Presentations, publish them to the right Display, and wait for the physical device to confirm the result.",
      },
      {
        type: "paragraph",
        text: "That is the last mile we wanted from v0.1—not a shorter distance, but one an application can observe, reason about, and recover across all the way to the glass.",
      },
      {
        type: "links",
        links: [
          { label: "Read the lifecycle guide", href: "https://docs.iminklet.com/lifecycle" },
          {
            label: "View the SDK",
            href: "https://github.com/inklethq/sdk",
          },
          {
            label: "Open the API reference",
            href: "https://docs.iminklet.com/api/client",
          },
        ],
      },
    ],
  },
  {
    slug: "saving-was-only-half-the-problem",
    category: "Founder story",
    title: "Saving was only half the problem",
    excerpt:
      "I had built a careful second brain full of things I wanted to remember. The problem was that almost none of it returned when it could help.",
    publishedAt: "2026-08-18",
    readingTime: "6 min read",
    author: "Kevin Zhong",
    authorType: "Person",
    screen: {
      subtitle: "A founder note",
      title: "Saving was only\nhalf the problem.",
      detail: "by Kevin Zhong",
      stamp: "Aug 18 10:24",
      alt: "An inklet display showing the title of a founder note",
    },
    blocks: [
      {
        type: "paragraph",
        text: "I am very good at saving things. For years I put recipes in Notion, project ideas in Craft, reading notes in documents, and PDFs into carefully named folders. Every save was a small promise to my future self: this matters, and I will come back to it.",
      },
      {
        type: "paragraph",
        text: "The archive grew. My memory did not. A recipe could be perfectly organized and still fail to appear on the evening I needed it. A line from a book could sit one search away and never cross my mind again. I had solved capture, but not return.",
      },
      {
        type: "quote",
        text: "Saving something and seeing it again are two different problems.",
      },
      {
        type: "heading",
        text: "The wrong journey for one useful line",
      },
      {
        type: "paragraph",
        text: "The information was technically available, but getting to it meant opening the same devices that held messages, feeds, notifications, and dozens of tabs. Even when I began with a clear purpose, I had to walk through an environment designed to offer me another one.",
      },
      {
        type: "paragraph",
        text: "That felt backwards. The useful moment was often tiny: check the next step in a recipe, remember the three priorities for today, glance at when someone needed to leave. Why should each of those moments begin with an unlock, a search, and a negotiation with everything else on the screen?",
      },
      {
        type: "heading",
        text: "The question that became inklet",
      },
      {
        type: "paragraph",
        text: "I started asking a simple question: what if the information was already waiting where it became useful? The recipe could live in the kitchen. The focus list could wait on the desk. The family schedule could sit near the door, where everyone already passed it.",
      },
      {
        type: "paragraph",
        text: "That question became inklet, a system of connected e-ink displays for bringing saved information into the physical spaces where life happens. We were not trying to make another tablet or another inbox. We wanted a quiet output layer for the tools people already use.",
      },
      {
        type: "heading",
        text: "Why the screen had to be quiet",
      },
      {
        type: "paragraph",
        text: "E-ink matters here because it changes the posture of a screen. It can hold a page without glowing, refreshing a feed, or asking to be touched. It remains visible like paper, consuming significant power mainly when the image changes, so the information can stay in the room for months under normal use.",
      },
      {
        type: "paragraph",
        text: "The absences matter just as much. There is no camera, microphone, speaker, or notification feed. inklet is not supposed to become the most interesting object in a room. It should make the thing you chose easier to notice, then recede behind it.",
      },
      {
        type: "heading",
        text: "A way back out of the archive",
      },
      {
        type: "paragraph",
        text: "Your existing tools can keep doing what they do well: capturing and organizing. inklet gives their contents a physical place to return. You can send a screenshot, PDF, note, task, or recipe today; deeper integrations with tools such as Notion, Craft, and Obsidian can make that path even shorter as the platform develops.",
      },
      {
        type: "paragraph",
        text: "As our small team turns this idea into hardware and software, we keep coming back to one test: does this make information easier to use without creating another thing to manage? The answer will never come from how much inklet can do. It will come from how naturally the right page can become part of a room.",
      },
      {
        type: "paragraph",
        text: "I still save too much. But now I believe a second brain should do more than remember on my behalf. The best parts of it should be able to find their way back into my life.",
      },
    ],
  },
  {
    slug: "the-room-is-a-better-interface",
    category: "Field notes",
    title: "The room is a better interface",
    excerpt:
      "Digital information is organized by app. Life is organized by place. That difference is the starting point for inklet.",
    publishedAt: "2026-08-11",
    readingTime: "5 min read",
    author: "inklet team",
    screen: {
      subtitle: "Field note 01",
      title: "Life is organized\nby place.",
      detail: "the room is an interface",
      stamp: "Aug 11 09:41",
      alt: "An inklet display showing a field note about place",
    },
    blocks: [
      {
        type: "paragraph",
        text: "Most digital information is organized by app. Your notes are in one place, tasks in another, calendars somewhere else, and the PDF you need is wherever you happened to save it. That organization makes sense to a computer. It makes less sense to a room.",
      },
      {
        type: "paragraph",
        text: "Real life is organized by place. Cooking happens in the kitchen. Focus happens at a desk. Leaving happens at the door. The same piece of information can feel forgotten inside an app and obvious when it is placed where the action happens.",
      },
      {
        type: "quote",
        text: "Context is not only a time or a notification. Sometimes context is simply the room you are standing in.",
      },
      {
        type: "heading",
        text: "The kitchen does not need your whole phone",
      },
      {
        type: "paragraph",
        text: "Cooking with a phone works until your hands are wet, the display goes to sleep, or a message lands on top of the recipe. The kitchen rarely needs every capability of the phone. It needs the next few steps to remain visible beside the cutting board.",
      },
      {
        type: "paragraph",
        text: "A persistent e-ink page changes the interaction from retrieval to recognition. You do not have to remember where the recipe came from or reopen the right app. You look over, use it, and keep moving.",
      },
      {
        type: "heading",
        text: "The desk needs one priority, not every possibility",
      },
      {
        type: "paragraph",
        text: "A focus list is meant to narrow attention, yet we usually open it on the same laptop that contains twenty ways to avoid it. Putting that list on a separate, quiet surface changes its role. It stops being a destination and becomes part of the workspace.",
      },
      {
        type: "paragraph",
        text: "The same idea applies to a project note, meeting agenda, diagram, or unfinished thought. The goal is not to reproduce a dashboard at smaller scale. It is to choose the one piece of information that deserves to stay present while everything else remains closed.",
      },
      {
        type: "heading",
        text: "The doorway already has a workflow",
      },
      {
        type: "paragraph",
        text: "Households cross the doorway again and again. A schedule, pickup reminder, packing list, or simple message placed there becomes shared context without requiring everyone to remember the same app. A reminder by the door can be more useful than a notification dismissed ten minutes earlier.",
      },
      {
        type: "paragraph",
        text: "This is what we mean by room-based information. A recipe belongs in the kitchen, a focus list on the desk, and a schedule near the door—not because those are fixed templates, but because place gives information meaning.",
      },
      {
        type: "heading",
        text: "From app-based storage to place-based presentation",
      },
      {
        type: "paragraph",
        text: "inklet does not ask you to reorganize your life around another app. It is designed to take a note, task, screenshot, PDF, recipe, or schedule you already have and prepare it for the display where it will be useful. You can choose that display yourself, while the system can help organize content as its contextual capabilities develop.",
      },
      {
        type: "paragraph",
        text: "That distinction shapes the whole product. We design for distance instead of touch, persistence instead of motion, and a glance instead of a session. E-ink can hold the page without a backlight or a stream of notifications, allowing the display to become part of the room rather than another portal out of it.",
      },
      {
        type: "paragraph",
        text: "The internet taught us to ask where information is stored. We are more interested in where it becomes useful. Often, the best interface is not another menu. It is the place you were already going.",
      },
    ],
  },
  {
    slug: "what-we-chose-not-to-build",
    category: "Design principles",
    title: "What we chose not to build",
    excerpt:
      "No camera, microphone, speaker, or notification feed. The things missing from inklet are part of the product.",
    publishedAt: "2026-07-28",
    readingTime: "5 min read",
    author: "inklet team",
    screen: {
      subtitle: "Design principle 01",
      title: "Restraint is part\nof the product.",
      detail: "what we chose not to build",
      stamp: "Jul 28 20:06",
      alt: "An inklet display showing a note about product restraint",
    },
    blocks: [
      {
        type: "paragraph",
        text: "A normal product brief begins with a list of capabilities. Ours also needed a list of refusals. inklet would live in kitchens, bedrooms, hallways, and workspaces. If it was going to earn a place in those rooms, it could not behave like every other screen that had entered them.",
      },
      {
        type: "paragraph",
        text: "So we chose not to add a camera. Or a microphone. Or a speaker. We chose not to build a notification feed, an endless surface to explore, or another reason to keep checking a device. These are not omissions waiting to be corrected. They are boundaries that define what inklet is for.",
      },
      {
        type: "quote",
        text: "The things a calm product refuses to do matter as much as the things it can do.",
      },
      {
        type: "heading",
        text: "No feed behind the page",
      },
      {
        type: "paragraph",
        text: "Most screens are built as entrances. They light up, update, and offer somewhere else to go. Even a useful alert becomes a doorway into messages, news, and whatever arrived most recently. inklet is meant to do the opposite: hold the information you selected and stop there.",
      },
      {
        type: "paragraph",
        text: "That changes how we think about usefulness. A display does not become better by showing more at once. It becomes better when a recipe is legible from the counter, a focus list can be understood in a glance, or a schedule remains visible without asking anyone to unlock a device.",
      },
      {
        type: "heading",
        text: "No surveillance as the price of context",
      },
      {
        type: "paragraph",
        text: "Ambient computing can easily become ambient surveillance. We do not believe a display needs to watch or listen to a room in order to belong there. Context can begin with a much simpler signal: you decided that this content belongs in this place.",
      },
      {
        type: "paragraph",
        text: "For people who want supported processing and routing to remain at home, the inklet Pro Bundle includes a dedicated Compute Hub designed to run those tasks on the local network. The point is not to turn privacy into an expert mode. It is to give personal information a credible path that does not depend on sending it to the cloud.",
      },
      {
        type: "heading",
        text: "Not another closed appliance",
      },
      {
        type: "paragraph",
        text: "Restraint at the surface should not mean a closed system underneath. We want inklet to work with the information people already keep, not force everyone into a new silo. That is why direct sharing, deeper integrations, local automations, and a developer SDK belong to the same platform direction.",
      },
      {
        type: "paragraph",
        text: "The display can remain simple because the system around it is flexible. A screenshot or PDF can become a page. Different displays can hold different information. Developers can build the specialized paths that a small team would never think of on its own.",
      },
      {
        type: "heading",
        text: "A quieter definition of progress",
      },
      {
        type: "paragraph",
        text: "We will keep adding capabilities to inklet, but the goal is not maximum engagement. We are not trying to win more minutes of the day or turn every blank surface into a screen. We are trying to make a few useful pieces of information easier to live with.",
      },
      {
        type: "paragraph",
        text: "The best version of inklet is present when it helps and forgettable when it does not. Building toward that means knowing what to add. It also means protecting the empty space around it.",
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function formatJournalDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
