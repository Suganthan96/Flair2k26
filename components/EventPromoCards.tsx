import NextImage from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import DoomCosmos from "./DoomCosmos";
import { iconMap, GRADIENTS } from "./eventVisuals";
import { events } from "@/data/mockData";

export default function EventPromoCards() {
  return (
    <section
      id="events"
      className="relative px-6 pb-6 pt-16 sm:pb-8 sm:pt-20"
      style={{ background: "#05060a" }}
    >
      <DoomCosmos />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/60" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <AnimatedSection className="text-center mb-4">
          <p className="mb-3 font-avenger text-xs uppercase tracking-[0.2em] text-emerald-400/80">
            Events & Tracks
          </p>
          <div className="mx-auto max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
            <NextImage
              src="/assets/events.png"
              alt="Events & Tracks"
              width={443}
              height={248}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </AnimatedSection>
        {events.map((event, i) => {
          const Icon = iconMap[event.icon] ?? FileText;
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
                    <a
                      href={`/events/${event.id}`}
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
