import NextImage from "next/image";
import { UserRound, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import DoomCosmos from "./DoomCosmos";
import { facultyCoordinators, studentCoreTeam } from "@/data/mockData";

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-emerald-900/25 bg-black/40 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/60 hover:bg-black/70 hover:shadow-[0_0_60px_rgba(16,185,129,0.15),0_0_120px_rgba(16,185,129,0.05)]">
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

      {/* Avatar with energy ring */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full opacity-0 ring-2 ring-emerald-400 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:scale-150" />
        <div className="absolute inset-0 rounded-full opacity-0 ring-1 ring-emerald-300 blur-md transition-all delay-100 duration-500 group-hover:opacity-80 group-hover:scale-[2.5]" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-950/60 to-green-950/30 ring-1 ring-emerald-900/30 transition-all duration-500 group-hover:ring-emerald-500/60 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]">
          <UserRound
            size={28}
            className="text-emerald-400/40 transition-all duration-500 group-hover:text-emerald-300/90 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          />
        </div>
      </div>

      <h3 className="relative z-10 text-sm font-semibold text-white/90 transition-colors duration-500 group-hover:text-white">
        {name}
      </h3>
      <p className="relative z-10 mt-1 text-xs text-emerald-300/40 transition-colors duration-500 group-hover:text-emerald-300/70">
        {role}
      </p>

      {/* Doom's seal */}
      <div className="pointer-events-none absolute bottom-2 right-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <Zap
          size={14}
          className="text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]"
        />
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="relative px-6 py-24"
      style={{ background: "#05060a" }}
    >
      <DoomCosmos />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05060a]/60" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <p className="mb-3 font-avenger text-xs uppercase tracking-[0.2em] text-emerald-400/80">
            Our Team
          </p>
          <div className="mx-auto max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
            <NextImage
              src="/assets/event_team.png"
              alt="Event Team"
              width={420}
              height={180}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mx-auto mt-4 h-[3px] w-40 rounded-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          <p className="mx-auto mt-4 max-w-2xl text-xs uppercase tracking-[0.25em] text-white/40 sm:text-sm">
            The people behind the operation
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/70">
            Faculty Coordinators
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:flex sm:justify-center sm:gap-8">
            {facultyCoordinators.map((member) => (
              <TeamCard key={member.name} name={member.name} role={member.role} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.1}>
          <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500/70">
            Student Core Team
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {studentCoreTeam.map((member) => (
              <TeamCard key={member.name} name={member.name} role={member.role} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}