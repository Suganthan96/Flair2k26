import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { iconMap, GRADIENTS } from "@/components/eventVisuals";
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
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <main className="relative min-h-screen bg-background px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>

        <div
          className={`relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-8 sm:p-12 ${gradient}`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-black/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-black/40 shadow-2xl shadow-black/40">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
              <div className="relative flex h-full items-center justify-center">
                <Icon
                  size={120}
                  strokeWidth={1.25}
                  className="text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h1 className="font-black-ops text-4xl uppercase leading-[0.95] text-white sm:text-5xl">
                {event.title}
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
                {event.description}
              </p>
              <Link
                href="/#register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
