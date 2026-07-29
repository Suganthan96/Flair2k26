"use client";

// Aliased: the bare `Image` name is the DOM constructor used to preload frames.
import NextImage from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";
import SideRays from "./SideRays";

const FRAME_COUNT = 137;
const FRAME_PATH = (i: number) => `/newframes/frame_${String(i).padStart(6, "0")}.jpg`;

// Lenis already smooths the scroll position itself. This is a second, lighter
// pass so the sequence trails the page by a hair instead of tracking it 1:1.
const EASE = 0.12;

// Native width of the exported frames.
const SOURCE_WIDTH = 1920;

type Ctx = CanvasRenderingContext2D;

// Shifts the cover-fit pan slightly right (as a fraction of canvas width),
// pushing the character away from the left edge so the Assemble lockup has
// clear space to sit against. Clamped inside fitCover so it never opens a
// gap at the overflowing edge.
const PAN_BIAS_X = 0.06;

/**
 * Scale the frame to fill the viewport completely, overflowing on whichever
 * axis is proportionally shorter. Guarantees full-bleed at any window shape —
 * no pillarbox or letterbox gutters, ever.
 */
function fitCover(cw: number, ch: number, iw: number, ih: number, panBiasX = 0) {
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const maxShiftX = (dw - cw) / 2;
  const bias = Math.min(maxShiftX, Math.max(-maxShiftX, panBiasX));
  return { dx: (cw - dw) / 2 + bias, dy: (ch - dh) / 2, dw, dh };
}

function ScrollFrameCanvas({ trackRef }: { trackRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const paintedRef = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Nearest earlier loaded frame, so a not-yet-decoded frame never blanks out.
    function resolve(index: number): HTMLImageElement | null {
      let i = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      while (i > 0 && !loadedRef.current[i]) i--;
      const img = imagesRef.current[i];
      return img && img.complete && img.naturalWidth > 0 ? img : null;
    }

    function draw(c: Ctx, w: number, h: number, img: HTMLImageElement, alpha: number) {
      const box = fitCover(w, h, img.naturalWidth, img.naturalHeight, w * PAN_BIAS_X);
      c.globalAlpha = alpha;
      c.drawImage(img, box.dx, box.dy, box.dw, box.dh);
      c.globalAlpha = 1;
    }

    // `frame` is fractional: we cross-fade between the two neighbouring frames
    // so the stills read as continuous motion rather than discrete steps.
    function paint(frame: number) {
      const i0 = Math.floor(frame);
      const i1 = Math.min(FRAME_COUNT - 1, i0 + 1);
      const t = frame - i0;
      const a = resolve(i0);
      const b = resolve(i1);
      if (!a) return;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      draw(ctx!, canvas!.width, canvas!.height, a, 1);
      if (b && b !== a && t > 0.001) {
        draw(ctx!, canvas!.width, canvas!.height, b, t);
      }
    }

    function resize() {
      const parent = canvas!.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;

      // Cap at the source resolution: a buffer wider than the frames themselves
      // costs fill rate every tick and buys no detail.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.min(dpr, SOURCE_WIDTH / w);

      canvas!.width = Math.round(w * scale);
      canvas!.height = Math.round(h * scale);

      paint(currentRef.current);
    }

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const first = new Image();
    first.src = FRAME_PATH(0);
    images[0] = first;
    first.onload = () => {
      if (cancelled) return;
      loadedRef.current[0] = true;
      resize();
      setReady(true);
    };

    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedRef.current[i] = true;
      };
      images[i] = img;
    }

    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    function tick() {
      const track = trackRef.current;
      if (track) {
        const rect = track.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress =
          scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        targetRef.current = progress * (FRAME_COUNT - 1);
      }

      currentRef.current += (targetRef.current - currentRef.current) * EASE;

      // Repaint on any sub-frame movement, not just when the integer index flips.
      if (Math.abs(currentRef.current - paintedRef.current) > 0.002) {
        paint(currentRef.current);
        paintedRef.current = currentRef.current;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [trackRef]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Fades the bottom edge into the page so the next section isn't a seam. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <span className="text-xs uppercase tracking-[0.4em] text-white/30">
            Loading
          </span>
        </div>
      )}
    </div>
  );
}

