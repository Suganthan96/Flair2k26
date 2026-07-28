# Events section redesign: uneven grid with sliding "door" hover panels

## Context

The current events section (`EventPromoCards.tsx` → `EventCard.tsx`) is a long vertical stack of full-bleed cards, each with its own scroll-triggered 3D twist entrance (`TwistCard.tsx`) and a sliding character-art element. Combined with the Hero section's own heavy scroll-scrubbed cinematic sequence (Doctor Doom frame-by-frame animation, fading into the events section as it rises), the page reads as "loud" end-to-end — there's no calmer beat between the two. The user wants to replace the long-scroll card list with a compact, uneven ("bento") grid of tiles — one per event — that is simple and photo-forward at rest, reveals the event name + description on hover via a sliding door-style panel, and opens the existing full-detail modal on click.

This keeps the Hero's cinematic weight as a one-time entrance moment; the events section itself becomes a calmer, scannable overview, with visual richness returning in the modal rather than being spread across a long scroll. Confirmed with the user: **all 8 current events** are included (not 7 — `data/mockData.ts`'s `events` array has 8 entries; "Sacred Connections" is included as an 8th tile), and the grid uses **fully mixed bento sizes** (no single dominant hero tile) with **slide direction varying per tile position**.

## Data source — nothing new needed

Every tile pulls directly from the existing `events` array in `data/mockData.ts`. Relevant fields already present on every event:
- `title` — shown in both the base title strip and the hover door panel
- `description` — the short teaser, shown in the door panel (NOT `longDescription`, which stays reserved for the modal only)
- `backgroundImage` — used as the tile's photo (`object-cover`); every one of the 8 events already has this set
- `backgroundPosition` — optional crop position override, already used the same way in `EventCard.tsx`
- `icon` — not used by the grid tiles (icons were only ever shown on the no-backgroundImage fallback path in `EventCard.tsx`; since all 8 events have `backgroundImage`, every tile is photo-based, so no icon fallback path is needed in the new grid)

No changes to `mockData.ts` are required.

## Grid layout

**Container**: `grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:auto-rows-[9rem] lg:grid-flow-dense`

- Mobile/tablet (`< lg`): plain 2-column grid, every tile is an implicit 1×1 — the bento unevenness only applies at `lg` and above, so small screens get a clean uniform layout instead of oddly-shaped tiles at narrow widths.
- Desktop (`>= lg`): 4 columns, `auto-rows-[9rem]` gives a fixed row height unit that tile spans multiply against (a 2-row tile is 2×9rem + gap tall), and `grid-flow-dense` lets the browser's dense-packing algorithm fill gaps automatically — so tiles only need `col-span`/`row-span` declared per tile; no manual `grid-column-start`/`grid-row-start` coordinates need to be computed by hand.

**Per-tile span + slide-direction table** (in `mockData.ts` order):

| # | Event id | Title | Span (`lg:` only) | Approx. rendered size | Slide-in direction |
|---|---|---|---|---|---|
| 1 | `AI Prompting` | Prompt with Jarvis | `lg:col-span-2 lg:row-span-2` | large square | `left` |
| 2 | `paper-presentation` | S.H.I.E.L.D's Archive | `lg:col-span-2 lg:row-span-1` | wide | `top` |
| 3 | `treasure-hunt` | Where is Gamora? | `lg:col-span-1 lg:row-span-1` | small | `right` |
| 4 | `Code-Debugging` | Debuggers Assemble | `lg:col-span-1 lg:row-span-1` | small | `right` |
| 5 | `bussiness-pitch` | Stark Tank | `lg:col-span-2 lg:row-span-1` | wide | `bottom` |
| 6 | `meme-creation` | I Can Meme This All Day | `lg:col-span-1 lg:row-span-2` | tall | `left` |
| 7 | `Tech Charades` | X-Charades | `lg:col-span-1 lg:row-span-2` | tall | `right` |
| 8 | `Technical Connection` | Sacred Connections | `lg:col-span-1 lg:row-span-1` | small | `bottom` |

This mapping lives as a small config object keyed by `event.id` (same indexing pattern already used for `GRADIENTS[i % GRADIENTS.length]` in `eventVisuals.ts`), with a safe fallback (`col-span-1 row-span-1`, direction `bottom`) for any future event added to `mockData.ts` without an explicit entry.

Each tile: `rounded-[1.5rem] border border-white/10 overflow-hidden`, photo via `next/image` `fill` + `object-cover` (`objectPosition: event.backgroundPosition ?? "center"`, matching the exact pattern already in `EventCard.tsx`), plus a flat `bg-black/25` wash for baseline text legibility even before hover.

## Interaction & animation — full detail

### Shared hover state
`EventsGrid` owns:
```ts
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
```
Each tile is a `<button>` (keyboard/click-accessible) with:
- `onMouseEnter={() => setHoveredIndex(i)}`
- `onMouseLeave={() => setHoveredIndex(null)}`
- `onClick={() => onOpenDetails(i)}`

Because there is exactly one `hoveredIndex` value shared across all 8 tiles, only one tile's `isHovered` (`hoveredIndex === i`) is ever true at a time — moving the pointer from tile A to tile B updates the same state variable, so A's panel animates back out and B's animates in within the same React render, with no manual "close the previous one" logic needed.

