"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/core/text-scramble";

const word1Slots = [
  { frontChar: "A", frontSrc: "/assets/A.png", backChar: "J", backSrc: "/assets/J.png" },
  { frontChar: "S", frontSrc: "/assets/S.png", backChar: "O", backSrc: "/assets/O.png" },
  { frontChar: "S", frontSrc: "/assets/S.png", backChar: "I", backSrc: "/assets/I.png" },
  { frontChar: "E", frontSrc: "/assets/E.png", backChar: "N", backSrc: "/assets/N.png" },
  { frontChar: "M", frontSrc: "/assets/M.png" },
  { frontChar: "B", frontSrc: "/assets/B.png" },
  { frontChar: "L", frontSrc: "/assets/L.png" },
  { frontChar: "E", frontSrc: "/assets/E.png" },
];

const word2Slots = [
  { frontChar: "O", frontSrc: "/assets/O.png", backChar: "U", backSrc: "/assets/U.png" },
  { frontChar: "N", frontSrc: "/assets/N.png", backChar: "S", backSrc: "/assets/S.png" },
];

function getLetterContainerClass(char: string) {
  switch (char) {
    case "M":
      return "h-9.5 w-8.5 sm:h-13 sm:w-12 md:h-16 md:w-14";
    case "N":
      return "h-10 w-8 sm:h-14 sm:w-11 md:h-16 md:w-13";
    case "L":
      return "h-10 w-7 sm:h-14 sm:w-9 md:h-16 md:w-10";
    case "I":
      return "h-10 w-4 sm:h-14 sm:w-6 md:h-16 md:w-7";
    case "J":
      return "h-10 w-7 sm:h-14 sm:w-10 md:h-16 md:w-11";
    case "U":
      return "h-10 w-8 sm:h-14 sm:w-11 md:h-16 md:w-13";
    default:
      return "h-10 w-8 sm:h-14 sm:w-11 md:h-16 md:w-13";
  }
}

function FlipLetterCard({
  frontChar,
  frontSrc,
  backChar,
  backSrc,
  isHovered,
  delay,
}: {
  frontChar: string;
  frontSrc: string;
  backChar?: string;
  backSrc?: string;
  isHovered: boolean;
  delay: number;
}) {
  const frontClass = getLetterContainerClass(frontChar);
  const backClass = backChar ? getLetterContainerClass(backChar) : "";

  if (!backChar) {
    return (
      <motion.div
        initial={false}
        animate={{
          rotateY: isHovered ? 180 : 0,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
          maxWidth: isHovered ? 0 : 64,
        }}
        transition={{ duration: 0.3, delay: isHovered ? delay : 0, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative ${frontClass} [perspective:1000px] overflow-hidden`}
      >
        <div className="h-full w-full [backface-visibility:hidden]">
          <NextImage
            src={frontSrc}
            alt={frontChar}
            width={140}
            height={160}
            unoptimized
            priority
            className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${isHovered ? backClass : frontClass} [perspective:1000px] transition-all duration-300`}>
      <motion.div
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* Front Face (0deg): ASSEMBLE ON letter */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
          <NextImage
            src={frontSrc}
            alt={frontChar}
            width={140}
            height={160}
            unoptimized
            priority
            className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Back Face (180deg): JOIN US letter */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <NextImage
            src={backSrc!}
            alt={backChar}
            width={140}
            height={160}
            unoptimized
            priority
            className="h-full w-full object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function AssembleOn() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#register"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-start gap-2.5 select-none"
    >
      <div className={`flex flex-wrap items-center gap-y-2 min-h-[40px] sm:min-h-[56px] md:min-h-[64px] transition-all duration-300 ${isHovered ? "gap-x-2.5 sm:gap-x-4" : "gap-x-4 sm:gap-x-6"}`}>
        {/* Word 1 (ASSEMBLE -> JOIN) */}
        <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
          {word1Slots.map((slot, idx) => (
            <FlipLetterCard
              key={`word1-${idx}`}
              frontChar={slot.frontChar}
              frontSrc={slot.frontSrc}
              backChar={slot.backChar}
              backSrc={slot.backSrc}
              isHovered={isHovered}
              delay={idx * 0.04}
            />
          ))}
        </div>

        {/* Word 2 (ON -> US) */}
        <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
          {word2Slots.map((slot, idx) => (
            <FlipLetterCard
              key={`word2-${idx}`}
              frontChar={slot.frontChar}
              frontSrc={slot.frontSrc}
              backChar={slot.backChar}
              backSrc={slot.backSrc}
              isHovered={isHovered}
              delay={(word1Slots.length + idx) * 0.04}
            />
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
          className="font-avenger text-xs uppercase tracking-[0.28em] text-emerald-400 sm:text-sm cursor-pointer"
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
