import AnimatedSection from "./AnimatedSection";
import { aboutCopy, stats } from "@/data/mockData";

export default function About() {
  return (
    <section id="about" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <AnimatedSection>
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            About <span className="text-gradient-avengers">the Mission</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            {aboutCopy}
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-8 transition-colors hover:border-avenger-red/50">
                <div className="font-avenger text-3xl text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-white/60 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
