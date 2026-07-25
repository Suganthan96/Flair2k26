"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import EventCard from "./EventCard";
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
      className="relative z-10 -mt-[115vh] overflow-x-hidden px-6 pb-6 pt-16 sm:-mt-[118vh] sm:pb-8 sm:pt-20 lg:-mt-[122vh]"
    >
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="flex justify-center">
          <Image
            src="/assets/events-removebg-preview.png"
            alt="Events"
            width={612}
            height={408}
            className="h-auto w-56 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:w-72"
          />
        </AnimatedSection>
      </div>

      <div ref={listRef} className="relative mx-auto mt-8 flex max-w-6xl flex-col gap-10">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -inset-y-24 -z-10 rounded-[3rem] opacity-25 blur-[110px]"
          style={{ backgroundColor: washColor }}
        />

        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            onOpenDetails={() => setOpenIndex(i)}
          />
        ))}
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
