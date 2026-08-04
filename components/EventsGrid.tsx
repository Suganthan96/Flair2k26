"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { events } from "@/data/mockData";

type EventItem = (typeof events)[number];
type SlideFrom = "left" | "right" | "top" | "bottom";

// Bento span + hover-panel slide direction per event, keyed by id (same
// per-item lookup pattern as GRADIENTS[i % GRADIENTS.length] in
// eventVisuals.ts). Unevenness and direction only apply at `lg` and up —
// smaller screens fall back to a plain uniform 2-col grid.
//
// Spans + column-track widths (see the grid container below) are matched to
// a reference photo-grid layout: a tall tile on the far left, a wide strip
// across the top of the rest, a tall tile with an extra-wide middle column,
// a couple of squares, two more tall tiles, and a wide strip along the
// bottom. With `lg:grid-cols-[1fr_2fr_1fr_1fr]` and this exact span order,
// plain (non-dense) row-major auto-placement tiles all 16 cells with no
// gaps — verified by hand-tracing the placement algorithm — so no explicit
// grid-column/grid-row line numbers are needed.
// `widthPercent` is this tile's actual rendered width at `lg:` as a percent
// of the grid — measured from the live layout, not derived from col-span
// (the 1fr/2fr/1fr/1fr track widths mean a "1-column" tile can be either
// 20% or 40% wide depending which column it lands in). Feeds the `sizes`
// prop below so Next.js requests an image sized for how big the tile
// actually renders, instead of a generic guess that under-fetches for the
// wider tiles and renders visibly blurry.
const TILE_CONFIG: Record<string, { span: string; slideFrom: SlideFrom; widthPercent: number }> = {
  "AI Prompting": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "left", widthPercent: 20 },
  "paper-presentation": { span: "lg:col-span-3 lg:row-span-1", slideFrom: "top", widthPercent: 80 },
  "treasure-hunt": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "right", widthPercent: 20 },
  "Code-Debugging": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "right", widthPercent: 40 },
  "bussiness-pitch": { span: "lg:col-span-1 lg:row-span-1", slideFrom: "bottom", widthPercent: 20 },
  "meme-creation": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "left", widthPercent: 40 },
  "Tech Charades": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "right", widthPercent: 20 },
  "Technical Connection": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "bottom", widthPercent: 60 },
};

const DEFAULT_CONFIG = { span: "lg:col-span-1 lg:row-span-1", slideFrom: "bottom" as SlideFrom, widthPercent: 20 };

const OFFSCREEN: Record<SlideFrom, { x?: string; y?: string }> = {
  left: { x: "-100%" },
  right: { x: "100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" },
};

// Scroll-entrance offset (px, not the door panel's %) — each tile arrives
// from the same direction its own hover door panel later slides in from,
// so the two motions read as one consistent idea per tile rather than two
// unrelated animations. Fade + blur-to-focus, staggered by index — same
// language as a GSAP masonry-reveal, built with framer-motion (already the
// project's animation library) instead of adding GSAP as a dependency.
const ENTRANCE_OFFSET: Record<SlideFrom, { x?: number; y?: number }> = {
  left: { x: -60 },
  right: { x: 60 },
  top: { y: -60 },
  bottom: { y: 60 },
};

// Per-id hover video, same lookup pattern as TILE_CONFIG above. Revealed
// behind the photo once it slides out on hover, in place of plain black.
const HOVER_VIDEO: Record<string, string> = {
  "AI Prompting": "/assets/prompt-with-jarvis.mp4",
  "paper-presentation": "/assets/shield's-archieve.mp4",
  "treasure-hunt": "/assets/where-is-gamora.mp4",
  "Code-Debugging": "/assets/Debuggers-Assemble.mp4",
  "bussiness-pitch": "/assets/Stark-tank.mp4",
  "meme-creation": "/assets/i-can-meme-this-all-day.mp4",
  "Tech Charades": "/assets/x-charades.mp4",
  "Technical Connection": "/assets/sacred-connections.mp4",
};

export default function EventsGrid({
  events,
  onOpenDetails,
}: {
  events: EventItem[];
  onOpenDetails: (index: number) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    // flex-1 (not h-full — percentage heights didn't reliably resolve
    // through the flex chain here): the parent wrapper is a flex column
    // with this grid as its flex-1 item, so this element itself gets a
    // real, definite height equal to whatever space remains below the logo
    // on any screen size — grid-rows-4 then divides that height evenly
    // across the 4 rows, filling the frame exactly. Column tracks are
    // 1fr/2fr/1fr/1fr (not equal) to match the reference layout's wider
    // middle column — see the TILE_CONFIG comment above for how the spans
    // and this track width combine to tile with no gaps.
    <div className="grid grid-cols-2 lg:grid-cols-[1fr_2fr_1fr_1fr] lg:grid-rows-4 lg:flex-1">
      {events.map((event, i) => (
        <EventTile
          key={event.id}
          event={event}
          index={i}
          isHovered={hoveredIndex === i}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          onOpenDetails={() => onOpenDetails(i)}
        />
      ))}
    </div>
  );
}

