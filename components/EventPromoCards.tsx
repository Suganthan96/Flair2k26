"use client";

import { useState } from "react";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import EventCard from "./EventCard";
import EventDetailModal from "./EventDetailModal";
import { events } from "@/data/mockData";

export default function EventPromoCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="events" className="relative overflow-x-hidden px-6 pb-6 pt-16 sm:pb-8 sm:pt-20">
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

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-10">
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
