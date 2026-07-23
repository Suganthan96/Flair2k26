"use client";

import { useEffect, useRef } from "react";

// ============================================================
//  Doctor Doom — Tactical Energy Reticle & Plasma Trail Cursor
//
//  A custom Doctor Doom cursor:
//  - Rotating emerald power core & precision target crosshair reticle
//  - Live plasma trail particles trailing the cursor movement
//  - Interactive target lock-on state on hoverable elements
//  - High-energy emerald shockwave ring on click
// ============================================================

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  isGold: boolean;
}

export default function DoomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor on desktop
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.documentElement.classList.add("custom-doom-cursor");

    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const ring = { x: -100, y: -100 };
    let isHovering = false;
    let isMouseDown = false;
    let animId = 0;

    const particles: TrailParticle[] = [];

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Spawn trail particles on move
      if (Math.random() < 0.6) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          size: 1.5 + Math.random() * 2.5,
          alpha: 0.8,
          life: 0,
          maxLife: 25 + Math.random() * 20,
          isGold: Math.random() < 0.2,
        });
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;

      // Shockwave burst on click
      if (shockwaveRef.current) {
        const sw = shockwaveRef.current;
        sw.style.transform = `translate(${mouse.targetX - 24}px, ${mouse.targetY - 24}px) scale(0.3)`;
        sw.style.opacity = "1";
        sw.style.transition = "none";
        requestAnimationFrame(() => {
          sw.style.transition = "transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease-out";
          sw.style.transform = `translate(${mouse.targetX - 24}px, ${mouse.targetY - 24}px) scale(2.2)`;
          sw.style.opacity = "0";
        });
      }

      // Burst extra trail particles
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const spd = 1.5 + Math.random() * 2;
        particles.push({
          x: mouse.targetX,
          y: mouse.targetY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: 2 + Math.random() * 3,
          alpha: 0.9,
          life: 0,
          maxLife: 30 + Math.random() * 15,
          isGold: Math.random() < 0.3,
        });
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, input, select, textarea, [role="button"], .group, [data-interactive="true"]'
      );
      isHovering = !!interactive;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation Loop for Cursor Position, Damping & Canvas Trail Particles
    let rotAngle = 0;

    function render() {
      // Direct position follow for core
      mouse.x += (mouse.targetX - mouse.x) * 0.45;
      // Smooth eased follow for outer ring & crosshair
      ring.x += (mouse.targetX - ring.x) * 0.18;

      mouse.y += (mouse.targetY - mouse.y) * 0.45;
      ring.y += (mouse.targetY - ring.y) * 0.18;

      rotAngle += isHovering ? 3 : 0.8;

      if (coreRef.current) {
        const scale = isMouseDown ? 0.7 : isHovering ? 1.3 : 1;
        coreRef.current.style.transform = `translate3d(${mouse.x - 5}px, ${mouse.y - 5}px, 0) scale(${scale}) rotate(${rotAngle * 2}deg)`;
      }

      if (ringRef.current) {
        const scale = isMouseDown ? 0.8 : isHovering ? 1.45 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0) scale(${scale}) rotate(${rotAngle}deg)`;
        ringRef.current.style.borderColor = isHovering
          ? "rgba(61, 255, 140, 0.8)"
          : "rgba(16, 185, 129, 0.4)";
        ringRef.current.style.backgroundColor = isHovering
          ? "rgba(16, 185, 129, 0.12)"
          : "rgba(16, 185, 129, 0.02)";
      }

      if (crosshairRef.current) {
        const scale = isHovering ? 1.35 : 1;
        crosshairRef.current.style.transform = `translate3d(${ring.x - 16}px, ${ring.y - 16}px, 0) scale(${scale}) rotate(${-rotAngle * 0.5}deg)`;
        crosshairRef.current.style.opacity = isHovering ? "1" : "0.7";
      }

      // Render Canvas Plasma Embers Trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 0.96;
          p.vx *= 0.96;
          p.life++;

          const progress = p.life / p.maxLife;
          const currentAlpha = p.alpha * (1 - progress);
          const currentSize = p.size * (1 - progress * 0.4);

          if (p.life >= p.maxLife || currentAlpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = currentAlpha;

          // Glowing aura
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            currentSize * 2.5
          );
          if (p.isGold) {
            grad.addColorStop(0, "rgba(232, 185, 35, 0.8)");
            grad.addColorStop(1, "rgba(232, 185, 35, 0)");
          } else {
            grad.addColorStop(0, "rgba(61, 255, 140, 0.8)");
            grad.addColorStop(1, "rgba(16, 185, 129, 0)");
          }
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Bright center
          ctx.fillStyle = p.isGold ? "#ffe066" : "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentSize * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("custom-doom-cursor");
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Dynamic Plasma Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99990] h-full w-full"
      />

      {/* Diffuse Energy Shockwave Burst on Click */}
      <div
        ref={shockwaveRef}
        className="pointer-events-none fixed left-0 top-0 z-[99991] h-12 w-12 rounded-full border-2 border-emerald-400 bg-emerald-500/20 opacity-0 shadow-[0_0_20px_rgba(61,255,140,0.8)]"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Doctor Doom Tactical Crosshair Brackets */}
      <div
        ref={crosshairRef}
        className="pointer-events-none fixed left-0 top-0 z-[99992] h-8 w-8 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      >
        {/* Top-Left Corner Notch */}
        <span className="absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-emerald-400 drop-shadow-[0_0_4px_rgba(61,255,140,0.8)]" />
        {/* Top-Right Corner Notch */}
        <span className="absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-emerald-400 drop-shadow-[0_0_4px_rgba(61,255,140,0.8)]" />
        {/* Bottom-Left Corner Notch */}
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-emerald-400 drop-shadow-[0_0_4px_rgba(61,255,140,0.8)]" />
        {/* Bottom-Right Corner Notch */}
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-emerald-400 drop-shadow-[0_0_4px_rgba(61,255,140,0.8)]" />
      </div>

      {/* Outer Rotating Power Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99993] h-10 w-10 rounded-lg border border-emerald-400/40 bg-emerald-500/5 shadow-[0_0_16px_rgba(16,185,129,0.25)] transition-all duration-300 ease-out"
        style={{ willChange: "transform" }}
      />

      {/* Doctor Doom Central Diamond Core */}
      <div
        ref={coreRef}
        className="pointer-events-none fixed left-0 top-0 z-[99994] h-2.5 w-2.5 rotate-45 rounded-sm bg-gradient-to-br from-emerald-300 to-green-500 shadow-[0_0_12px_rgba(61,255,140,0.95)]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}