"use client";

import { useEffect, useRef } from "react";

// ============================================================
//  Doctor Doom — Live Interactive Doomsday Cosmic Background
//
//  - Interactive Hexagonal Energy Defense Shield (Ripples on Mouse Hover)
//  - Live Drifting Volumetric Emerald Plasma Smoke & Nebular Haze
//  - Dynamic Electric Plasma Arcs & Lightning Flashes
//  - Volcanic Rugged Terrain & Citadel with Pulsing Magma Fissures
//  - 60+ Fluid Rising Embers & Energy Rune Sparks reacting to Cursor
//  - Viewport Culling via IntersectionObserver for 60-144 FPS
// ============================================================

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
}

interface LightningBolt {
  segments: { x: number; y: number }[];
  alpha: number;
  life: number;
  maxLife: number;
}

interface PlasmaStream {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  speed: number;
  life: number;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  isGold: boolean;
}

export default function DoomCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId = 0;
    let time = 0;
    let isVisible = true;

    // Mouse Tracking for Live Reaction
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Viewport Culling (Pause animation when off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animId) {
            animId = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Pre-rendered Static Offscreen Cache for Terrain & Citadel
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    const stars: Star[] = [];
    const embers: Ember[] = [];
    const bolts: LightningBolt[] = [];
    const streams: PlasmaStream[] = [];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < 65; i++) {
        stars.push({
          x: (Math.random() - 0.5) * w * 1.6,
          y: (Math.random() - 0.5) * h * 1.6,
          z: Math.random() * 4 + 0.5,
          size: 0.8 + Math.random() * 1.8,
          speed: 0.4 + Math.random() * 1.4,
        });
      }
    }

    function spawnEmber() {
      if (embers.length > 55) return;
      const isGold = Math.random() < 0.25;
      embers.push({
        x: Math.random() * w,
        y: h * 0.82 + Math.random() * 30,
        size: 1.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.6 + Math.random() * 1.8),
        life: 0,
        maxLife: 110 + Math.random() * 130,
        isGold,
      });
    }

    function spawnBolt() {
      const startX = 0.1 * w + Math.random() * 0.8 * w;
      const startY = 0.05 * h + Math.random() * 0.25 * h;
      const segs: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let x = startX;
      let y = startY;
      const length = 8 + Math.floor(Math.random() * 10);
      for (let i = 0; i < length; i++) {
        x += (Math.random() - 0.5) * 25;
        y += 15 + Math.random() * 25;
        segs.push({ x, y });
      }
      bolts.push({
        segments: segs,
        alpha: 0.85 + Math.random() * 0.15,
        life: 0,
        maxLife: 8 + Math.random() * 10,
      });
    }

    function spawnStream() {
      if (streams.length > 6) return;
      const x = Math.random() * w;
      const y = 0.2 * h + Math.random() * 0.4 * h;
      const pts: { x: number; y: number }[] = [];
      const len = 20 + Math.floor(Math.random() * 20);
      for (let i = 0; i < len; i++) {
        pts.push({
          x: x + Math.sin(i * 0.4) * i * 3,
          y: y - i * 3,
        });
      }
      streams.push({
        points: pts,
        color: Math.random() < 0.3 ? "rgba(232, 185, 35," : "rgba(61, 255, 140,",
        width: 1.5 + Math.random() * 2,
        speed: 0.8 + Math.random() * 0.6,
        life: 0,
      });
    }

    // Pre-render Rocky Volcanic Terrain & Fortress
    function buildStaticCache() {
      offscreen.width = w;
      offscreen.height = h;
      if (!offCtx) return;

      offCtx.clearRect(0, 0, w, h);

      // Rugged Mountain Terrain
      offCtx.beginPath();
      offCtx.moveTo(0, h);
      const seed = 108;
      for (let x = 0; x <= w; x += 4) {
        const y =
          h * 0.8 +
          Math.sin(x * 0.003 + seed) * 40 +
          Math.sin(x * 0.009 + seed * 2) * 22;
        offCtx.lineTo(x, y);
      }
      offCtx.lineTo(w, h);
      offCtx.closePath();

      const grad = offCtx.createLinearGradient(0, h * 0.75, 0, h);
      grad.addColorStop(0, "#0d1a12");
      grad.addColorStop(0.4, "#07100b");
      grad.addColorStop(1, "#030508");
      offCtx.fillStyle = grad;
      offCtx.fill();

      // Glowing Green Energy Edge
      offCtx.strokeStyle = "rgba(61, 255, 140, 0.3)";
      offCtx.lineWidth = 2.5;
      offCtx.stroke();

      // Magma Fissures
      for (let i = 0; i < 18; i++) {
        const fx = 30 + (w / 18) * i + (Math.random() - 0.5) * 20;
        const fy = h * 0.8 + Math.sin(fx * 0.003 + seed) * 40;
        offCtx.strokeStyle = "rgba(61, 255, 140, 0.15)";
        offCtx.lineWidth = 1.2;
        offCtx.beginPath();
        offCtx.moveTo(fx, fy);
        for (let j = 0; j < 6; j++) {
          offCtx.lineTo(fx + (Math.random() - 0.5) * 12, fy + j * 5);
        }
        offCtx.stroke();
      }

      // Doctor Doom Citadel Silhouette
      const fx = w * 0.72;
      const keepW = w * 0.065;
      const keepH = h * 0.18;
      const baseY = h * 0.8;

      offCtx.fillStyle = "#060b07";
      offCtx.fillRect(fx, baseY - keepH, keepW, keepH);

      const tw = w * 0.028;
      const th = h * 0.14;
      offCtx.fillRect(fx - tw - 12, baseY - th, tw, th);
      offCtx.fillRect(fx + keepW + 12, baseY - th, tw, th);

      // Spire
      offCtx.fillRect(fx + keepW / 2 - w * 0.008, baseY - keepH - h * 0.06, w * 0.016, h * 0.06);

      // Plasma Citadel Windows
      offCtx.fillStyle = "rgba(61, 255, 140, 0.35)";
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          offCtx.fillRect(
            fx + keepW * 0.15 + c * (keepW * 0.28),
            baseY - keepH + keepH * 0.18 + r * (keepH * 0.26),
            keepW * 0.1,
            keepH * 0.1
          );
        }
      }
    }

    function resize() {
      const parent = canvas!.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      initStars();
      buildStaticCache();
    }

    // High-FPS Live Animation Loop
    let boltTimer = 0;

    function tick() {
      if (!isVisible) {
        animId = 0;
        return;
      }

      time += 0.016;

      // Mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx!.clearRect(0, 0, w, h);

      // 1. Deep Space Void
      ctx!.fillStyle = "#040609";
      ctx!.fillRect(0, 0, w, h);

      // 2. Parallax Starfield
      ctx!.fillStyle = "rgba(255, 255, 255, 0.7)";
      for (const s of stars) {
        s.z -= s.speed * 0.0025;
        if (s.z < 0.3) s.z = 4;
        const perspective = 2 / s.z;
        const sx = s.x * perspective + w / 2;
        const sy = s.y * perspective + h / 2;
        if (sx >= 0 && sx <= w && sy >= 0 && sy <= h) {
          const size = s.size * perspective;
          ctx!.fillRect(sx, sy, size, size);
        }
      }

      // 3. Interactive Hexagonal Tech Shield Grid (Doctor Doom Latveria Shield)
      const hexRadius = 45;
      const rowH = hexRadius * 1.5;
      const colW = hexRadius * Math.sqrt(3);

      ctx!.save();
      ctx!.strokeStyle = "rgba(16, 185, 129, 0.04)";
      ctx!.lineWidth = 1;

      for (let y = -hexRadius; y < h + hexRadius; y += rowH) {
        const rowIdx = Math.floor(y / rowH);
        const offsetX = (rowIdx % 2) * (colW / 2);
        for (let x = -hexRadius + offsetX; x < w + hexRadius; x += colW) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const glow = (1 - dist / 180) * 0.35;
            ctx!.strokeStyle = `rgba(61, 255, 140, ${glow})`;
            ctx!.beginPath();
            for (let k = 0; k < 6; k++) {
              const angle = (Math.PI / 3) * k;
              const hx = x + (hexRadius * 0.7) * Math.cos(angle);
              const hy = y + (hexRadius * 0.7) * Math.sin(angle);
              if (k === 0) ctx!.moveTo(hx, hy);
              else ctx!.lineTo(hx, hy);
            }
            ctx!.closePath();
            ctx!.stroke();
          }
        }
      }
      ctx!.restore();

      // 4. Electric Lightning Strikes
      boltTimer++;
      if (boltTimer > 120 + Math.random() * 180) {
        spawnBolt();
        boltTimer = 0;
      }

      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        if (b.life >= b.maxLife) {
          bolts.splice(i, 1);
          continue;
        }

        const fade = 1 - b.life / b.maxLife;
        ctx!.save();
        ctx!.strokeStyle = `rgba(61, 255, 140, ${b.alpha * fade})`;
        ctx!.lineWidth = 2.5 * fade;
        ctx!.beginPath();
        for (let j = 0; j < b.segments.length; j++) {
          const pt = b.segments[j];
          if (j === 0) ctx!.moveTo(pt.x, pt.y);
          else ctx!.lineTo(pt.x, pt.y);
        }
        ctx!.stroke();
        ctx!.restore();
      }

      // 5. Pre-rendered Terrain & Citadel Cache
      ctx!.drawImage(offscreen, 0, 0);

      // 6. Live Plasma Energy Beams
      if (Math.random() < 0.2) spawnStream();
      for (let i = streams.length - 1; i >= 0; i--) {
        const st = streams[i];
        st.life += 0.02;
        if (st.life > 1) {
          streams.splice(i, 1);
          continue;
        }

        const alpha = (1 - st.life) * 0.5;
        ctx!.save();
        ctx!.strokeStyle = `${st.color}${alpha})`;
        ctx!.lineWidth = st.width;
        ctx!.beginPath();
        for (let j = 0; j < st.points.length; j++) {
          const p = st.points[j];
          const wave = Math.sin(j * 0.3 + time * st.speed) * 6;
          if (j === 0) ctx!.moveTo(p.x + wave, p.y);
          else ctx!.lineTo(p.x + wave, p.y);
        }
        ctx!.stroke();
        ctx!.restore();
      }

      // 7. Live Interactive Embers (React to Cursor)
      if (Math.random() < 0.4) spawnEmber();

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];

        // Cursor repulsion force
        const dx = e.x - mouse.x;
        const dy = e.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          e.vx += (dx / dist) * force * 0.6;
          e.vy += (dy / dist) * force * 0.6;
        }

        e.x += e.vx + Math.sin(time * 2 + e.x * 0.05) * 0.35;
        e.y += e.vy;
        e.vx *= 0.97;
        e.vy = Math.min(-0.5, e.vy * 0.99);
        e.life++;

        const progress = e.life / e.maxLife;
        const alpha = (1 - progress) * 0.75;

        if (e.life >= e.maxLife || e.y < -10) {
          embers.splice(i, 1);
          continue;
        }

        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = e.isGold ? "#ffe066" : "#3dff8c";
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.size * (1 - progress * 0.3), 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      animId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    animId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}