"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Low lerp = the viewport glides toward the real scroll position
        // instead of snapping to it. This is what carries the frame
        // sequence, so it's the main "weight" dial for the whole page.
        lerp: 0.075,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.6,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
