"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";

// Base delay matches the exact moment the 2-second loader screen begins fading out (2.0s)
const BASE_DELAY = 2.0;

export default function FlairTitle() {
  return (
    <div className="relative select-none pointer-events-auto cursor-pointer">
      {/* Subtle ambient emerald glow aura */}
      <motion.div
        initial={{ opacity: 0.25, scale: 0.88 }}
        animate={{ opacity: 0.35, scale: 1.0 }}
        transition={{
          duration: 5.0,
          delay: BASE_DELAY,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -inset-3 rounded-full bg-emerald-500/10 blur-lg pointer-events-none"
      />

      {/* FLAIR 2K26 Logo Image: Starts zoom-in IMMEDIATELY as loader screen starts exit reveal (2.0s) */}
      <motion.div
        initial={{ scale: 0.88 }}
        animate={{ scale: 1.0 }}
        transition={{
          duration: 15.0,
          delay: BASE_DELAY,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-32 sm:w-40 md:w-52 lg:w-[14rem] xl:w-[16rem]"
      >
        <NextImage
          src="/assets/FLAIR.png"
          alt="Flair 2K26"
          width={2896}
          height={2172}
          priority
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 18vw"
          className="h-auto w-full object-contain drop-shadow-[0_0_8px_rgba(16,185,129,0.18)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
        />
      </motion.div>
    </div>
  );
}
