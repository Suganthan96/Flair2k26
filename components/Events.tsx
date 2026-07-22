"use client";

import { useState } from "react";
import {
  FileText,
  Code2,
  Bot,
  LayoutTemplate,
  Gamepad2,
  BrainCircuit,
  Briefcase,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { events, type EventCategory } from "@/data/mockData";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Code2,
  Bot,
  LayoutTemplate,
  Gamepad2,
  BrainCircuit,
  Briefcase,
  MapPin,
};

const filters: ("All" | EventCategory)[] = ["All", "Technical", "Non-Technical"];

export default function Events() {
  const [filter, setFilter] = useState<"All" | EventCategory>("All");

  const visibleEvents =
    filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <section id="events" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            Events &amp; <span className="text-gradient-avengers">Tracks</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Pick your battlefield — technical showdowns or non-technical challenges.
          </p>
        </AnimatedSection>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-gradient-to-r from-avenger-red to-avenger-purple text-white"
                  : "border border-white/15 text-white/70 hover:border-avenger-gold hover:text-avenger-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleEvents.map((event, i) => {
            const Icon = iconMap[event.icon] ?? FileText;
            return (
              <AnimatedSection key={event.id} delay={(i % 4) * 0.08}>
                <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-avenger-red/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-avenger-red/20 to-avenger-purple/20 text-avenger-gold">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-avenger text-lg text-white uppercase">
                    {event.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-white/65">
                    {event.description}
                  </p>
                  <a
                    href={`#${event.id}`}
                    className="mt-4 text-sm font-medium text-avenger-red transition-colors group-hover:text-avenger-gold"
                  >
                    View Details →
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
