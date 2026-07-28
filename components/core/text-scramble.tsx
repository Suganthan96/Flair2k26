"use client";

import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, MotionProps } from "framer-motion";

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  delay?: number;
  characterSet?: string;
  className?: string;
  as?: React.ElementType;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const DEFAULT_CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  delay = 0,
  characterSet = DEFAULT_CHARACTER_SET,
  className = "",
  as: Component = "span",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(children);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const steps = Math.floor(duration / speed);
    let step = 0;

    intervalRef.current = setInterval(() => {
      const progress = step / steps;
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < Math.floor(progress * children.length)) {
            return children[index];
          }
          return characterSet[Math.floor(Math.random() * characterSet.length)];
        })
        .join("");

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
        isScramblingRef.current = false;
        if (onScrambleComplete) onScrambleComplete();
      }
    }, speed * 1000);
  }, [children, duration, speed, characterSet, onScrambleComplete]);

  // Trigger once on initial page enter / refresh after specified delay
  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(() => {
      scramble();
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Run on mount

  const MotionComponent = (motion as any)[Component as string] || motion.span;

  return (
    <MotionComponent
      className={className}
      onMouseEnter={scramble}
      {...props}
    >
      {displayText}
    </MotionComponent>
  );
}
