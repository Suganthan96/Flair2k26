import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Countdown from "./Countdown";

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative px-6 pb-24 pt-10">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="flex flex-col items-center text-center">
          <Image
            src="/assets/sponsors-removebg-preview.png"
            alt="Our Sponsors"
            width={640}
            height={390}
            className="h-auto w-64 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] sm:w-80"
          />
          <div className="mt-8">
            <Countdown />
          </div>

          {/* Sponsor Banner Image */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-emerald-500/30 bg-black/40 p-4 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-md transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_0_60px_rgba(16,185,129,0.3)]">
            <Image
              src="/assets/sponsor.jpeg"
              alt="Flair 2k26 Sponsor"
              width={800}
              height={500}
              priority
              className="h-auto w-full max-w-2xl rounded-xl object-contain"
            />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-widest text-emerald-300/80 drop-shadow">
            Powered by the allies who make Flair 2k26 possible.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
