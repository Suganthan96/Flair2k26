"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";

// Base delay matches the 3-second loader screen reveal
const BASE_DELAY = 3.0;

// Movement speed for assembling letters
const MOVEMENT_DURATION = 1.4;

export default function FlairTitle() {
  return (
    <div className="relative select-none pointer-events-none">
      {/* Ambient emerald glow aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 2.0, delay: BASE_DELAY }}
        className="absolute -inset-5 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none"
      />

      <div className="relative flex flex-col items-end gap-2 sm:gap-3">
        {/* Top Section: FLAIR Wordmark + Accent Lines */}
        <div className="relative flex flex-col items-center">
          {/* FLAIR Letters Row */}
          <div className="flex items-end justify-center -space-x-1 sm:-space-x-2 md:-space-x-2.5 h-12 sm:h-18 md:h-24 lg:h-28">
            {/* F — Comes from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -95, y: 0, rotate: -6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[318/481] shrink-0"
            >
              <NextImage
                src="/assets/flair/F.png"
                alt="F"
                width={318}
                height={481}
                priority
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* L — Comes from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -70, y: 0, rotate: -4, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[88%] aspect-[287/419] shrink-0"
            >
              <NextImage
                src="/assets/flair/L.png"
                alt="L"
                width={287}
                height={419}
                priority
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* A — STAYS IN PLACE (x:0, y:0), fades and scales in center */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[448/514] shrink-0"
            >
              <NextImage
                src="/assets/flair/A.png"
                alt="A"
                width={448}
                height={514}
                priority
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* I — Comes from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 70, y: 0, rotate: 4, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[88%] aspect-[185/424] shrink-0"
            >
              <NextImage
                src="/assets/flair/I.png"
                alt="I"
                width={185}
                height={424}
                priority
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* R — Comes from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 95, y: 0, rotate: 6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[325/476] shrink-0"
            >
              <NextImage
                src="/assets/flair/R.png"
                alt="R"
                width={325}
                height={476}
                priority
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.3)] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </div>

          {/* Lines under F+L and I+R — appear AFTER letters join */}
          <div className="-mt-1 flex w-full justify-between sm:-mt-1.5 md:-mt-2 px-1">
            {/* line below F and L */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: BASE_DELAY + 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-1.5 w-[38%] origin-left sm:h-2.5 md:h-3.5"
            >
              <NextImage
                src="/assets/flair/line (below f and l).png"
                alt="line below F and L"
                width={781}
                height={104}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
              />
            </motion.div>

            {/* line below I and R */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: BASE_DELAY + 1.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-1.5 w-[42%] origin-right sm:h-2.5 md:h-3.5"
            >
              <NextImage
                src="/assets/flair/line(below i and r).png"
                alt="line below I and R"
                width={991}
                height={101}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: 2K26 Numbers + Underline Accent Line */}
        <div className="relative mt-1 flex flex-col items-center self-center sm:mt-2">
          {/* 2K26 Row */}
          <div className="flex items-center justify-center -space-x-1 sm:-space-x-1.5 h-6 sm:h-9 md:h-12">
            {/* 2 — Comes from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 55, rotate: 6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[244/218] shrink-0"
            >
              <NextImage
                src="/assets/flair/2.png"
                alt="2"
                width={244}
                height={218}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* K — Comes from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 65, rotate: -5, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[269/213] shrink-0"
            >
              <NextImage
                src="/assets/flair/K.png"
                alt="K"
                width={269}
                height={213}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* 2 — Comes from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 55, rotate: 4, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[244/218] shrink-0"
            >
              <NextImage
                src="/assets/flair/2.png"
                alt="2"
                width={244}
                height={218}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]"
              />
            </motion.div>

            {/* 6 — Comes from BOTTOM */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 65, rotate: -6, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={{ duration: MOVEMENT_DURATION, delay: BASE_DELAY + 0.64, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full aspect-[235/211] shrink-0"
            >
              <NextImage
                src="/assets/flair/6.png"
                alt="6"
                width={235}
                height={211}
                unoptimized
                className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </div>

          {/* line below 2k26 — appears AFTER letters join */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: BASE_DELAY + 1.55, ease: [0.16, 1, 0.3, 1] }}
            className="-mt-0.5 h-1.5 w-full origin-center sm:-mt-1 sm:h-2.5 md:h-3.5"
          >
            <NextImage
              src="/assets/flair/line (below 2k26).png"
              alt="line below 2k26"
              width={1433}
              height={123}
              unoptimized
              className="h-full w-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.4)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
