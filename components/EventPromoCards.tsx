"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import EventDetailModal from "./EventDetailModal";
import { iconMap, GRADIENTS } from "./eventVisuals";
import { events } from "@/data/mockData";

export default function EventPromoCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="events" className="relative px-6 pb-6 pt-16 sm:pb-8 sm:pt-20">
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
        {events.map((event, i) => {
          const Icon = iconMap[event.icon] ?? iconMap.FileText;
          const reversed = i % 2 === 1;
          const gradient = GRADIENTS[i % GRADIENTS.length];

          return (
            <AnimatedSection key={event.id}>
              <div
                className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-8 sm:p-12 ${gradient}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-black/20 blur-3xl"
                />

                <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                  <div
                    className={`relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl shadow-black/40 ${
                      reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
                    <div className="relative flex h-full items-center justify-center">
                      <Icon
                        size={120}
                        strokeWidth={1.25}
                        className="text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                      />
                    </div>
                  </div>

                  <div
                    className={`text-center lg:text-left ${reversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <h2 className="font-black-ops text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
                      {event.title}
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
                      {event.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(i)}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
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
