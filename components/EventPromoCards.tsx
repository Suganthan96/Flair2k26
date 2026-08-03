"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);

  // The sidebar's links are plain #hash anchors — clicking one while this
  // modal is open changed the hash (and jumped/scrolled the page underneath)
  // but never told this component to close it, leaving it stuck open over
  // whatever section was just navigated to. Closing on any hash change
  // catches the sidebar and any other #anchor navigation (back/forward, etc).
  useEffect(() => {
    const onHashChange = () => setOpenIndex(null);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const washStops = WASH_COLORS.map((_, i) => i / (WASH_COLORS.length - 1));
  const washColor = useTransform(scrollYProgress, washStops, WASH_COLORS);

  return (
    // No logo here (see EventsHeader) and no overlap margin — this section
    // just follows EventsHeader in normal document flow, so it's purely the
    // grid, sized to fill the frame on its own.
    //
    // overflow-clip (not overflow-x-hidden alone): per the CSS overflow
    // spec, pairing any non-"visible" axis with a "visible" axis forces the
    // "visible" one to compute as `auto` — even if set explicitly — which
    // would silently turn this into its own scroll container. `clip` on
    // both axes sidesteps that entirely.
    <section
      ref={sectionRef}
      className="relative z-10 flex w-full flex-col overflow-clip pb-6 sm:pb-8 lg:min-h-screen lg:pb-0"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-24 -z-10 rounded-[3rem] opacity-25 blur-[110px]"
        style={{ backgroundColor: washColor }}
      />

      <EventsGrid events={events} onOpenDetails={setOpenIndex} />

      {/* AnimatePresence (not a plain conditional) so the modal's exit
          animation actually gets to play — a bare `{cond && <X/>}` would
          unmount it instantly, before any exit transition could run. */}
      <AnimatePresence>
        {openIndex !== null && (
          <EventDetailModal
            event={events[openIndex]}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
