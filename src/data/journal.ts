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
    title: "Introducing inklet SDK v0.1",
    excerpt:
      "@inklethq/sdk v0.1 is now available: a typed, server-side SDK for sending text, links, images, and files to inklet e-ink displays.",
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
        text: "The pencil sketch above began as our way of saying v0.1 was coming. It is here now. @inklethq/sdk 0.1.0 is available on npm, with a new documentation site that covers the complete public surface from the first token to the frame a display confirms on the wall.",
      },
      {
        type: "paragraph",
        text: "This is the first public developer-preview release of the inklet SDK: a typed, server-side JavaScript and TypeScript client for turning text, links, images, and files into content for inklet e-ink displays. It ships ESM and CommonJS builds together, includes its own TypeScript declarations, and supports Node.js 20 and newer.",
      },
      {
        type: "code",
        lang: "bash",
        code: "npm install @inklethq/sdk",
      },
      {
        type: "heading",
        text: "One package, four nouns",
      },
      {
        type: "paragraph",
        text: "The API is built around four things. A Display is a physical panel bound to your account. An Asset is one raw input: text, a link, an image, or a file. A Content is the submission that holds those assets and your intent. A Presentation is the finished frame rendered for one Display, available as PNG, RAW2, or RAW4 when the panel supports it.",
      },
      {
        type: "paragraph",
        text: "The high-level push methods connect those pieces. They validate assets in your process, create the Content, upload binary files directly to temporary storage, retry a failed upload once, confirm the Content, and return an idempotency key you can safely reuse. What remains is choosing how much of the decision belongs to inklet and how much belongs to you.",
      },
      {
        type: "code",
        lang: "ts",
        filename: "brief.ts",
        code: `import { Inklet } from "@inklethq/sdk";

const inklet = new Inklet({ pat: process.env.INKLET_PAT! });

const result = await inklet.push.auto({
  title: "Daily brief",
  intent: "Make the key update easy to scan",
  assets: [
    inklet.assets.text("Revenue is up 12% week over week."),
    inklet.assets.link("https://example.com/report"),
  ],
});

console.log(result.contentId, result.state);`,
      },
      {
        type: "heading",
        text: "Three ways to push",
      },
      {
        type: "paragraph",
        text: "Auto Push lets inklet choose both the compatible displays and the layout. It is the shortest path from useful source material to the right room: send between one and fifty assets, add an optional sentence of intent, and let inklet route and typeset the result. Auto uses inklet AI and requires Pro.",
      },
      {
        type: "paragraph",
        text: "Manual Push keeps the routing decision with you. You provide a display ID, while inklet still fetches links, understands and summarizes the assets, and builds the layout. Because that processing still uses inklet AI, Manual also requires Pro.",
      },
      {
        type: "paragraph",
        text: "Hardcode Push is the direct path. You provide exactly one finished PNG or JPEG and the target display; inklet scales it to the panel output without summarizing or redesigning it. Hardcode is available on both Free and Pro, which makes it the starting point for custom renderers, generated dashboards, and pixel-controlled experiments.",
      },
      {
        type: "quote",
        text: "Auto chooses the room and the layout. Manual lets you choose the room. Hardcode lets you choose the pixels.",
      },
      {
        type: "heading",
        text: "Server-only by design",
      },
      {
        type: "paragraph",
        text: "The SDK authenticates with a personal access token issued in the inklet Portal. A PAT is a server credential, so the client refuses to construct in a browser environment before any request is made. The same guard runs again for requests and uploads, helping stop an accidental client import from turning into a leaked token.",
      },
      {
        type: "paragraph",
        text: "Authenticated requests are restricted to relative paths on the configured inklet service, and redirects are refused. Binary assets travel directly to short-lived presigned storage URLs without the PAT attached. If a backend message contains the token, the SDK redacts it before exposing the error. The default address is the developer-preview cloud service, while baseUrl can point the same client at a local Compute Hub.",
      },
      {
        type: "heading",
        text: "A push is a request, not a render",
      },
      {
        type: "paragraph",
        text: "A successful push usually returns while its Content is still processing, before Presentation IDs exist. That is intentional. Summarizing, routing, typesetting, rendering, and delivery happen asynchronously, and the physical display shows the frame the next time it wakes and asks for work.",
      },
      {
        type: "paragraph",
        text: "v0.1 exposes that lifecycle instead of hiding it. Contents move from pending to processing and then ready or failed. Presentations move from preparing to queued, published, and confirmed. You can inspect processing stages, poll for the finished frame, read a display's next sync time, and distinguish a rendered image from one the panel has actually confirmed.",
      },
      {
        type: "heading",
        text: "Small enough to understand, complete enough to build with",
      },
      {
        type: "paragraph",
        text: "Beyond push, the release includes read APIs for Displays, their queues and current frames, Contents, and Presentations. Asset builders validate inputs before a network request: up to 50 assets per Content and 10 MiB for each binary. Presentation images can be requested as PNG, RAW2, or RAW4 according to a display's capabilities.",
      },
      {
        type: "paragraph",
        text: "Every SDK error extends InkletError and preserves the backend code, HTTP status, request ID, and structured details. Configuration and browser-environment mistakes fail locally. Authentication, permissions, subscription requirements, rate limits, upload failures, and network errors remain distinct classes so an integration can decide what to fix, what to surface, and what is safe to retry.",
      },
      {
        type: "paragraph",
        text: "The surface is deliberately compact, and 0.x means it can still evolve. Our goal for v0.1 is not to predict every integration. It is to make the path from a useful idea to a quiet physical frame clear, typed, observable, and open enough for other people to build on.",
      },
      {
        type: "heading",
        text: "Start with one useful thing",
      },
      {
        type: "paragraph",
        text: "Install the package, create a PAT in Portal, and send the one piece of information you wish already had a place in the room. The full guides cover authentication, plans, lifecycle, every push mode, and the lower-level resource APIs when you are ready to go further.",
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
