import AnimatedSection from "./AnimatedSection";
import { sponsors } from "@/data/mockData";

const tiers: { key: keyof typeof sponsors; label: string; boxClass: string }[] = [
  {
    key: "title",
    label: "Title Sponsor",
    boxClass: "h-24 sm:h-28 text-lg border-avenger-gold/60",
  },
  {
    key: "gold",
    label: "Gold Sponsors",
    boxClass: "h-20 sm:h-24 text-base border-avenger-red/50",
  },
  {
    key: "silver",
    label: "Silver Sponsors",
    boxClass: "h-16 sm:h-20 text-sm border-white/20",
  },
  {
    key: "bronze",
    label: "Bronze Sponsors",
    boxClass: "h-14 sm:h-16 text-xs border-white/10",
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            Our <span className="text-gradient-avengers">Sponsors</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Powered by the allies who make Flair 2k26 possible.
          </p>
        </AnimatedSection>

        <div className="mt-14 space-y-12">
          {tiers.map((tier) => (
            <AnimatedSection key={tier.key}>
              <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-avenger-gold">
                {tier.label}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {sponsors[tier.key].map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className={`flex min-w-[140px] flex-1 items-center justify-center rounded-xl border bg-white/5 px-6 font-semibold text-white/80 sm:flex-none sm:px-10 ${tier.boxClass}`}
                  >
                    {sponsor.name}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
