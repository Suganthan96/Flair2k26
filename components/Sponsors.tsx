import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import Countdown from "./Countdown";

const SPONSOR_LOGOS = [
  "/assets/sponsor.jpg",
  "/assets/sponser2.avif",
  "/assets/sponser3.jpeg",
];

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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {SPONSOR_LOGOS.map((src) => (
              <div
                key={src}
                className="flex h-44 w-44 items-center justify-center rounded-2xl border-2 border-green-400/70 bg-white/5 p-3 shadow-[0_0_20px_rgba(74,222,128,0.25)] backdrop-blur-sm sm:h-56 sm:w-56"
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white p-3">
                  <Image
                    src={src}
                    alt="Sponsor logo"
                    width={256}
                    height={256}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            ))}
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
