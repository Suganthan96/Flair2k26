import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function GuestsPromo() {
  return (
    <section className="relative px-6 py-16 sm:py-20">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-avenger-purple via-[#7a1f4f] to-avenger-red p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-avenger-gold/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-avenger-blue/30 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl shadow-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-avenger-red/30 via-transparent to-avenger-blue/30" />
              <div className="relative flex h-full items-center justify-center p-10">
                <Image
                  src="/assets/FLAIR.png"
                  alt="Flair 2k26"
                  width={2896}
                  height={2172}
                  className="w-full object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="font-avenger text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
                Guests &amp;
                <br />
                Speakers
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
                Industry leaders and innovators assembling to share their expertise.
              </p>
              <a
                href="#speakers"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                Meet the Guests
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
