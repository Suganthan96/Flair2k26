import Link from "next/link";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { iconMap } from "@/components/eventVisuals";
import { events } from "@/data/mockData";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.id }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = events.findIndex((event) => event.id === slug);
  if (index === -1) notFound();

  const event = events[index];
  const Icon = iconMap[event.icon] ?? iconMap.FileText;

  return (
    <main className="relative min-h-screen bg-[#05060a] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400/80 transition-colors hover:text-emerald-300 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div className="group relative min-h-[420px] overflow-hidden rounded-[2rem] border border-emerald-500/40 bg-black/80 p-8 sm:p-14 shadow-2xl">
          {/* Full Backside Background Image */}
          <NextImage
            src={`/assets/events/${event.id}.jpg`}
            alt={event.title}
            fill
            priority
            className="object-cover object-center opacity-45 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60"
          />

          {/* Dark Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/70 px-4 py-1.5 backdrop-blur-md">
              <Icon size={20} className="text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                Event Track
              </span>
            </div>

            <h1 className="font-black-ops text-4xl uppercase leading-[0.95] text-white sm:text-6xl drop-shadow-xl">
              {event.title}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-xl">
              {event.description}
            </p>

            <div className="mt-10">
              <Link
                href="/#register"
                className="inline-flex items-center gap-3 rounded-full border border-emerald-400/60 bg-emerald-400 px-8 py-4 text-base font-semibold text-black transition-all hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(61,255,140,0.7)]"
              >
                <span>Register Now</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
