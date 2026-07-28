"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import EventsGrid from "./EventsGrid";
import EventDetailModal from "./EventDetailModal";
import { events } from "@/data/mockData";

// Matches the "from" tone of each card's gradient in eventVisuals.ts, cycled
// the same way (i % length). A soft ambient wash behind the whole list
// shifts through these as you scroll — echoing the reference site's
// per-section background colour changes, without copying its layout.
const WASH_COLORS = ["#5b1a8c", "#1b3f73", "#ed1c24", "#1b3f73"];

export default function EventPromoCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start center", "end center"],
  });
  const washStops = WASH_COLORS.map((_, i) => i / (WASH_COLORS.length - 1));
  const washColor = useTransform(scrollYProgress, washStops, WASH_COLORS);

  return (
    // Negative top margin pulls the logo + card list up so they visibly rise
    // over the tail of the hero's sticky scroll — but this section has no
    // background of its own (intentionally transparent), so only the logo
    // and the cards themselves appear to rise; the gaps around them show
    // the hero's own fade happening underneath, not a solid panel edge.
    //
    // Must clear 100vh with real margin to spare: Hero's `position: sticky`
    // releases (stops tracking scroll 1:1 and starts scrolling away
    // normally) once scrollY reaches heroSectionHeight - 100vh. Hero's fade
    // tracks the "Events" wordmark itself, which sits below this section's
    // own top padding — so the wordmark reaching the viewport's top needs
    // more scroll than this section's outer edge reaching it. If overlap
    // were too tight, that point would fall past the release — and once
    // released, the gap between hero and this section stops closing (both
    // scroll at the same rate), permanently freezing coverage short of 100%.
    <section
      id="events"
      // overflow-clip (not overflow-x-hidden alone): per the CSS overflow
      // spec, pairing any non-"visible" axis with a "visible" axis forces
      // the "visible" one to compute as `auto` — even if set explicitly —
      // which silently turned this section into its own scroll container
      // (with its own scrollbar) since its content overflows its box due to
      // the negative margin above. `clip` on both axes sidesteps the rule
      // entirely (neither axis is "visible") without establishing a scroll
      // container, so no scrollbar, while still clipping horizontal bleed.
      className="relative z-10 flex -mt-[115vh] flex-col overflow-clip pb-6 pt-16 sm:-mt-[118vh] sm:pb-8 sm:pt-20 lg:min-h-screen lg:-mt-[122vh] lg:pb-0 lg:pt-0"
    >
      {/* On mobile this sits in normal flow above the grid, same as before.
          At lg+ it's pulled out of flow entirely (absolute, floating over
          the fading hero) so it no longer reserves any layout space — the
          grid becomes the section's only flex child and grows to fill the
          entire frame, top to bottom. */}
      <div className="mx-auto w-full max-w-6xl shrink-0 px-6 lg:absolute lg:left-1/2 lg:top-6 lg:z-20 lg:w-auto lg:-translate-x-1/2 lg:px-0">
        <AnimatedSection className="flex justify-center">
          <Image
            src="/assets/events-removebg-preview.png"
            alt="Events"
            width={612}
            height={408}
            className="h-auto w-56 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:w-72 lg:w-48"
          />
        </AnimatedSection>
      </div>

      {/* Full-bleed, edge-to-edge — unlike the logo above, the grid
          intentionally breaks out of the max-w-6xl/px-6 container to span
          the full viewport width with no side gutters. `flex-1` fills the
          section's full height at lg+, since the logo above no longer
          participates in the flex layout there. */}
      <div ref={listRef} className="relative mt-8 flex w-full flex-col lg:mt-0 lg:flex-1">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -inset-y-24 -z-10 rounded-[3rem] opacity-25 blur-[110px]"
          style={{ backgroundColor: washColor }}
        />

        <EventsGrid events={events} onOpenDetails={setOpenIndex} />
      </div>

      {openIndex !== null && (
        <EventDetailModal
          event={events[openIndex]}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
