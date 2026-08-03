import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Countdown from "./Countdown";

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative bg-background px-6 pb-10 pt-10">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="flex flex-col items-center text-center">
          <Image
            src="/assets/sponsors-removebg-preview.png"
            alt="Our Sponsors"
            width={640}
            height={390}
            className="h-auto w-64 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:w-80"
          />
          {/* Outer outline cards: transparent fill, just the border — the
              padding gaps them away from the white logo card inside, matching
              the reference (an outlined frame the image sits inset within,
              not a border flush against the image itself). Wrapped so a
              second sponsor sits alongside the first instead of stacking
              full-width on wider screens. */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <div className="rounded-3xl border-2 border-[#2F8043] bg-transparent p-3">
              <Image
                src="/assets/sponsor.jpg"
                alt="Event sponsor"
                width={622}
                height={447}
                className="h-auto w-56 rounded-2xl object-contain shadow-lg shadow-black/40 sm:w-72"
              />
            </div>
            <div className="rounded-3xl border-2 border-[#2F8043] bg-transparent p-3">
              <Image
                src="/assets/sponser2.avif"
                alt="Event sponsor"
                width={530}
                height={600}
                className="h-auto w-36 rounded-2xl object-contain shadow-lg shadow-black/40 sm:w-44"
              />
            </div>
            <div className="rounded-3xl border-2 border-[#2F8043] bg-transparent p-3">
              <Image
                src="/assets/sponser3.jpeg"
                alt="Event sponsor"
                width={872}
                height={832}
                // Narrower than the other cards' w-56/w-72 on purpose: this
                // source image is near-square (872x832) instead of wide like
                // the others (622x447), so the same width renders visibly
                // taller — this width is scaled down to land at roughly the
                // same rendered height as the other two cards.
                className="h-auto w-44 rounded-2xl object-contain shadow-lg shadow-black/40 sm:w-56"
              />
            </div>
          </div>
          <div className="mt-8">
            <Countdown />
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Powered by the allies who make Flair 2k26 possible.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
