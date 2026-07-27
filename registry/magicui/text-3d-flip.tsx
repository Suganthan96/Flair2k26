"use client";

import { motion, type Transition } from "framer-motion";
import React from "react";

type StaggerFrom = "first" | "last" | "center" | number;

export interface Text3DFlipProps {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: Transition;
}

function getStaggerDelay(
  index: number,
  total: number,
  from: StaggerFrom,
  stagger: number
): number {
  if (typeof from === "number") return Math.abs(index - from) * stagger;
  if (from === "first") return index * stagger;
  if (from === "last") return (total - 1 - index) * stagger;
  if (from === "center") return Math.abs(index - (total - 1) / 2) * stagger;
  return index * stagger;
}

export default function Text3DFlip({
  children,
  className = "",
  textClassName = "",
  flipTextClassName = "",
  rotateDirection = "top",
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = { type: "spring", damping: 25, stiffness: 160 },
}: Text3DFlipProps) {
  const text = typeof children === "string" ? children : String(children ?? "");
  const chars = text.split("");
  const total = chars.length;

  const rotationVariants = {
    top: {
      initialFront: { rotateX: 0, y: "0%" },
      hoverFront: { rotateX: 90, y: "-100%" },
      initialBack: { rotateX: -90, y: "100%" },
      hoverBack: { rotateX: 0, y: "0%" },
    },
    bottom: {
      initialFront: { rotateX: 0, y: "0%" },
      hoverFront: { rotateX: -90, y: "100%" },
      initialBack: { rotateX: 90, y: "-100%" },
      hoverBack: { rotateX: 0, y: "0%" },
    },
    left: {
      initialFront: { rotateY: 0, x: "0%" },
      hoverFront: { rotateY: -90, x: "-100%" },
      initialBack: { rotateY: 90, x: "100%" },
      hoverBack: { rotateY: 0, x: "0%" },
    },
    right: {
      initialFront: { rotateY: 0, x: "0%" },
      hoverFront: { rotateY: 90, x: "100%" },
      initialBack: { rotateY: -90, x: "-100%" },
      hoverBack: { rotateY: 0, x: "0%" },
    },
  };

  const config = rotationVariants[rotateDirection] || rotationVariants.top;

  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      className={`relative inline-flex flex-wrap overflow-visible select-none cursor-pointer pointer-events-auto ${className}`}
      style={{ perspective: "1000px" }}
    >
      {chars.map((char, i) => {
        const delay = getStaggerDelay(i, total, staggerFrom, staggerDuration);
        const charTransition = {
          ...transition,
          delay,
        };

        return (
          <span
            key={i}
            className="relative inline-block overflow-visible"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front character */}
            <motion.span
              className={`inline-block ${textClassName}`}
              variants={{
                initial: config.initialFront,
                hover: config.hoverFront,
              }}
              transition={charTransition}
              style={{
                backfaceVisibility: "hidden",
                transformOrigin:
                  rotateDirection === "top"
                    ? "50% 100%"
                    : rotateDirection === "bottom"
                    ? "50% 0%"
                    : rotateDirection === "left"
                    ? "100% 50%"
                    : "0% 50%",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* Back (flipped) character */}
            <motion.span
              className={`absolute inset-0 inline-block ${flipTextClassName}`}
              variants={{
                initial: config.initialBack,
                hover: config.hoverBack,
              }}
              transition={charTransition}
              style={{
                backfaceVisibility: "hidden",
                transformOrigin:
                  rotateDirection === "top"
                    ? "50% 0%"
                    : rotateDirection === "bottom"
                    ? "50% 100%"
                    : rotateDirection === "left"
                    ? "0% 50%"
                    : "100% 50%",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
