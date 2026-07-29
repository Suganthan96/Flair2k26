"use client";

import { useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

const joinLetters = [
  { char: "J", src: "/assets/J.png" },
  { char: "O", src: "/assets/O.png" },
  { char: "I", src: "/assets/I.png" },
  { char: "N", src: "/assets/N.png" },
];

const usLetters = [
  { char: "U", src: "/assets/U.png" },
  { char: "S", src: "/assets/S.png" },
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

export default function AssembleOn() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#register"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col items-start gap-2.5 select-none"
    >
      <div className="relative flex min-h-[40px] items-center sm:min-h-[56px] md:min-h-[64px]">
        <AnimatePresence mode="wait">
          {!isHovered ? (
            /* ASSEMBLE ON */
            <motion.div
              key="assemble-on"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2"
            >
              {/* ASSEMBLE */}
              <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
                {assembleLetters.map((item, idx) => (
                  <motion.div
                    key={`assemble-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, delay: idx * 0.015 }}
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
                  </motion.div>
                ))}
              </div>

              {/* ON */}
              <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
                {onLetters.map((item, idx) => (
                  <motion.div
                    key={`on-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, delay: 0.12 + idx * 0.015 }}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* JOIN US */
            <motion.div
              key="join-us"
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2"
            >
              {/* JOIN */}
              <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
                {joinLetters.map((item, idx) => (
                  <motion.div
                    key={`join-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, delay: idx * 0.02 }}
                    className={`relative ${getLetterContainerClass(item.char)}`}
                  >
                    <NextImage
                      src={item.src}
                      alt={item.char}
                      width={140}
                      height={160}
                      unoptimized
                      priority
                      className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(52,211,153,0.85)]"
                    />
                  </motion.div>
                ))}
              </div>

              {/* US */}
              <div className="flex items-center -space-x-1.5 sm:-space-x-2.5 md:-space-x-3">
                {usLetters.map((item, idx) => (
                  <motion.div
                    key={`us-${idx}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.12, delay: 0.1 + idx * 0.02 }}
                    className={`relative ${getLetterContainerClass(item.char)}`}
                  >
                    <NextImage
                      src={item.src}
                      alt={item.char}
                      width={140}
                      height={160}
                      unoptimized
                      priority
                      className="h-full w-full object-contain drop-shadow-[0_0_16px_rgba(52,211,153,0.85)]"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
