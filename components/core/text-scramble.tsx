"use client";

import { useEffect, useRef, useState } from "react";

// Scrambles using the target text's own letters (deduped, no spaces) instead
// of an unrelated symbol set — reads like the word's own letters shuffling
// into place rather than glitch/hacker noise.
const scramble = (text: string) => {
  const pool = Array.from(new Set(text.replace(/\s/g, "").split("")));
  return text
    .split("")
    .map((char) => (char === " " ? " " : pool[Math.floor(Math.random() * pool.length)]))
    .join("");
};

/**
 * "Hacker text" reveal: every character scrambles through the text's own
 * letters before locking into place, left-to-right, one at a time.
 * `startDelay` lets a caller line this up inside a larger choreographed
 * sequence instead of firing the instant it mounts.
 */
export function TextScramble({
  children,
  className,
  duration = 900,
  startDelay = 0,
}: {
  children: string;
  className?: string;
  duration?: number;
  startDelay?: number;
}) {
  // Starts as the plain text (matching what the server rendered) — Math.random()
  // can't run during the initial render without causing a hydration mismatch,
  // so the very first scramble happens client-side, inside the effect below.
  const [displayText, setDisplayText] = useState(children);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const text = children;
    const letterCount = text.length;
    const pool = Array.from(new Set(text.replace(/\s/g, "").split("")));
    // Deterministic, index-ordered reveal points (0, 1/n, 2/n, ...) — each
    // character locks in strictly left-to-right, one at a time, rather than
    // settling in a shuffled order.
    const revealsAt = text.split("").map((_, i) => i / letterCount);

    setDisplayText(scramble(text));
    const start = performance.now() + startDelay;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        // Still scrambled-looking during the pre-delay window, rather than
        // prematurely showing the real text before the reveal has begun.
        setDisplayText(scramble(text));
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      let output = "";
      let settledCount = 0;

      for (let i = 0; i < letterCount; i++) {
        const char = text[i];
        if (char === " " || progress >= revealsAt[i]) {
          output += char;
          settledCount++;
        } else {
          output += pool[Math.floor(Math.random() * pool.length)];
        }
      }

      setDisplayText(output);

      if (settledCount < letterCount) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [children, duration, startDelay]);

  return <span className={className}>{displayText}</span>;
}
