"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, CalendarDays } from "lucide-react";
import { siteConfig } from "@/data/mockData";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm min-w-[72px] sm:min-w-[88px]">
      <span className="font-avenger text-2xl sm:text-3xl text-white tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Set the initial value immediately so the countdown doesn't flash "00"
    // for a full second while waiting for the first interval tick.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft(siteConfig.eventStart));
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(siteConfig.eventStart));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 pt-24 pb-16 text-center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-hero-video-overlay"
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-4 rounded-full border border-avenger-red/40 bg-avenger-red/10 px-4 py-1 text-xs sm:text-sm uppercase tracking-[0.3em] text-avenger-red"
      >
        LICET Technical Symposium
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-avenger relative z-10 text-6xl leading-[0.95] text-white uppercase sm:text-8xl md:text-9xl"
      >
        <span className="text-gradient-avengers">Flair</span>
        <br />
        2k26
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 mt-6 max-w-xl text-lg text-white/80 sm:text-xl"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
      >
        <span className="flex items-center gap-2">
          <CalendarDays size={16} className="text-avenger-gold" />
          {siteConfig.dates}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={16} className="text-avenger-gold" />
          {siteConfig.venue}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative z-10 mt-10 flex gap-3 sm:gap-4"
      >
        <CountdownUnit value={timeLeft?.days ?? 0} label="Days" />
        <CountdownUnit value={timeLeft?.hours ?? 0} label="Hours" />
        <CountdownUnit value={timeLeft?.minutes ?? 0} label="Mins" />
        <CountdownUnit value={timeLeft?.seconds ?? 0} label="Secs" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href={siteConfig.registerUrl}
          className="rounded-full bg-gradient-to-r from-avenger-red to-avenger-purple px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-avenger-red/30 transition-transform hover:scale-105"
        >
          Register Now
        </a>
        <a
          href="#events"
          className="rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-avenger-gold hover:text-avenger-gold"
        >
          Explore Events
        </a>
      </motion.div>
    </section>
  );
}
