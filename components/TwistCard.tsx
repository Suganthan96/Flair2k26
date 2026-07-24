"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// A 3D "twist" scroll-reveal: the card rotates in around the Y-axis (with a
// touch of Z-axis spin) rather than just fading/sliding, alternating twist
// direction by index so a stacked list reads as a sequence, not a repeat.
// The small index-based delay keeps cards settling one after another even
// if two cross the viewport threshold in the same scroll tick.
export default function TwistCard({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1200 }}
      initial={{
        opacity: 0,
        rotateY: fromLeft ? -60 : 60,
        rotateZ: fromLeft ? -5 : 5,
        x: fromLeft ? -50 : 50,
        y: 40,
      }}
      whileInView={{ opacity: 1, rotateY: 0, rotateZ: 0, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.85,
        delay: Math.min(index, 4) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
