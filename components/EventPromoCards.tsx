import NextImage from "next/image";
import { FileText, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { iconMap } from "./eventVisuals";
import { events } from "@/data/mockData";

export default function EventPromoCards() {
  return (
    <section
      id="events"
      className="relative px-6 pb-6 pt-16 sm:pb-8 sm:pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/60" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10">
        <AnimatedSection className="mb-4 text-center">
          <p className="mb-3 font-avenger text-xs uppercase tracking-[0.2em] text-emerald-400/80">
            Events & Tracks
          </p>
          <div className="mx-auto max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
            <NextImage
              src="/assets/events1.png"
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
          const isEven = i % 2 === 0; // Alternating cards: 0 (Right Button), 1 (Left Button), 2 (Right Button)...

          return (
            <AnimatedSection key={event.id}>
              <div className="group relative min-h-[340px] overflow-hidden rounded-[2rem] border border-emerald-500/30 bg-black/8 p-8 sm:p-12 shadow-2xl transition-all duration-500 hover:border-emerald-400/70 hover:shadow-[0_0_60px_rgba(16,185,129,0.25)]">
                {/* Full Backside Background Image */}
                <NextImage
                  src={event.image || `/assets/events/${event.id}.jpg`}
                  alt={event.title}
                  fill
                  priority={i < 2}
                  className="object-cover object-center opacity-85 brightness-105 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                {/* Lightened Gradient Overlay for Unfaded Vivid Images */}
                <div
                  className={`pointer-events-none absolute inset-0 ${
                    isEven
                      ? "bg-gradient-to-r from-black/85 via-black/50 to-black/20"
                      : "bg-gradient-to-l from-black/85 via-black/50 to-black/20"
                  }`}
                />

                {/* Card Content Grid (Alternating button position: right for even, left for odd) */}
                <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  {/* Content Block */}
                  <div
                    className={`lg:col-span-8 text-center ${
                      isEven ? "lg:order-1 lg:text-left" : "lg:order-2 lg:text-right"
                    }`}
                  >
                    <div
                      className={`mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 backdrop-blur-md`}
                    >
                      <Icon size={18} className="text-emerald-400" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                        Track #{i + 1}
                      </span>
                    </div>

                    <h2 className="font-black-ops text-3xl uppercase leading-[1.0] text-white sm:text-4xl md:text-5xl drop-shadow-lg">
                      {event.title}
                    </h2>

                    <p
                      className={`mt-4 text-sm leading-relaxed text-white/90 sm:text-base md:text-lg ${
                        isEven ? "lg:mr-auto" : "lg:ml-auto"
                      } max-w-xl`}
                    >
                      {event.description}
                    </p>
                  </div>

                  {/* Button Block */}
                  <div
                    className={`lg:col-span-4 flex justify-center ${
                      isEven ? "lg:order-2 lg:justify-end" : "lg:order-1 lg:justify-start"
                    }`}
                  >
                    <a
                      href={`/events/${event.id}`}
                      className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-emerald-400/60 bg-black/60 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_30px_rgba(61,255,140,0.6)]"
                    >
                      <span>View Details</span>
                      <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
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
