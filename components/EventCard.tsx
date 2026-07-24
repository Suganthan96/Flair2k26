"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  // First bleed-art card sits on the right (as specified), alternating from
  // there — independent of `reversed`, which only governs the plain
  // icon-box cards.
  const imageOnRight = index % 2 === 0;

  const cardRef = useRef<HTMLDivElement>(null);

  // Tied directly to scroll position (like the Hero canvas), not a
  // trigger-once reveal: as the card travels from just below the viewport to
  // just above it, progress runs 0 -> 1, and the art slides in step with
  // that — scrolling back up slides it back out, continuously, with no
  // separate "enter"/"leave" animation states.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [imageOnRight ? 320 : -320, 0, 0]
  );
  const x = useSpring(rawX, { stiffness: 140, damping: 24, mass: 0.4 });

  return (
    <TwistCard index={index}>
      <div
        ref={cardRef}
        className={`relative rounded-[2rem] border border-white/10 bg-gradient-to-br p-8 sm:p-12 ${
          event.characterImage ? "overflow-visible" : "overflow-hidden"
        } ${gradient}`}
      >
        {/* Decorative glows only — clipped to the card, unlike the
            character portrait below which needs to bleed past it. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
          <div
            aria-hidden
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-black/20 blur-3xl"
          />
        </div>

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {event.characterImage ? (
            // Reserves the grid column so the text lines up as before — the
            // actual art renders as a separate, larger, edge-anchored
            // element below, escaping this card's own boundary.
            <div aria-hidden className={imageOnRight ? "lg:order-2" : "lg:order-1"} />
          ) : (
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
          )}

          <div
            className={`relative z-10 text-center lg:text-left ${
              (event.characterImage ? imageOnRight : reversed) ? "lg:order-1" : "lg:order-2"
            }`}
          >
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

        {event.characterImage && (
          <motion.div
            className={`pointer-events-none absolute top-1/2 z-0 h-[165%] w-72 -translate-y-1/2 sm:w-96 lg:w-[34rem] ${
              imageOnRight
                ? "-right-8 sm:-right-16 lg:-right-28"
                : "-left-8 sm:-left-16 lg:-left-28"
            }`}
            style={{ x }}
          >
            <Image
              src={event.characterImage}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 34rem"
              className="object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        )}
      </div>
    </TwistCard>
  );
}
