# Portal SDK Landing Page Design

## Goal

Add the Portal SDK as the third product line on the inklet website. This includes a homepage section, a standalone /developers page, and navbar/footer entries.

## Architecture

Three touchpoints: a new HomeSDK section on the homepage (light background, below HomePortal), a /developers Coming Soon page (mirrors /portal style), and nav/footer link additions. All are static — no backend or API logic needed.

## Changes

### 1. Homepage — HomeSDK Section

Inserted between HomePortal and the bottom CTA section on `/`.

- **Background:** Light (cream `#f5f3ed`, matching the rest of the homepage — contrast with the dark HomePortal above it)
- **Layout:** Two columns on desktop, stacked on mobile
  - **Left column:** SDK introduction
    - Label: "SDK" (same IBM Plex Mono uppercase tracking style as other section labels)
    - Title: "inklet Portal SDK" (Newsreader, same size as HomePortal title)
    - Description: ~2 sentences about what the SDK lets you do (push custom content sources to your displays via a simple API)
    - 3 bullet points for core capabilities:
      - Push API — send content to any display
      - TypeScript & Python SDKs
      - Works with Portal cloud and local compute hub
    - "Coming Soon" button (same style as HomePortal's Coming Soon — but light-theme version: border-[#e8e5db] text-[#aaa])
  - **Right column:** Code preview component
    - Dark rounded container (bg-[#1a1a1a] rounded-2xl)
    - Top bar with 3 dot indicators (macOS terminal style, decorative)
    - Syntax-highlighted TypeScript code showing a push API call:
      ```typescript
      import { Inklet } from '@inklet/sdk'

      const inklet = new Inklet({ apiKey: 'ink_...' })

      await inklet.content.push({
        type: 'markdown',
        body: '# Grocery List\n- Milk\n- Eggs',
        metadata: { tags: ['kitchen'] },
        ttl: '24h'
      })
      ```
    - Syntax highlighting: static CSS classes, no runtime highlighting library needed. Colors: keywords in muted blue (#7aa2f7), strings in muted green (#9ece6a), comments in gray (#555), property keys in light purple (#bb9af7), punctuation in #888.
- **Animation:** fadeUp (same framer-motion variant as other homepage sections)
- **Vertical spacing:** py-32 (generous but less than HomePortal's py-48, since it's a lighter section)

### 2. /developers Page

Mirrors the existing /portal page structure exactly:

- Dark background (`bg-[#1a1a1a]`), centered content
- Title: "inklet Portal SDK" (Newsreader, same size as Portal page)
- Subtitle: "Coming Soon" (IBM Plex Mono, `text-[#555]`)
- Metadata: `title: "Developers - inklet"`, appropriate description

### 3. Navbar

Add "SDK" entry after Portal, same disabled style:
- Gray text (`text-[#bbb]`), `cursor-default`, `select-none`
- `soon` superscript (same as Portal)
- Appears in both desktop and mobile nav

### 4. Footer

Add "Portal SDK" to the Products list, linking to `/developers`.

## File Changes

| Action | File |
|--------|------|
| Create | `src/components/HomeSDK.tsx` |
| Create | `src/app/developers/page.tsx` |
| Modify | `src/app/page.tsx` — add HomeSDK between HomePortal and CTA |
| Modify | `src/components/Nav.tsx` — add SDK nav entry |
| Modify | `src/components/Footer.tsx` — add SDK to Products list |

## Content

### HomeSDK description text
"Build custom integrations for your inklet displays. Push content from any source through a simple API — your data, your workflow, your displays."

### HomeSDK bullet points
- "Push API — send content to any display"
- "TypeScript & Python SDKs"
- "Works with Portal cloud and local compute hub"

### /developers page description
"inklet Portal SDK — build custom integrations for your displays. Coming soon."
