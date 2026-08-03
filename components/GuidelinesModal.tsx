"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";

// Portalled to <body> for the same reason EventDetailModal is — it's the
// only way to reliably escape an ancestor's stacking context (see that
// component for the full story) — and this modal nests on top of that one,
// so it needs a higher z-index than EventDetailModal's z-50 to actually
// render above it rather than behind.
export default function GuidelinesModal({
  pdfUrl,
  eventTitle,
  onClose,
}: {
  pdfUrl: string;
  eventTitle: string;
  onClose: () => void;
}) {
  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${eventTitle} guidelines`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-4 sm:p-5">
          <h3 className="font-black-ops text-lg uppercase text-white sm:text-xl">
            Guidelines
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
          >
            Close
          </button>
        </div>

        {/* Browser's own native PDF viewer (Chrome/Edge/Firefox all render
            this inline with their standard toolbar — thumbnails, zoom,
            print, download) rather than anything custom-built. */}
        <iframe src={pdfUrl} title={`${eventTitle} guidelines`} className="w-full flex-1" />
      </motion.div>
    </motion.div>,
    document.body
  );
}
