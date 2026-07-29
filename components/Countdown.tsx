"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-08-08T00:00:00");

function getCountdownParts(target: Date, now: Date) {
  const msLeft = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  // Starts null so the server-rendered markup and the first client render
  // match (server time and client time would otherwise differ) — the real
  // value fills in once mounted, then ticks every second.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = getCountdownParts(TARGET_DATE, now ?? TARGET_DATE);
  const units = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Minutes", value: parts.minutes },
    { label: "Seconds", value: parts.seconds },
  ];

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-4"
      style={{ visibility: now ? "visible" : "hidden" }}
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <span className="font-avenger text-3xl tabular-nums text-white sm:text-5xl">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="font-avenger text-3xl text-white/40 sm:text-5xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
