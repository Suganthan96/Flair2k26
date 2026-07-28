"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { events } from "@/data/mockData";

type EventItem = (typeof events)[number];
type SlideFrom = "left" | "right" | "top" | "bottom";

// Bento span + hover-panel slide direction per event, keyed by id (same
// per-item lookup pattern as GRADIENTS[i % GRADIENTS.length] in
// eventVisuals.ts). Unevenness and direction only apply at `lg` and up —
// smaller screens fall back to a plain uniform 2-col grid.
const TILE_CONFIG: Record<string, { span: string; slideFrom: SlideFrom }> = {
  "AI Prompting": { span: "lg:col-span-2 lg:row-span-2", slideFrom: "left" },
  "paper-presentation": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "top" },
  "treasure-hunt": { span: "lg:col-span-1 lg:row-span-1", slideFrom: "right" },
  "Code-Debugging": { span: "lg:col-span-1 lg:row-span-1", slideFrom: "right" },
  "bussiness-pitch": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "bottom" },
  "meme-creation": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "left" },
  "Tech Charades": { span: "lg:col-span-1 lg:row-span-2", slideFrom: "right" },
  // 2-wide (not 1x1) so the 8 tiles' total area is exactly 16 cells (a full
  // 4x4 rectangle) — with an odd total, CSS grid's dense packing always
  // leaves one empty cell somewhere, which rendered as a visible gap.
  "Technical Connection": { span: "lg:col-span-2 lg:row-span-1", slideFrom: "bottom" },
};

const DEFAULT_CONFIG = { span: "lg:col-span-1 lg:row-span-1", slideFrom: "bottom" as SlideFrom };

const OFFSCREEN: Record<SlideFrom, { x?: string; y?: string }> = {
  left: { x: "-100%" },
  right: { x: "100%" },
  top: { y: "-100%" },
  bottom: { y: "100%" },
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
    // through the flex chain here) + 4 equal-fraction rows: the parent
    // wrapper is a flex column with this grid as its flex-1 item, so this
    // element itself gets a real, definite height equal to whatever space
    // remains below the logo on any screen size — grid-rows-4 then divides
    // that height evenly across the 4 rows, filling the frame exactly.
    <div className="grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-4 lg:flex-1 lg:grid-flow-dense">
      {events.map((event, i) => {
        const config = TILE_CONFIG[event.id] ?? DEFAULT_CONFIG;
        const offscreen = OFFSCREEN[config.slideFrom];
        const isHovered = hoveredIndex === i;

        return (
          <button
            key={event.id}
            type="button"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onOpenDetails(i)}
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

            {/* Always-visible title strip — the touch/mobile experience,
                and the resting state on desktop before the door panel
                takes over on hover. */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 lg:transition-opacity lg:group-hover:opacity-0">
              <h3 className="font-black-ops text-sm uppercase leading-tight text-white sm:text-base">
                {event.title}
              </h3>
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
          </button>
        );
      })}
    </div>
  );
}
