"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TwistCard from "./TwistCard";
import { iconMap, GRADIENTS } from "./eventVisuals";
import type { events } from "@/data/mockData";

type EventItem = (typeof events)[number];

export default function EventCard({
  event,
  index,
  onOpenDetails,
}: {
  event: EventItem;
  index: number;
  onOpenDetails: () => void;
}) {
  const Icon = iconMap[event.icon] ?? iconMap.FileText;
  const reversed = index % 2 === 1;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Reference site (ousmaneballondor.fr) leans heavily on oversized
  // stroke-only numerals as a recurring background motif, drifting gently
  // as you scroll rather than sitting static — borrowing that here as a
  // per-card index marker rather than copying its layout wholesale.
  const numberY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  if (event.backgroundImage) {
    return (
      <TwistCard index={index}>
        <div
          ref={cardRef}
          className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 sm:min-h-[24rem]"
        >
          <div className="absolute inset-0">
            <Image
              src={event.backgroundImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              style={{ objectPosition: event.backgroundPosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-10">
            <h2 className="font-black-ops text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
              {event.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              {event.description}
            </p>
            <button
              type="button"
              onClick={onOpenDetails}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              View Details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </TwistCard>
    );
  }

  return (
    <TwistCard index={index}>
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-7 sm:p-10 ${gradient}`}
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
            className={`relative z-10 text-center lg:text-left ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.span
              aria-hidden
              style={{ y: numberY }}
              className="pointer-events-none absolute -top-8 left-1/2 -z-10 -translate-x-1/2 select-none text-[6rem] font-black-ops leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.15)] sm:-top-12 sm:left-0 sm:translate-x-0 sm:text-[8rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            <h2 className="font-black-ops text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
              {event.title}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              {event.description}
            </p>
            <button
              type="button"
              onClick={onOpenDetails}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              View Details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </TwistCard>
  );
}
