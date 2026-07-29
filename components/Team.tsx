import { UserRound } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { facultyCoordinators, studentCoreTeam } from "@/data/mockData";

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:border-avenger-red/50">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-avenger-red/20 to-avenger-purple/20 text-white/40">
        <UserRound size={28} />
      </div>
      <h3 className="text-sm font-semibold text-white">{name}</h3>
      <p className="mt-1 text-xs text-white/60">{role}</p>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="text-center">
          <h2 className="font-avenger text-3xl uppercase text-white sm:text-5xl">
            The <span className="text-gradient-avengers">Team</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            The Avengers behind the operation.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-avenger-gold">
            Faculty Coordinators
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:flex sm:justify-center sm:gap-8">
            {facultyCoordinators.map((member) => (
              <TeamCard key={member.name} name={member.name} role={member.role} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-14" delay={0.1}>
          <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-avenger-gold">
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
