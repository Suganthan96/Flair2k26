import NextImage from "next/image";
import AnimatedSection from "./AnimatedSection";
import DoomCosmos from "./DoomCosmos";
import { siteConfig } from "@/data/mockData";

export default function RegisterCTA() {
  return (
    <section
      id="register"
      className="relative px-6 py-24"
      style={{ background: "#05060a" }}
    >
      <DoomCosmos />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/60" />

      <AnimatedSection className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-3 font-avenger text-xs uppercase tracking-[0.2em] text-emerald-400/80">
          Register Now
        </p>
        <div className="mx-auto max-w-[420px]">
          <NextImage
            src="/assets/join_flair_2k25.png"
            alt="Join Flair 2k26"
            width={840}
            height={160}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        <p className="mx-auto mt-4 max-w-xl text-xs uppercase tracking-[0.25em] text-white/40">
          Spots are limited. Register now and be part of the experience.
        </p>

        <div className="group relative mx-auto mt-8 inline-block">
          {/* Button glow ring on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-2 ring-emerald-400 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:scale-110" />
          <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-1 ring-emerald-300 blur-md transition-all delay-100 duration-500 group-hover:opacity-80 group-hover:scale-[1.5]" />

          {/* Doom's power release on hover */}
          <div className="pointer-events-none absolute -inset-10 rounded-full opacity-0 transition-all duration-700 group-hover:opacity-100">
            <div className="absolute inset-0 animate-pulse rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_60%)]" />
          </div>

          <a
            href="#"
            className="relative inline-block rounded-full border border-emerald-900/30 bg-black/50 px-12 py-5 text-base font-semibold text-white/90 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/60 hover:bg-black/70 hover:text-white hover:shadow-[0_0_60px_rgba(16,185,129,0.2)]"
          >
            Register Now
          </a>
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/30">
          {siteConfig.dates} · {siteConfig.venue}
        </p>
      </AnimatedSection>
    </section>
  );
}