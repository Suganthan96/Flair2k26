"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export function VantaBirds() {
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
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js",
          () => typeof window !== "undefined" && !!(window.VANTA && window.VANTA.BIRDS)
        );

        if (isMounted && vantaRef.current && window.VANTA && window.VANTA.BIRDS) {
          if (!vantaEffect.current) {
            vantaEffect.current = window.VANTA.BIRDS({
              el: vantaRef.current,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              backgroundColor: 0x0,
              color1: 0x097214,
              color2: 0x315fd1,
              birdSize: 1.5,
              wingSpan: 20.0,
              speedLimit: 4.0,
              separation: 20.0,
              alignment: 20.0,
              cohesion: 20.0,
            });
          }
        }
      } catch (err) {
        console.error("Failed to load Vanta.js Birds script:", err);
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
