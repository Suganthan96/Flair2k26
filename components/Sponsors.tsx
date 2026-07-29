import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Countdown from "./Countdown";

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative px-6 pb-24 pt-10">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="flex flex-col items-center text-center">
          {/* Section Heading */}
          <Image
            src="/assets/sponsors-removebg-preview.png"
            alt="Our Sponsors"
            width={640}
            height={390}
            className="h-auto w-64 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:w-80"
          />

          {/* Sponsor Banner Image (Reduced size, set above Countdown) */}
          <div className="mt-6 overflow-hidden rounded-xl border border-emerald-500/30 bg-black/40 p-2.5 shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]">
            <Image
              src="/assets/sponsor.jpeg"
              alt="Flair 2k26 Sponsor"
              width={400}
              height={250}
              priority
              className="h-auto w-full max-w-[260px] rounded-lg object-contain sm:max-w-[340px]"
            />
          </div>

          {/* Time Running Element (Countdown) */}
          <div className="mt-8">
            <Countdown />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-widest text-emerald-300/80 drop-shadow">
            Powered by the allies who make Flair 2k26 possible.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
