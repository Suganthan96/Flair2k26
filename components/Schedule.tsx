"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { schedule } from "@/data/mockData";

const days = Object.keys(schedule);

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <section id="schedule" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="text-center">
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            Event <span className="text-gradient-avengers">Timeline</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Three days. Non-stop action. Plan your mission.
          </p>
        </AnimatedSection>

        <div className="mt-10 flex justify-center gap-3">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                activeDay === day
                  ? "bg-gradient-to-r from-avenger-red to-avenger-purple text-white"
                  : "border border-white/15 text-white/70 hover:border-avenger-gold hover:text-avenger-gold"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="relative mt-12 ml-3 border-l border-white/15 pl-8">
          {schedule[activeDay].map((item, i) => (
            <AnimatedSection key={`${activeDay}-${item.time}`} delay={i * 0.08}>
              <div className="relative mb-8 last:mb-0">
                <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-avenger-red shadow-[0_0_0_4px_rgba(237,28,36,0.2)]" />
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-avenger-gold">
                    <Clock size={14} />
                    {item.time}
                  </div>
                  <h3 className="mt-2 font-avenger text-lg uppercase text-white">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
                    <MapPin size={14} />
                    {item.venue}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
