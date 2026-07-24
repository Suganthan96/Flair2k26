import NextImage from "next/image";
import { Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import DoomCosmos from "./DoomCosmos";
import { sponsors } from "@/data/mockData";

const tiers: { key: keyof typeof sponsors; label: string; boxClass: string; ringColor: string }[] = [
  {
    key: "title",
    label: "Title Sponsor",
    boxClass: "h-24 sm:h-28 text-lg",
    ringColor: "from-emerald-400/40 via-emerald-500/60 to-emerald-600/40",
  },
  {
    key: "gold",
    label: "Gold Sponsors",
    boxClass: "h-20 sm:h-24 text-base",
    ringColor: "from-emerald-500/30 via-emerald-400/50 to-emerald-500/30",
  },
  {
    key: "silver",
    label: "Silver Sponsors",
    boxClass: "h-16 sm:h-20 text-sm",
    ringColor: "from-emerald-400/20 via-emerald-500/30 to-emerald-400/20",
  },
  {
    key: "bronze",
    label: "Bronze Sponsors",
    boxClass: "h-14 sm:h-16 text-xs",
    ringColor: "from-emerald-400/15 via-emerald-500/20 to-emerald-400/15",
  },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative px-6 py-24"
      style={{ background: "#05060a" }}
    >
      <DoomCosmos />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/60" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <p className="mb-3 font-avenger text-xs uppercase tracking-[0.2em] text-emerald-400/80">
            Our Sponsors
          </p>
          <div className="mx-auto max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
            <NextImage
              src="/assets/sponsors1.png"
              alt="Event Sponsors"
              width={420}
              height={180}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-xs uppercase tracking-[0.25em] text-white/40 sm:text-sm">
            Powered by the allies who make this event possible
          </p>
        </AnimatedSection>

        <div className="mt-14 space-y-12">
          {tiers.map((tier) => (
            <AnimatedSection key={tier.key}>
              <h3 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/70">
                {tier.label}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-5">
                {sponsors[tier.key].map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    {/* Doom's power release on hover */}
                    <div className="pointer-events-none absolute -inset-20 opacity-0 transition-all duration-700 group-hover:opacity-100">
                      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_60%)]" />
                      <div className="absolute inset-0 animate-ping bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_50%)] delay-75" />
                    </div>

                    {/* Energy arcs */}
                    <div className="pointer-events-none absolute -inset-40 opacity-0 transition-all duration-700 group-hover:opacity-100">
                      <div className="absolute left-0 top-0 h-[2px] w-full origin-left translate-x-[-100%] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent transition-all duration-700 group-hover:translate-x-[100%]" />
                      <div className="absolute bottom-0 right-0 h-[2px] w-full origin-right translate-x-[100%] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent transition-all duration-700 group-hover:translate-x-[-100%]" />
                    </div>

                    {/* Border gradient ring on hover */}
                    <div className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br ${tier.ringColor} p-[1px] opacity-0 transition-all duration-500 group-hover:opacity-100`}>
                      <div className="h-full w-full rounded-[11px] bg-background" />
                    </div>

                    <div className={`relative flex min-w-[140px] flex-1 items-center justify-center rounded-xl border border-emerald-900/25 bg-black/40 px-6 font-semibold text-white/80 backdrop-blur-sm transition-all duration-500 sm:flex-none sm:px-10 ${tier.boxClass} group-hover:border-emerald-500/40 group-hover:bg-black/60 group-hover:text-white group-hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]`}>
                      {sponsor.name}

                      {/* Doom's seal */}
                      <div className="pointer-events-none absolute -bottom-1 -right-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <Zap
                          size={12}
                          className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
                        />
                      </div>
                    </div>
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