### The door panel itself
Per tile, a `motion.div` (framer-motion — already the project's animation library, used identically in `TwistCard.tsx` and the character-art slide in `EventCard.tsx`) absolutely covers the tile:

```tsx
<motion.div
  className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-black/80 p-4 lg:flex"
  initial={false}
  animate={isHovered ? { x: 0, y: 0 } : offscreen}
  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
>
  <h3 className="font-black-ops text-lg uppercase leading-tight text-white">{event.title}</h3>
  <p className="mt-2 text-sm leading-relaxed text-white/80">{event.description}</p>
</motion.div>
```

- **`offscreen`** is looked up per-tile from its configured direction:
  - `left` → `{ x: "-100%" }`
  - `right` → `{ x: "100%" }`
  - `top` → `{ y: "-100%" }`
  - `bottom` → `{ y: "100%" }`
- **`initial={false}`**: the panel starts already in its offscreen position with no entrance animation on first mount (avoids every tile visibly "sliding in" once on page load).
- **Duration/easing**: `0.45s`, cubic-bezier `[0.16, 1, 0.3, 1]` — this is the same "snappy-then-settle" ease already used for `TwistCard.tsx`'s scroll-reveal entrance, reused here for visual consistency across the site's motion language rather than introducing a new easing curve.
- **Symmetry**: because `animate` is driven by the same `isHovered` boolean in both directions, the slide-out (when hover moves to a different tile) uses the identical duration/easing as the slide-in — no separate "closing" animation to author.
- **`pointer-events-none`** on the panel itself: hover/click still register on the underlying `<button>`, not swallowed by the panel overlay.
- **`hidden ... lg:flex`**: the door-panel mechanic is desktop/pointer-only (see mobile fallback below); framer-motion animating a `display:none` element is harmless (no visual effect, no console errors) below `lg`.

### Base (non-hovered) state
A lighter, always-present title strip anchored to the tile's bottom, independent of the door-panel mechanic:
```tsx
<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 lg:group-hover:opacity-0 lg:transition-opacity">
  <h3 className="font-black-ops text-sm uppercase leading-tight text-white sm:text-base">{event.title}</h3>
</div>
```
- Visible by default (mobile and desktop alike) so a tile is never just a bare unlabeled photo.
- On `lg` and up, fades to `opacity-0` via Tailwind's `group-hover` (the tile `<button>` carries the `group` class) at the same moment the framer-motion door panel is sliding in over it — a plain CSS opacity transition here is intentionally simpler than wiring this into the same React state, since it's a passive fade rather than a directional slide.

### Click → modal (unchanged from today)
`onClick={() => onOpenDetails(i)}` calls straight through to the existing `openIndex` state and `<EventDetailModal>` render already present in `EventPromoCards.tsx` — completely unaffected by whether the door panel happens to be open or closed at the moment of the click.

### Mobile / touch fallback
Touch devices have no hover state, so below `lg` the door panel never renders (`hidden lg:flex`) — the base title strip (see above) stays permanently visible instead, and tapping a tile goes straight to the modal via the same `onClick`. This avoids a "stuck open" door panel or a dead hover interaction on phones/tablets.

## Component structure

- **New file**: `components/EventsGrid.tsx` — grid container, per-tile config lookup, and the tile markup/animation described above.
- **`EventPromoCards.tsx`**: keeps its outer `<section>` (logo, hero-fade `-mt-[...vh]` overlap margin, `overflow-clip`, wash-color background `motion.div`, `openIndex` state, `<EventDetailModal>` render) exactly as-is. Only the inner `events.map(... <EventCard/>)` block is swapped for a single `<EventsGrid events={events} onOpenDetails={setOpenIndex} />`.
- **`EventCard.tsx`**: no longer rendered by the events section. Left in place rather than deleted, since it's a large, tailored component (scroll-linked character-art positioning, twist entrance, background-image + gradient variants) that may be worth keeping for reference or rollback — flagged as unused once the grid ships rather than removed outright, pending user confirmation.
- **`EventDetailModal.tsx`**: entirely unchanged — same glass panels, background image, guidelines, register button.
- **`TwistCard.tsx`**: not used by the new grid. The grid's entrance onto the page relies on the section's existing `AnimatedSection`/hero-fade-overlap treatment rather than a per-tile 3D scroll-reveal, keeping the tiles themselves calm at rest.

## Files touched

- `components/EventsGrid.tsx` — new
- `components/EventPromoCards.tsx` — swap card-list rendering for `<EventsGrid>`
- No changes to `data/mockData.ts`, `EventDetailModal.tsx`, `eventVisuals.ts`, or `TwistCard.tsx`

## Verification (once implementation begins)

- `npx tsc --noEmit` and `npm run build`.
- Manual/Playwright browser check: confirm each tile's door panel slides in from its configured direction on hover; confirm hovering a second tile closes the first with a visible 0.45s slide-out (not an instant cut); confirm click opens the existing modal with the correct event's data regardless of hover state; confirm the mobile fallback (permanent title strip, tap-to-modal, no door panel rendered) on a narrow viewport; confirm the dense-packed bento layout has no visual gaps or overlaps at the `lg` breakpoint and cleanly collapses to the 2-column grid below it.
