# Scroll-Driven 3D Showcase — Design Spec

Replaces the static "One brain, every room." `UseCases` section with an Apple-style scroll-driven 3D house tour. The 3D house model and anchor data come from `git@github.com:Inklet-2026/sim3d.git`.

## Decisions

| Question | Answer |
|----------|--------|
| Layout | Full-width 3D canvas + floating frosted-glass text card (Option B) |
| Card position | Alternating left/right per room |
| Camera behavior | Continuous fly-through with hold zones per room; paths through doors/corridors to avoid walls |
| Mobile | Simplified 3D (lower DPR, same scroll-driven behavior) |
| User interaction | None — scroll only, no orbit, no click |

## Architecture

### Section Layout

```
<section id="use-cases">
  Static heading: "One brain, every room." + subtitle
  
  Scroll container (height: 500vh)
    └── Sticky viewport (height: 100vh, position: sticky, top: 0)
        ├── R3F Canvas (position: absolute, inset: 0)
        │   ├── HouseModel (31.6 MB GLB)
        │   ├── ScrollCameraRig (scroll-driven camera on CatmullRomCurve3)
        │   └── InkletMarker × 4 (decorative wall rings, no interaction)
        └── FloatingCard (absolute positioned, alternates left/right)
```

### Scroll Progress → Camera Mapping

Total scroll: 500vh. Progress 0 → 1.

| Scroll Range | Camera | Text Card |
|---|---|---|
| 0.00–0.12 | Bird's eye overview | (none — heading visible above) |
| 0.12–0.15 | Fly into Living Room | — |
| 0.15–0.30 | Living Room hold | Card fades in (left side) |
| 0.30–0.38 | Fly to Bedroom | Card fades out |
| 0.38–0.53 | Bedroom hold | Card fades in (right side) |
| 0.53–0.61 | Fly to Guest Bedroom | Card fades out |
| 0.61–0.76 | Guest Bedroom hold | Card fades in (left side) |
| 0.76–0.84 | Fly to Bathroom | Card fades out |
| 0.84–1.00 | Bathroom hold | Card fades in (right side) |

### Camera Path

CatmullRomCurve3 through waypoints. Two splines: one for camera position, one for look-at target.

Waypoints derived from `anchors.json` view/inklet positions + manually placed corridor midpoints between rooms to avoid clipping through walls.

Scroll-to-spline mapping is non-linear: hold zones map to tiny spline segments (slight idle drift), transition zones map to larger segments (actual camera movement).

### Floating Text Card

- Frosted glass: `background: rgba(245,243,237,0.85); backdrop-filter: blur(12px)`
- Border: `1px solid rgba(232,229,219,0.6)`
- Rounded corners: `border-radius: 16px`
- Position: vertically centered, 40px from edge, alternating left/right
- Content: room label (IBM Plex Mono, uppercase, tracking), tagline (Newsreader), description (Inter)
- Animation: opacity fade + 20px slide from edge, driven by scroll progress via Framer Motion `useTransform`

### Room Content

| Room | Tagline | Description |
|---|---|---|
| Living Room | The household dashboard everyone walks past | Weather, calendar, family schedule — glanceable from the couch. |
| Bedroom | Wake up to what matters | Sleep data, morning briefing, daily intention. |
| Guest Bedroom | Your focus list, front and center | Tasks, deadlines, meeting notes — no phone required. |
| Bathroom | Your morning routine, simplified | Time, weather, schedule — everything you need before you head out. |

### Mobile Adaptation

- Same scroll-driven 3D, same floating cards
- DPR capped at `[1, 1.5]` (desktop: `[1, 2]`)
- Floating card: full-width with horizontal margins, centered bottom
- Canvas height stays 100vh

## File Structure

```
src/components/Showcase3D/
├── index.tsx              # next/dynamic wrapper (ssr: false) + section heading
├── Showcase3DInner.tsx    # Sticky viewport, Canvas, floating cards
├── Showcase3DCanvas.tsx   # R3F Canvas, lighting, Suspense, Environment
├── HouseModel.tsx         # useGLTF loader
├── ScrollCameraRig.tsx    # Scroll-driven camera on CatmullRomCurve3
├── InkletMarker.tsx       # Decorative wall rings (from sim3d, no click)
├── InkletRingMaterial.ts  # GLSL shader (from sim3d, unchanged)
├── FloatingCard.tsx       # Animated frosted-glass text card
├── useAnchors.ts          # Fetch /anchors.json
└── types.ts               # RoomId, Anchor, Room, AnchorsFile

public/
├── models/house-optimized.glb   # 31.6 MB (from sim3d)
└── anchors.json                 # Room anchor data (from sim3d)
```

## Dependencies

Add to `dependencies`:
- `three` ^0.175.0
- `@react-three/fiber` ^9.6.0
- `@react-three/drei` ^10.7.7

Add to `devDependencies`:
- `@types/three` ^0.184.0

No zustand needed — scroll progress ref is the sole state driver.

## Integration

In `page.tsx`, replace `<UseCases />` with `<Showcase3D />`. Old `UseCases.tsx` preserved until new section is validated.
