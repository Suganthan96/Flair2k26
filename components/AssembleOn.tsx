"use client";

import NextImage from "next/image";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/core/text-scramble";

const assembleLetters = [
  { char: "A", src: "/assets/A.png" },
  { char: "S", src: "/assets/S.png" },
  { char: "S", src: "/assets/S.png" },
  { char: "E", src: "/assets/E.png" },
  { char: "M", src: "/assets/M.png" },
  { char: "B", src: "/assets/B.png" },
  { char: "L", src: "/assets/L.png" },
  { char: "E", src: "/assets/E.png" },
];

const onLetters = [
  { char: "O", src: "/assets/O.png" },
  { char: "N", src: "/assets/N.png" },
];

function getLetterContainerClass(char: string) {
  switch (char) {
    case "M":
      return "h-9.5 w-8.5 sm:h-13 sm:w-12 md:h-16 md:w-14"; // Reduced size for M
    case "N":
      return "h-10 w-8 sm:h-14 sm:w-11 md:h-16 md:w-13";
    case "L":
      return "h-10 w-7 sm:h-14 sm:w-9 md:h-16 md:w-10";
    default:
      return "h-10 w-8 sm:h-14 sm:w-11 md:h-16 md:w-13";
  }
}

export default function AssembleOn() {
  return (
    <a href="#register" className="group flex flex-col items-start gap-2.5 select-none">
      <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
        {/* ASSEMBLE */}
        <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
          {assembleLetters.map((item, idx) => (
            <div
              key={`assemble-${idx}`}
              className={`relative ${getLetterContainerClass(item.char)}`}
            >
              <NextImage
                src={item.src}
                alt={item.char}
                width={140}
                height={160}
                unoptimized
                priority
                className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
              />
            </div>
          ))}
        </div>

        {/* ON */}
        <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
          {onLetters.map((item, idx) => (
            <div
              key={`on-${idx}`}
              className={`relative ${getLetterContainerClass(item.char)}`}
            >
              <NextImage
                src={item.src}
                alt={item.char}
                width={140}
                height={160}
                unoptimized
                priority
                className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[2px] w-36 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500/60 to-transparent transition-all duration-300 group-hover:w-60" />

      {/* Entrance Animation ("in-animation") for 8th August */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextScramble
          className="font-avenger text-xs uppercase tracking-[0.28em] text-emerald-400 sm:text-sm drop-shadow-[0_0_10px_rgba(61,255,140,0.8)] cursor-pointer"
          duration={1.0}
          speed={0.03}
          delay={3.0}
        >
          8th August
        </TextScramble>
      </motion.div>
    </a>
  );
}