function EventTile({
  event,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onOpenDetails,
}: {
  event: EventItem;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpenDetails: () => void;
}) {
  const config = TILE_CONFIG[event.id] ?? DEFAULT_CONFIG;
  const offscreen = OFFSCREEN[config.slideFrom];
  const entrance = ENTRANCE_OFFSET[config.slideFrom];
  const hoverVideo = HOVER_VIDEO[event.id];
  // WebM (VP9) sibling of the same clip, same basename — typically 30-50%
  // smaller than the H.264 mp4 at equivalent quality. Listed first in the
  // <source> list below so browsers that support it use it; mp4 is the
  // universal fallback (notably for Safari, which doesn't decode VP9).
  const hoverVideoWebm = hoverVideo?.replace(/\.mp4$/, ".webm");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only plays while actually hovered — no point decoding video the user
  // can't see, and restarting from frame 0 each time keeps every hover
  // consistent instead of resuming mid-clip.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered]);

  // Quietly warms the browser's HTTP cache for this tile's video once the
  // page has gone idle (after the initial paint/load, so it never competes
  // with anything the user is actually waiting on) — by the time someone
  // actually hovers, the file's often already cached and starts instantly
  // instead of visibly buffering on first play. `requestIdleCallback` isn't
  // in Safari, hence the setTimeout fallback.
  useEffect(() => {
    if (!hoverVideoWebm) return;
    const prefetch = () => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "video";
      link.href = hoverVideoWebm;
      document.head.appendChild(link);
    };
    const hasRic = "requestIdleCallback" in window;
    const handle = hasRic ? window.requestIdleCallback(prefetch) : window.setTimeout(prefetch, 1000);
    return () => {
      if (hasRic) window.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
    };
  }, [hoverVideoWebm]);

  // Desktop: a real mouse hover already sets isHovered=true before the
  // click lands, so this fires onOpenDetails immediately — identical to
  // the old single-click behaviour. Touch has no hover, so the first tap
  // only reveals (matching what hover shows on desktop) and a second tap
  // on the now-revealed tile opens the modal.
  function handleClick() {
    if (isHovered) {
      onOpenDetails();
    } else {
      onHoverStart();
    }
  }

  return (
    <motion.button
      type="button"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleClick}
      initial={{ opacity: 0, filter: "blur(8px)", ...entrance }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative min-h-[9rem] overflow-hidden border border-white/10 text-left lg:min-h-0 ${config.span}`}
    >
      {/* Solid, static black base — always there, never animated.
          The photo sits on top of this; once it slides out on hover,
          this is what's left behind, so the door panel's text lands
          on a clean black backdrop instead of whatever's behind the
          card (the section's own ambient colour wash). */}
      <div className="absolute inset-0 bg-black" />

      {/* Sits above the black base and below the photo, so it's only
          revealed once the photo slides out of the way on hover. */}
      {hoverVideo && (
        <video
          ref={videoRef}
          poster={event.backgroundImage}
          muted
          loop
          playsInline
          // "metadata" (not "none"): fetches just enough to know the video's
          // duration/dimensions, not the whole file — cheap even with 8
          // tiles on the page, and gives playback a small head start over
          // fetching nothing at all until hover. The real fix for load lag
          // is re-encoding these (see scripts/optimize-videos.mjs — was up
          // to 14 Mbps/60fps/1920px source footage with an unused audio
          // track, now capped at 960px/30fps/no-audio, ~1-5MB instead of
          // 17-38MB) plus the idle-time prefetch above and the poster frame.
          preload="metadata"
          // scale-110: several of these source clips have a hair of
          // letterboxing baked into the footage itself (not something
          // object-cover alone can crop away, since it's part of the
          // video's own pixels) — most visible as thin gaps at the tile
          // corners on the widest tiles, where the crop has to zoom in
          // the most. A modest zoom pushes that baked-in edge out of frame.
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        >
          {/* webm first: browsers use the first <source> whose type they
              support, and VP9/webm is typically 30-50% smaller than the
              h264/mp4 fallback at equivalent quality. Safari (no VP9
              decode) falls through to the mp4. */}
          {hoverVideoWebm && <source src={hoverVideoWebm} type="video/webm" />}
          <source src={hoverVideo} type="video/mp4" />
        </video>
      )}

      {/* Photo lives in its own layer so it alone can slide out on
          hover — the static black base (and hover video, if any) above
          stays put, left exposed once the image clears the frame.
          Travels the same direction its own door panel enters from, so
          the two read as one continuous swap rather than two unrelated
          animations. */}
      {event.backgroundImage && (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={isHovered ? offscreen : { x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={event.backgroundImage}
            alt=""
            fill
            sizes={`(max-width: 1024px) 50vw, ${config.widthPercent}vw`}
            className="object-cover"
            style={{ objectPosition: event.backgroundPosition ?? "center" }}
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-black/25" />

      {/* Resting-state title strip — visible until the tile is revealed
          (hover on desktop, first tap on mobile), then fades out as the
          door panel takes over. Driven by isHovered directly (not CSS
          :hover) so it responds the same way to a tap as to a real hover. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4"
        initial={false}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-black-ops text-sm uppercase leading-tight text-white sm:text-base">
          {event.title}
        </h3>
      </motion.div>

      {/* Sliding door panel — revealed the same way on every device now:
          hover on desktop, first tap on mobile (second tap opens the
          modal; see handleClick above). Just the description (the title
          strip above already covers that) plus a corner badge hinting at
          the click-through to the detail page. The badge is a span, not a
          nested <button> — the whole tile is already one. */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4"
        initial={false}
        animate={isHovered ? { x: 0, y: 0 } : offscreen}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-md">
          Click Here
          <ArrowRight size={14} />
        </span>
        <p className="text-sm leading-relaxed text-white/80">
          {event.description}
        </p>
      </motion.div>
    </motion.button>
  );
}
