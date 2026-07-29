"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

// Separated from EventPromoCards so the "EVENTS" wordmark and the card grid
// can never compete for the same space or overlap one another — this is
// purely the title, sized to its own content, and EventPromoCards (the
// grid) simply follows it in normal document flow.
//
// Keeps the `id="events"` anchor (nav links point here) and the same
// negative top margin as before, so it's still this element that rises up
// over the tail of the hero's sticky scroll, not the grid.
export default function EventsHeader() {
  return (
    <section
      id="events"
      className="relative z-10 -mt-[115vh] overflow-clip px-6 pb-2 pt-16 sm:-mt-[118vh] sm:pt-20 lg:-mt-[122vh] lg:pt-6"
    >
      <div className="mx-auto flex max-w-6xl justify-center">
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
    </section>
  );
}
