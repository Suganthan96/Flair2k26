"use client";

// Aliased: the bare `Image` name is the DOM constructor used to preload frames.
import NextImage from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight, Zap } from "lucide-react";
import SideRays from "./SideRays";

const FRAME_COUNT = 137;
const FRAME_PATH = (i: number) => `/newframes/frame_${String(i).padStart(6, "0")}.jpg`;

// Lenis already smooths the scroll position itself. This is a second, lighter
// pass so the sequence trails the page by a hair instead of tracking it 1:1.
const EASE = 0.12;

// Native width of the exported frames.
const SOURCE_WIDTH = 1920;

type Ctx = CanvasRenderingContext2D;

/**
 * Scale the frame to fill the viewport completely, overflowing on whichever
 * axis is proportionally shorter. Guarantees full-bleed at any window shape —
 * no pillarbox or letterbox gutters, ever.
 */
function fitCover(cw: number, ch: number, iw: number, ih: number) {
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  return { dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh };
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
      const box = fitCover(w, h, img.naturalWidth, img.naturalHeight);
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    // Scroll budget for the whole sequence. All frames play across whatever
    // height this is — shrink it to make the sequence advance faster.
    <section id="home" ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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

        {/* LICET Logo - Top Left */}
        <a
          href="#home"
          aria-label="LICET — Flair 2k26 home"
          className="absolute left-8 top-3 z-10 block sm:left-16 sm:top-4"
        >
          <NextImage
            src="/assets/licet-logo.webp"
            alt="LICET logo"
            width={128}
            height={128}
            priority
            className="h-14 w-14 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:h-16 sm:w-16"
          />
        </a>

        {/* Ultra-Attractive Doctor Doom Avengers Style "JOIN US ON 8TH AUGUST" Text Emblem */}
        <a
          href="#register"
          className="group/text absolute left-8 top-20 z-20 flex flex-col text-left transition-all duration-500 sm:left-16 sm:top-24"
        >
          {/* Subtitle Badge */}
          <div className="mb-1 flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            <span className="font-avenger text-xs font-bold uppercase tracking-[0.35em] text-emerald-400 drop-shadow-[0_0_10px_rgba(61,255,140,0.9)] transition-all group-hover/text:text-emerald-200">
              DOOMSDAY MISSION · AUGUST 8, 2026
            </span>
          </div>

          {/* Main Avengers 3D Metallic Text with Plasma Storm & Glitter Shimmer */}
          <div className="relative inline-block overflow-hidden py-1">
            {/* Ambient Background Energy Aura Glow */}
            <div className="pointer-events-none absolute -inset-6 opacity-0 transition-opacity duration-500 group-hover/text:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(61,255,140,0.25),transparent_70%)] blur-lg" />

            <h1 className="relative font-black-ops text-3xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-300 to-green-400 transition-all duration-500 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] group-hover/text:scale-[1.02] group-hover/text:from-white group-hover/text:via-emerald-200 group-hover/text:to-green-300 group-hover/text:drop-shadow-[0_0_25px_rgba(61,255,140,1)] group-hover/text:drop-shadow-[0_0_55px_rgba(16,185,129,0.95)] sm:text-5xl md:text-6xl">
              JOIN US ON 8TH AUGUST
            </h1>

            {/* Shimmer Electro-Glitter Lightning Sweep Bar on Hover */}
            <span className="pointer-events-none absolute -inset-x-full inset-y-0 bg-gradient-to-r from-transparent via-emerald-200/90 to-transparent transition-transform duration-1000 group-hover/text:translate-x-full" />

            {/* Plasma Energy Line under Title */}
            <div className="mt-1.5 h-[2.5px] w-full scale-x-75 bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-transform duration-500 group-hover/text:scale-x-100 group-hover/text:shadow-[0_0_15px_rgba(61,255,140,0.9)]" />
          </div>

          {/* Action Subline with Glowing Arrow Badge */}
          <div className="mt-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors group-hover/text:text-emerald-300">
            <span>Assemble For The Experience</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/50 bg-black/60 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-300 group-hover/text:translate-x-2 group-hover/text:border-emerald-300 group-hover/text:bg-emerald-400 group-hover/text:text-black group-hover/text:shadow-[0_0_25px_rgba(61,255,140,0.9)]">
              <ArrowRight size={15} />
            </div>
          </div>
        </a>

        {/* Title lockup, bottom-right. Outside grade wrapper */}
        <NextImage
          src="/assets/FLAIR.png"
          alt="Flair 2k26"
          width={2896}
          height={2172}
          priority
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
          className="pointer-events-none absolute bottom-6 right-6 z-10 w-52 select-none object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] sm:bottom-10 sm:right-10 sm:w-72 lg:w-[22rem]"
        />
      </div>
    </section>
  );
}
