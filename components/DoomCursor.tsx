"use client";

import { useEffect, useRef } from "react";

export default function DoomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${clientX - 16}px, ${clientY - 16}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${clientX - 32}px, ${clientY - 32}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hover effect: scale ring on interactive elements
    const style = document.createElement("style");
    style.id = "doom-cursor-hover";
    style.textContent = `
      a:hover ~ .doom-cursor-ring,
      button:hover ~ .doom-cursor-ring,
      input:hover ~ .doom-cursor-ring,
      [role="button"]:hover ~ .doom-cursor-ring {
        width: 48px !important;
        height: 48px !important;
        margin-left: -8px !important;
        margin-top: -8px !important;
        border-color: rgba(16, 185, 129, 0.6) !important;
        background: rgba(16, 185, 129, 0.08) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      const el = document.getElementById("doom-cursor-hover");
      el?.remove();
    };
  }, []);

  return (
    <>
      {/* Main cursor dot — bright emerald core */}
      <div
        ref={cursorRef}
        className="doom-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />

      {/* Outer energy ring — follows the dot smoothly */}
      <div
        ref={ringRef}
        className="doom-cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all duration-[80ms] ease-out"
        style={{ willChange: "transform" }}
      />

      {/* Diffuse glow behind cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-16 w-16 rounded-full bg-emerald-400/5 blur-xl transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
}