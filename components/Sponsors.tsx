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
          {/* Outer outline card: transparent fill, just the border — the
              padding gaps it away from the white logo card inside, matching
              the reference (an outlined frame the image sits inset within,
              not a border flush against the image itself). */}
          <div className="mt-8 rounded-3xl border-2 border-[#2F8043] bg-transparent p-3">
            <Image
              src="/assets/sponsor.jpg"
              alt="Event sponsor"
              width={622}
              height={447}
              className="h-auto w-56 rounded-2xl object-contain shadow-lg shadow-black/40 sm:w-72"
            />
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
