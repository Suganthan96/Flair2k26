import AnimatedSection from "./AnimatedSection";
import { siteConfig } from "@/data/mockData";

export default function RegisterCTA() {
  return (
    <section id="register" className="relative overflow-hidden bg-avengers-radial px-6 py-24">
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
          Ready to join <span className="text-gradient-avengers">Flair 2k26?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Spots are limited. Assemble your team and register before the deadline.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-avenger-red to-avenger-purple px-10 py-4 text-base font-semibold text-white shadow-lg shadow-avenger-red/30 transition-transform hover:scale-105"
        >
          Register Now
        </a>
        <p className="mt-4 text-xs text-white/50">
          Event dates: {siteConfig.dates} · {siteConfig.venue}
        </p>
      </AnimatedSection>
    </section>
  );
}
