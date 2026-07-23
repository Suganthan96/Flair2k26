"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/mockData";

// Panel slide-in is 0.4s — links start staggering in only once that
// finishes, then reveal one after another rather than all at once.
const NAV_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.4, staggerChildren: 0.09 },
  },
};

const LINK_VARIANTS: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function SideNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="fixed right-6 top-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-avenger-red/60 sm:right-10 sm:top-8"
        >
          <Menu size={26} />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 cursor-default bg-transparent"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              // Same 4-corner tilted trapezoid as before (right edge flush,
              // left edge one straight diagonal), but each corner is now
              // replaced with 3 points tracing a short curved approach
              // instead of a single sharp vertex — a rounded-corner
              // approximation using only `polygon()` (still a plain CSS
              // basic-shape, no SVG/path()), so it stays responsive via
              // percentages relative to this element's own box.
              //
              // Height is capped well short of 100dvh (rather than the full
              // viewport) specifically so this panel — and its blur — stay
              // clear of the Hero's bottom-right FLAIR logo.
              style={{
                clipPath:
                  "polygon(100% 4%, 98.8% 1.2%, 96% 0%, 14% 0%, 12% 1.4%, 11% 4%, 33% 96%, 35% 98.6%, 38% 100%, 96% 100%, 98.8% 98.8%, 100% 96%)",
              }}
              className="fixed right-0 top-0 z-50 flex h-[56vh] w-full max-w-xs flex-col items-end justify-center gap-5 bg-black/35 pl-36 pr-8 backdrop-blur-lg"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-6 top-6 text-white sm:right-10 sm:top-8"
              >
                <X size={24} />
              </button>

              <motion.nav
                variants={NAV_VARIANTS}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-end gap-5 text-right"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    variants={LINK_VARIANTS}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-jost text-xl uppercase text-white/90 transition-colors hover:text-avenger-red sm:text-2xl"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
