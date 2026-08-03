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
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-[#e60212] sm:bg-black"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src="/assets/licet it department.svg"
              alt="LICET IT Department"
              fill
              unoptimized
              priority
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
