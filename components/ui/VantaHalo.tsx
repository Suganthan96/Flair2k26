"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export function VantaHalo() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadScript(src: string, checkGlobal: () => boolean) {
      if (checkGlobal()) return;
      return new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          existingScript.addEventListener("load", () => resolve());
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    async function initVanta() {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
          () => typeof window !== "undefined" && !!window.THREE
        );

        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js",
          () => typeof window !== "undefined" && !!(window.VANTA && window.VANTA.HALO)
        );

        if (isMounted && vantaRef.current && window.VANTA && window.VANTA.HALO) {
          if (!vantaEffect.current) {
            vantaEffect.current = window.VANTA.HALO({
              el: vantaRef.current,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              baseColor: 0x29ca62,
              backgroundColor: 0x050806,
              size: 1.5,
              amplitudeFactor: 1.2,
            });
          }
        }
      } catch (err) {
        console.error("Failed to load Vanta.js Halo script:", err);
      }
    }

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
