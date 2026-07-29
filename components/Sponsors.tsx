import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Countdown from "./Countdown";

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative bg-background px-6 pb-24 pt-10">
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
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Powered by the allies who make Flair 2k26 possible.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
