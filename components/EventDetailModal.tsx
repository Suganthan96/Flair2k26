"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import RegisterButton from "./RegisterButton";
import TypewriterText from "./TypewriterText";
import { iconMap, GRADIENTS } from "./eventVisuals";
import { commonGuidelines, type EventQueryContact } from "@/data/mockData";

// Shared glass-panel look for every info box in the modal — semi-transparent
// with a blur, so the modal's own background image shows through instead of
// sitting behind a solid card.
const GLASS_PANEL = "rounded-2xl border border-white/10 p-6";

type EventDetail = {
  id: string;
  title: string;
  icon: string;
  description: string;
  longDescription: string;
  teamSize: string;
  time: string;
  venue: string;
  organizers: string;
  queries: EventQueryContact[];
  lumaEventId: string;
  posterImage?: string;
};

export default function EventDetailModal({
  event,
  index,
  onClose,
}: {
  event: EventDetail;
  index: number;
  onClose: () => void;
}) {
  // Escape to close, and lock page scroll behind the modal while it's open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const Icon = iconMap[event.icon] ?? iconMap.FileText;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* flex-col + a scrollable body below means the header (close/title/
          register) never scrolls out of view, no matter how long the body is. */}
      <motion.div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
          {/* object-contain (not cover): this is a centered crest on a
              black background, not a wide scene — cover would crop into
              the logo itself on a tall/portrait source like this. Contain
              shows the whole mark, and its own black backdrop blends
              seamlessly with this wrapper's bg-black, so no visible bars. */}
          <Image
            src="/assets/newbg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-125 object-contain "
          />
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="shrink-0 border-b border-white/10 p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white sm:right-6 sm:top-6"
          >
            <X size={18} />
          </button>

          <div className="pr-12">
            <h2
              id="event-modal-title"
              aria-label={event.title}
              className="font-black-ops text-3xl uppercase leading-[0.95] text-white sm:text-4xl"
            >
              <span aria-hidden="true">
                <TypewriterText key={event.id} text={event.title} />
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
              {event.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-500">
                Team Size: {event.teamSize}
              </span>
              <RegisterButton
                href={`https://luma.com/event/${event.lumaEventId}`}
                className="luma-checkout--button"
                data-luma-action="checkout"
                data-luma-event-id={event.lumaEventId}
              >
                Register
              </RegisterButton>
            </div>
          </div>
        </div>

        {/* data-lenis-prevent: tells the app-wide Lenis smooth-scroll to
            ignore wheel/touch input here entirely, so this scrolls natively
            instead of Lenis eating the input meant for this inner region. */}
        <div data-lenis-prevent className="no-scrollbar overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className={GLASS_PANEL}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
                Common Guidelines
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/75">
                {commonGuidelines.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-green-500">—</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {event.posterImage ? (
              <div className="relative min-h-48 overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src={event.posterImage}
                  alt={`${event.title} poster`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-8 ${gradient}`}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-8 -right-8 h-56 w-56 rounded-full bg-black/20 blur-3xl"
                />
                <div className="relative flex h-full min-h-48 items-center justify-center">
                  <Icon
                    size={90}
                    strokeWidth={1.25}
                    className="text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`mt-6 ${GLASS_PANEL}`}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
              Event Description
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{event.longDescription}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className={GLASS_PANEL}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
                Time
              </h3>
              <p className="mt-3 text-sm text-white/80">{event.time}</p>
            </div>
            <div className={GLASS_PANEL}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
                Venue
              </h3>
              <p className="mt-3 text-sm text-white/80">{event.venue}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className={GLASS_PANEL}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
                Organizers
              </h3>
              <p className="mt-3 text-sm text-white/80">{event.organizers}</p>
            </div>
            <div className={GLASS_PANEL}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-green-500">
                For Queries
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {event.queries.map((contact) => (
                  <li key={contact.name}>
                    {contact.name}: {contact.phone}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
