"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
const TILE_CONFIG: Record<string, { span: string; slideFrom: SlideFrom }> = {
  "AI Prompting": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "left" },
  "paper-presentation": { span: "lg:col-span-3 lg:row-span-1", slideFrom: "top" },
  "treasure-hunt": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "right" },
  "Code-Debugging": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "right" },
  "bussiness-pitch": { span: "lg:col-span-1 lg:row-span-1", slideFrom: "bottom" },
  "meme-creation": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "left" },
  "Tech Charades": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "right" },
  "Technical Connection": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "bottom" },
};

const DEFAULT_CONFIG = { span: "lg:col-span-1 lg:row-span-1", slideFrom: "bottom" as SlideFrom };

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
    // through the flex chain here) + 4 equal-fraction rows: the parent
    // wrapper is a flex column with this grid as its flex-1 item, so this
    // element itself gets a real, definite height equal to whatever space
    // remains below the logo on any screen size — grid-rows-4 then divides
    // that height evenly across the 4 rows, filling the frame exactly.
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:flex-1 lg:grid-flow-dense">
      {events.map((event, i) => {
        const config = TILE_CONFIG[event.id] ?? DEFAULT_CONFIG;
        const offscreen = OFFSCREEN[config.slideFrom];
        const entrance = ENTRANCE_OFFSET[config.slideFrom];
        const isHovered = hoveredIndex === i;

        return (
          <motion.button
            key={event.id}
            type="button"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onOpenDetails(i)}
            initial={{ opacity: 0, filter: "blur(8px)", ...entrance }}
            whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative min-h-[9rem] overflow-hidden border border-white/10 text-left lg:min-h-0 ${config.span}`}
          >
            {event.backgroundImage && (
              <Image
                src={event.backgroundImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                style={{ objectPosition: event.backgroundPosition ?? "center" }}
              />
            )}
            <div className="absolute inset-0 bg-black/25" />

            {/* Always-visible title + description strip — the touch/mobile
                experience, and the resting state on desktop before the door
                panel takes over on hover. */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 lg:transition-opacity lg:group-hover:opacity-0">
              <h3 className="font-black-ops text-sm uppercase leading-tight text-white sm:text-base">
                {event.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75 sm:text-sm">
                {event.description}
              </p>
            </div>

            {/* Sliding door panel — desktop/hover only. Driven by the same
                shared hoveredIndex, so switching tiles animates the old
                one out and the new one in from the same state change. */}
            <motion.div
              className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-black/80 p-4 lg:flex"
              initial={false}
              animate={isHovered ? { x: 0, y: 0 } : offscreen}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-black-ops text-lg uppercase leading-tight text-white">
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {event.description}
              </p>
            </motion.div>
          </motion.button>
        );
      })}
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

  return (
    <motion.button
      type="button"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onOpenDetails}
      initial={{ opacity: 0, filter: "blur(8px)", ...entrance }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
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
          src={hoverVideo}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
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
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            style={{ objectPosition: event.backgroundPosition ?? "center" }}
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-black/25" />

      {/* Always-visible title strip — the touch/mobile experience,
          and the resting state on desktop before the door panel
          takes over on hover. */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 lg:transition-opacity lg:group-hover:opacity-0">
        <h3 className="font-black-ops text-sm uppercase leading-tight text-white sm:text-base">
          {event.title}
        </h3>
      </div>

      {/* Sliding door panel — desktop/hover only. */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden flex-col justify-end p-4 lg:flex"
        initial={false}
        animate={isHovered ? { x: 0, y: 0 } : offscreen}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="font-black-ops text-lg uppercase leading-tight text-white">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {event.description}
        </p>
      </motion.div>
    </motion.button>
  );
}