// Hero never fully disappears — a faint trace of the footage stays visible
// even once the events panel has fully risen over it.
const MIN_HERO_OPACITY = 0.12;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    function tick() {
      const fadeEl = fadeRef.current;
      // Track the "Events" wordmark itself, not the section's outer edge —
      // the section has top padding before the logo, so using the section
      // boundary made coverage (and the fade) complete before the logo had
      // actually reached the top of the viewport.
      const logoEl = document.querySelector('#events img[alt="Events"]');
      if (fadeEl) {
        let coverage = 0;
        if (logoEl) {
          const logoTop = logoEl.getBoundingClientRect().top;
          coverage = Math.min(1, Math.max(0, (window.innerHeight - logoTop) / window.innerHeight));
        }
        const opacity = MIN_HERO_OPACITY + (1 - MIN_HERO_OPACITY) * (1 - coverage);
        fadeEl.style.opacity = String(opacity);
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    // Scroll budget for the whole sequence. All frames play across whatever
    // height this is — shrink it to make the sequence advance faster.
    <section id="home" ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={fadeRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Colour grade lives here so it covers the canvas as one layer. */}
        <div className="absolute inset-0 [filter:saturate(0.65)_contrast(1.06)_brightness(0.94)]">
          <ScrollFrameCanvas trackRef={sectionRef} />
        </div>

        {/* Accent light fanning in from the empty top-right corner. */}
        <div className="absolute inset-0">
          <SideRays
            speed={2.5}
            rayColor1="#70AFA2"
            rayColor2="#274C47"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={0.5}
          />
        </div>

        {/* Sits outside the grade wrapper so the crest keeps its own colour.
            Same materialize-in treatment as the title lockup, just earlier
            and lighter — it's a small crest, not the hero moment. */}
        <motion.a
          href="#home"
          aria-label="LICET — Flair 2k26 home"
          className="absolute left-8 top-3 z-10 block sm:left-16 sm:top-4"
          initial={{ opacity: 0, scale: 1.2, y: -16, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <NextImage
            src="/assets/licet-logo.webp"
            alt="LICET logo"
            width={128}
            height={128}
            priority
            className="h-14 w-14 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:h-16 sm:w-16"
          />
        </motion.a>

        {/* "Assemble" mark, top-left — sits just below the LICET crest so the
            two stack in the same corner instead of competing with the FLAIR
            title lockup on the opposite side. Same materialize-out-of-Doom's-
            magic entrance as the rest. Date sits right under it in the same
            beat, arriving just after. */}
        <motion.div
          className="pointer-events-none absolute left-2 top-10 z-10 w-80 sm:left-6 sm:top-12 sm:w-96"
          initial={{ opacity: 0, scale: 1.25, y: -20, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <NextImage
            src="/assets/assemble-removebg-preview.png"
            alt="Assemble"
            width={577}
            height={433}
            priority
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 20vw"
            className="w-full select-none object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          />
          <motion.p
            className="-mt-16 text-center font-black-ops text-lg uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:-mt-20 sm:text-2xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
          >
            On 8th August
          </motion.p>
        </motion.div>

        {/* Title lockup, bottom-right. Also outside the grade wrapper — the
            grade would mute the green glow that ties it to the footage. Enters
            like it's materializing out of Doom's magic — settles in with a
            slow unblur/scale-down. */}
        <motion.div
          className="pointer-events-none absolute bottom-6 right-6 z-10 w-52 sm:bottom-10 sm:right-10 sm:w-72 lg:w-[22rem]"
          initial={{ opacity: 0, scale: 1.25, y: 26, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <NextImage
            src="/assets/FLAIR.png"
            alt="Flair 2k26"
            width={2896}
            height={2172}
            priority
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
            className="w-full select-none object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
