"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    p5: any;
    VANTA: any;
  }
}

export function VantaTopology() {
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
          "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js",
          () => typeof window !== "undefined" && !!window.p5
        );

        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js",
          () => typeof window !== "undefined" && !!(window.VANTA && window.VANTA.TOPOLOGY)
        );

        if (isMounted && vantaRef.current && window.VANTA && window.VANTA.TOPOLOGY) {
          if (!vantaEffect.current) {
            vantaEffect.current = window.VANTA.TOPOLOGY({
              el: vantaRef.current,
              mouseControls: false, // Performance boost
              touchControls: false,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 0.5, // 50% scale rendering optimization (removes p5.js lag)
              scaleMobile: 0.5,
              color: 0x15ac0d,
              backgroundColor: 0x040608,
            });

            // Viewport Culling: Pause Vanta animation when section is off-screen
            observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (vantaEffect.current) {
                    if (!entry.isIntersecting) {
                      // Off screen: pause loop to save 100% GPU/CPU
                      if (vantaEffect.current.pause) vantaEffect.current.pause();
                    } else {
                      // On screen: resume loop
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
        console.error("Failed to load Vanta.js Topology script:", err);
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 transition-opacity duration-700"
    />
  );
}
