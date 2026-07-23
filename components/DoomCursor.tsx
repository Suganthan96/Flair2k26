"use client";

import { useEffect, useRef } from "react";

// ============================================================
//  Ultra-Fast Doctor Doom Custom Cursor (60-144 FPS Zero-Lag)
//
//  - 1:1 Instant hardware tracking for center point (0ms input lag)
//  - GPU-accelerated transform3d for reticle & ring
//  - Zero DOM querying on mousemove (uses mouseover delegation)
//  - Lightweight pre-allocated particle pool for plasma trail
// ============================================================

export default function DoomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch devices to avoid touch latency
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    document.documentElement.classList.add("custom-doom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let animId = 0;

    // Fixed particle pool for trail (zero GC allocations)
    const MAX_PARTICLES = 25;
    const particles = new Float32Array(MAX_PARTICLES * 5); // [x, y, vx, vy, life]
    let particleHead = 0;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // 1:1 Instant Mouse Position Update (No RAF lag for primary dot)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Add particle to circular pool on movement
      if (Math.random() < 0.4) {
        const idx = particleHead * 5;
        particles[idx] = mouseX;
        particles[idx + 1] = mouseY;
        particles[idx + 2] = (Math.random() - 0.5) * 0.6;
        particles[idx + 3] = -0.4 - Math.random() * 0.6;
        particles[idx + 4] = 1.0; // Life (1.0 -> 0.0)
        particleHead = (particleHead + 1) % MAX_PARTICLES;
      }
    };

    // Fast Event Delegation for Hovering (Fires ONLY on enter/leave, NOT on move)
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

    // GPU Eased Animation Loop for Outer Reticle & Plasma Trail
    let rotation = 0;

    function loop() {
      // Eased movement for outer ring
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

      // Draw plasma particle trail
      if (ctx && canvas) {
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
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Plasma Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99990] h-full w-full"
      />

      {/* Outer Tactical Reticle */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99991] h-8 w-8 rounded-md border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.2)] transition-colors duration-200"
        style={{ willChange: "transform" }}
      >
        <span className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 border-l-2 border-t-2 border-emerald-400" />
        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 border-r-2 border-t-2 border-emerald-400" />
        <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b-2 border-l-2 border-emerald-400" />
        <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b-2 border-r-2 border-emerald-400" />
      </div>

      {/* 1:1 Instant Core Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[99992] h-2 w-2 rotate-45 rounded-xs bg-emerald-400 shadow-[0_0_8px_rgba(61,255,140,0.9)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}