"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const HOLD_MS = 2000;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock the page from scrolling (and hide the scrollbar) for as long as
    // the loader is on screen; restored via onExitComplete below once the
    // fade-out animation actually finishes.
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        // No `initial`/`animate` on this outer layer: it must be fully
        // opaque from the very first paint (even pre-hydration), otherwise
        // the page behind it is visible through it while it fades in. Only
        // `exit` animates, so the reveal at the end is the one fade.
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          // Below `sm` (phones, portrait): the logo's wide canvas can't
          // cover a tall screen without cropping the wordmark down to a
          // sliver, so it stays uncropped on a backdrop matching the SVG's
          // own red — no crop, no visible seam. At `sm` and up (desktop):
          // aspect ratios are close enough that a full-bleed crop reads fine.
          className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#d40317] sm:bg-black"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="/assets/Marvel_Studios_logo.svg"
              alt="Marvel Studios"
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-contain sm:object-cover"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
