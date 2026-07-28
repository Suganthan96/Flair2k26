"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export function VantaCells() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    let observer: IntersectionObserver | null = null;

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
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js",
          () => typeof window !== "undefined" && !!(window.VANTA && window.VANTA.CELLS)
        );

        if (isMounted && vantaRef.current && window.VANTA && window.VANTA.CELLS) {
          if (!vantaEffect.current) {
            vantaEffect.current = window.VANTA.CELLS({
              el: vantaRef.current,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 0.75,
              scaleMobile: 0.75,
              color1: 0x041f12,
              color2: 0x3dff8c,
              size: 1.5,
              speed: 1.0,
            });

            // Viewport Culling
            observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (vantaEffect.current) {
                    if (!entry.isIntersecting) {
                      if (vantaEffect.current.pause) vantaEffect.current.pause();
                    } else {
                      if (vantaEffect.current.resume) vantaEffect.current.resume();
                    }
                  }
                });
              },
              { threshold: 0.05 }
            );

            if (vantaRef.current) {
              observer.observe(vantaRef.current);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load Vanta.js Cells script:", err);
      }
    }

    initVanta();

    return () => {
      isMounted = false;
      if (observer) observer.disconnect();
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
