"use client";

import { useEffect, useRef } from "react";

// ============================================================
//  Doctor Doom Custom Cursor — Robust & Error-Proof
//
//  - Keeps standard cursor active until first user mouse movement
//  - Instant 1:1 hardware dot tracking + smoothed tactical reticle
//  - Automatic cleanup to prevent stuck hidden cursor state
//  - Safe canvas particle rendering with error fallbacks
// ============================================================

export default function DoomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only activate if not a primary touch device (e.g. mobile phones)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hasMoved = false;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let animId = 0;

    const MAX_PARTICLES = 25;
    const particles = new Float32Array(MAX_PARTICLES * 5); // [x, y, vx, vy, life]
    let particleHead = 0;

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas?.getContext("2d", { alpha: true }) ?? null;
    } catch {
      // Ignore canvas errors gracefully
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Enable custom cursor ONLY on first physical mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
        document.documentElement.classList.add("custom-doom-cursor");
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Add particle to pool
      if (Math.random() < 0.4) {
        const idx = particleHead * 5;
        particles[idx] = mouseX;
        particles[idx + 1] = mouseY;
        particles[idx + 2] = (Math.random() - 0.5) * 0.6;
        particles[idx + 3] = -0.4 - Math.random() * 0.6;
        particles[idx + 4] = 1.0;
        particleHead = (particleHead + 1) % MAX_PARTICLES;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      isHovering = !!target.closest(
        'a, button, input, select, textarea, [role="button"], .group, [data-interactive="true"]'
      );
    };

    const handleMouseDown = () => {
      isClicking = true;
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    let rotation = 0;

    function loop() {
      if (hasMoved) {
        ringX += (mouseX - ringX) * 0.25;
        ringY += (mouseY - ringY) * 0.25;
        rotation += isHovering ? 2.5 : 0.6;

        if (ringRef.current) {
          const scale = isClicking ? 0.75 : isHovering ? 1.4 : 1;
          ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(${scale}) rotate(${rotation}deg)`;
          ringRef.current.style.borderColor = isHovering
            ? "rgba(61, 255, 140, 0.85)"
            : "rgba(16, 185, 129, 0.4)";
          ringRef.current.style.backgroundColor = isHovering
            ? "rgba(16, 185, 129, 0.12)"
            : "transparent";
        }

        if (ctx && canvas) {
          try {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#3dff8c";

            for (let i = 0; i < MAX_PARTICLES; i++) {
              const idx = i * 5;
              let life = particles[idx + 4];
              if (life <= 0) continue;

              life -= 0.04;
              particles[idx + 4] = life;

              particles[idx] += particles[idx + 2];
              particles[idx + 1] += particles[idx + 3];

              ctx.globalAlpha = life * 0.7;
              ctx.beginPath();
              ctx.arc(particles[idx], particles[idx + 1], life * 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          } catch {
            // Ignore canvas draw errors
          }
        }
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-doom-cursor");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Plasma Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99990] h-full w-full"
      />

      {/* Outer Reticle */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99991] h-8 w-8 rounded-md border border-emerald-400/40 opacity-0 shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-opacity duration-200"
        style={{ willChange: "transform" }}
      >
        <span className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 border-l-2 border-t-2 border-emerald-400" />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 border-r-2 border-t-2 border-emerald-400" />
        <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b-2 border-l-2 border-emerald-400" />
        <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b-2 border-r-2 border-emerald-400" />
      </div>

      {/* Primary Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[99992] h-2 w-2 rotate-45 rounded-xs bg-emerald-400 opacity-0 shadow-[0_0_8px_rgba(61,255,140,0.9)] transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
    </>
  );
}