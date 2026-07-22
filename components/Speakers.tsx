import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { guests } from "@/data/mockData";

export default function Speakers() {
  return (
    <section id="speakers" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            Guests &amp; <span className="text-gradient-avengers">Speakers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Industry leaders assembling to share their expertise.
          </p>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {guests.map((guest, i) => (
            <AnimatedSection key={guest.name} delay={i * 0.1}>
              <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:border-avenger-red/50">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-avenger-red/20 to-avenger-purple/20 text-white/40">
                  <User size={32} />
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {guest.name}
                </h3>
                <p className="mt-1 text-xs text-white/60">{guest.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
