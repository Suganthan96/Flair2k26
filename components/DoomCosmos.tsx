"use client";

import { useEffect, useRef } from "react";

// ============================================================
//  Doctor Doom — Live Moving Rugged Background Engine
//
//  Dynamic 2D canvas with live interactive elements:
//  - Deep obsidian volcanic night sky & parallax green starfield
//  - Drifting atmospheric energy fog & storm cloud haze
//  - Electric plasma arc bolts & lightning flashes
//  - Rugged cracked metallic terrain with pulsing green magma veins
//  - Doctor Doom fortress spire silhouette with glowing energy conduits
//  - 120+ rising green plasma embers & gold sparks reacting to mouse movement
// ============================================================

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  brightness: number;
}

interface StormCloud {
  x: number;
  y: number;
  w: number;
  h: number;
  alpha: number;
  drift: number;
  seed: number;
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
  baseX: number;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  glow: number;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function ridged(x: number, seed = 0) {
  const s1 = Math.sin(x * 0.7 + seed);
  const s2 = Math.sin(x * 1.3 + seed * 2.3) * 0.5;
  const s3 = Math.sin(x * 2.9 + seed * 5.7) * 0.25;
  return clamp(1 - Math.abs(s1 + s2 + s3), 0, 1);
}

export default function DoomCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationId = 0;
    let time = 0;

    // Mouse tracking for interactive live physics
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

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    /* Data pools */
    const stars: Star[] = [];
    const clouds: StormCloud[] = [];
    const bolts: LightningBolt[] = [];
    const streams: PlasmaStream[] = [];
    const embers: Ember[] = [];

    const terrainSeed = Math.random() * 1000;
    const crackSeed = Math.random() * 2000;

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: (Math.random() - 0.5) * w * 2,
          y: (Math.random() - 0.5) * h * 2,
          z: Math.random() * 5 + 0.5,
          size: 0.5 + Math.random() * 2,
          speed: 0.5 + Math.random() * 2,
          brightness: 0.3 + Math.random() * 0.7,
        });
      }
    }

    function initClouds() {
      clouds.length = 0;
      for (let i = 0; i < 14; i++) {
        clouds.push({
          x: Math.random() * w,
          y: 0.02 * h + Math.random() * 0.45 * h,
          w: 120 + Math.random() * 260,
          h: 40 + Math.random() * 80,
          alpha: 0.12 + Math.random() * 0.22,
          drift: -8 - Math.random() * 12,
          seed: Math.random() * 100,
        });
      }
    }

    function spawnBolt() {
      const startX = 0.1 * w + Math.random() * 0.8 * w;
      const startY = 0.05 * h + Math.random() * 0.3 * h;
      const segs: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let x = startX;
      let y = startY;
      const length = 10 + Math.floor(Math.random() * 16);
      const spread = 18 + Math.random() * 32;
      for (let i = 0; i < length; i++) {
        x += (Math.random() - 0.5) * spread;
        y += 18 + Math.random() * 32;
        segs.push({ x: clamp(x, 0, w), y: clamp(y, 0, h * 0.85) });
      }
      bolts.push({
        segments: segs,
        alpha: 0.8 + Math.random() * 0.2,
        life: 0,
        maxLife: 10 + Math.random() * 12,
      });
    }

    function spawnStream() {
      const x = Math.random() * w;
      const y = 0.2 * h + Math.random() * 0.5 * h;
      const pts: { x: number; y: number }[] = [];
      const len = 25 + Math.floor(Math.random() * 35);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      for (let i = 0; i < len; i++) {
        pts.push({
          x: x + Math.cos(angle + Math.sin(i * 0.4) * 0.6) * i * 3.5,
          y: y + Math.sin(angle + Math.cos(i * 0.4) * 0.6) * i * 2.5 - i * 2.5,
        });
      }
      const isGold = Math.random() < 0.2;
      streams.push({
        points: pts,
        color: isGold ? `rgba(232,185,35,` : `rgba(61,255,140,`,
        width: 1.5 + Math.random() * 2.5,
        speed: 0.6 + Math.random() * 0.8,
        life: 0,
      });
    }

    function spawnEmber() {
      const x = Math.random() * w;
      const terrainY = getTerrainHeight(x);
      const isGold = Math.random() < 0.25;
      embers.push({
        x,
        y: terrainY - 5 - Math.random() * 15,
        baseX: x,
        size: 1.5 + Math.random() * 3.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.5 + Math.random() * 2.2),
        life: 0,
        maxLife: 140 + Math.random() * 200,
        hue: isGold ? 45 + Math.random() * 15 : 130 + Math.random() * 40,
        glow: 1.2 + Math.random() * 2,
      });
    }

    let terrainCache: number[] = [];
    function getTerrainHeight(x: number): number {
      const idx = Math.round(x);
      if (terrainCache[idx]) return terrainCache[idx];
      const raw =
        0.82 * h +
        Math.sin(x * 0.002 + terrainSeed) * 45 +
        Math.sin(x * 0.005 + terrainSeed * 1.5) * 28 +
        Math.sin(x * 0.011 + terrainSeed * 3) * 14 +
        Math.sin(x * 0.023 + terrainSeed * 5) * 7;
      terrainCache[idx] = raw;
      return raw;
    }

    function getCrackedTerrainHeight(x: number): number {
      const base = getTerrainHeight(x);
      const crack = ridged(x * 0.008 + crackSeed, 42) * 20;
      return base + crack;
    }

    function resize() {
      const parent = canvas!.parentElement;
      w = parent?.clientWidth ?? window.innerWidth;
      h = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = w;
      canvas!.height = h;
      terrainCache = [];
      initStars();
      initClouds();
    }

    // ─── Drawing — Sky & Stars ─────────────────────────────
    function drawStars() {
      for (const s of stars) {
        const perspective = 2 / s.z;
        const sx = s.x * perspective + w / 2;
        const sy = s.y * perspective + h / 2;
        const size = s.size * perspective;

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue;

        const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed * 0.8 + s.brightness * 10);
        const alpha = s.brightness * (0.35 + 0.45 * twinkle);

        ctx!.globalAlpha = alpha;

        const grad = ctx!.createRadialGradient(sx, sy, 0, sx, sy, size * 3.5);
        grad.addColorStop(0, "rgba(255,255,255,0.4)");
        grad.addColorStop(0.3, "rgba(16,185,129,0.15)");
        grad.addColorStop(1, "rgba(16,185,129,0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(sx, sy, size * 3.5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.arc(sx, sy, size, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.globalAlpha = 1;
      }
    }

    // ─── Drawing — Storm Clouds & Volumetric Fog ────────────
    function drawClouds() {
      for (const c of clouds) {
        c.x += c.drift * 0.016;
        if (c.x + c.w < -80) c.x = w + 50;

        ctx!.save();
        ctx!.globalAlpha = c.alpha;

        const cy = c.y + c.h / 2;
        const lumps = 5;
        for (let i = 0; i < lumps; i++) {
          const lx = c.x + (c.w / lumps) * i + (c.w / lumps) * 0.3 * Math.sin(time * 0.12 + i * 3 + c.seed);
          const ly = cy + Math.sin(i * 1.7 + c.seed) * c.h * 0.35;
          const r = c.h * (0.5 + 0.5 * Math.sin(i * 0.9 + time * 0.08));
          const grad = ctx!.createRadialGradient(lx, ly, 0, lx, ly, r);
          grad.addColorStop(0, "rgba(10,35,20,0.85)");
          grad.addColorStop(0.5, "rgba(6,22,12,0.5)");
          grad.addColorStop(1, "rgba(5,12,8,0)");
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(lx, ly, r, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.restore();
      }
    }

    // ─── Drawing — Lightning Bolts ─────────────────────────
    function drawLightning() {
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.life++;
        if (b.life >= b.maxLife) {
          bolts.splice(i, 1);
          continue;
        }

        const fade = 1 - b.life / b.maxLife;
        const alpha = b.alpha * fade * fade;
        ctx!.save();
        ctx!.globalAlpha = alpha;

        // Outer glow bolt
        ctx!.strokeStyle = "#10b981";
        ctx!.lineWidth = 3.5 * fade + 0.5;
        ctx!.shadowColor = "#3dff3d";
        ctx!.shadowBlur = 24 * fade;
        ctx!.beginPath();
        for (let j = 0; j < b.segments.length; j++) {
          const s = b.segments[j];
          if (j === 0) ctx!.moveTo(s.x, s.y);
          else ctx!.lineTo(s.x, s.y);
        }
        ctx!.stroke();

        // Inner bright core
        ctx!.strokeStyle = "rgba(230,255,230,0.95)";
        ctx!.lineWidth = 1.5 * fade;
        ctx!.shadowBlur = 10 * fade;
        ctx!.beginPath();
        for (let j = 0; j < b.segments.length; j++) {
          const s = b.segments[j];
          if (j === 0) ctx!.moveTo(s.x, s.y);
          else ctx!.lineTo(s.x, s.y);
        }
        ctx!.stroke();

        ctx!.restore();
      }
    }

    // ─── Drawing — Rugged Metallic Volcanic Terrain ─────────
    function drawTerrain() {
      ctx!.save();

      // Terrain main body fill
      ctx!.beginPath();
      ctx!.moveTo(0, h);
      for (let x = 0; x <= w; x += 2) {
        const y = getCrackedTerrainHeight(x);
        ctx!.lineTo(x, y);
      }
      ctx!.lineTo(w, h);
      ctx!.closePath();

      const grad = ctx!.createLinearGradient(0, h * 0.7, 0, h);
      grad.addColorStop(0, "#0e1a12");
      grad.addColorStop(0.3, "#0a130d");
      grad.addColorStop(0.6, "#060b07");
      grad.addColorStop(1, "#030508");
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Glowing green top edge (emerald energy edge light)
      const edgePulse = 0.15 + 0.08 * Math.sin(time * 2);
      ctx!.strokeStyle = `rgba(16,185,129,${edgePulse})`;
      ctx!.lineWidth = 2.5;
      ctx!.shadowColor = "rgba(61,255,140,0.4)";
      ctx!.shadowBlur = 12;
      ctx!.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const y = getCrackedTerrainHeight(x);
        if (x === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();

      // Glowing magma fissures & energy cracks
      for (let i = 0; i < 28; i++) {
        const fx = 20 + Math.random() * (w - 40);
        const fy = getCrackedTerrainHeight(fx) - 2;
        const depth = 8 + Math.random() * 22;
        const alpha = 0.08 + 0.12 * Math.sin(time * 1.5 + i);
        ctx!.strokeStyle = `rgba(61,255,140,${alpha})`;
        ctx!.lineWidth = 1 + Math.random() * 2;
        ctx!.shadowColor = "rgba(61,255,140,0.3)";
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.moveTo(fx, fy);
        for (let j = 0; j < depth; j++) {
          ctx!.lineTo(fx + (Math.random() - 0.5) * 10, fy + j * 3.5);
        }
        ctx!.stroke();
      }

      ctx!.restore();
    }

    // ─── Drawing — Doctor Doom Fortress Silhouette ──────────
    function drawFortress() {
      const fx = w * 0.68;
      const baseY = getCrackedTerrainHeight(fx);
      ctx!.save();

      ctx!.fillStyle = "#070d08";
      ctx!.shadowColor = "rgba(16,185,129,0.12)";
      ctx!.shadowBlur = 8;

      // Central citadel keep
      const keepW = w * 0.065;
      const keepH = h * 0.19;
      ctx!.fillRect(fx, baseY - keepH, keepW, keepH);

      // Flanking bastions
      const tw = w * 0.028;
      const th = h * 0.15;
      ctx!.fillRect(fx - tw - w * 0.012, baseY - th, tw, th);
      ctx!.fillRect(fx + keepW + w * 0.012, baseY - th, tw, th);

      // Central Doom Spire
      const spireW = w * 0.016;
      const spireH = h * 0.07;
      ctx!.fillRect(fx + keepW / 2 - spireW / 2, baseY - keepH - spireH, spireW, spireH);

      // Battlements
      const notchCount = 7;
      const notchW = keepW / notchCount;
      for (let i = 0; i < notchCount; i += 2) {
        const nx = fx + i * notchW;
        const ny = baseY - keepH;
        ctx!.fillRect(nx, ny - h * 0.016, notchW * 0.75, h * 0.016);
      }

      // Doom Green Plasma Windows
      ctx!.shadowColor = "rgba(61,255,140,0.5)";
      ctx!.shadowBlur = 10;
      ctx!.fillStyle = "rgba(61,255,140,0.18)";
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const wx = fx + keepW * 0.14 + col * (keepW * 0.28);
          const wy = baseY - keepH + keepH * 0.16 + row * (keepH * 0.26);
          ctx!.fillRect(wx, wy, keepW * 0.09, keepH * 0.09);
        }
      }

      ctx!.restore();
    }

    // ─── Drawing — Live Plasma Beams ────────────────────────
    function drawPlasma(s: PlasmaStream) {
      s.life += 0.014;
      if (s.life > 1) return;

      const alpha = (1 - s.life) * 0.45;
      ctx!.save();
      ctx!.globalAlpha = alpha;

      ctx!.strokeStyle = `${s.color}${alpha})`;
      ctx!.lineWidth = s.width * (1 - s.life * 0.5);
      ctx!.shadowColor = `${s.color}${alpha * 0.6})`;
      ctx!.shadowBlur = 14;

      ctx!.beginPath();
      for (let i = 0; i < s.points.length; i++) {
        const p = s.points[i];
        const wave = Math.sin(i * 0.25 + time * s.speed) * 7;
        const x = p.x + wave;
        const y = p.y + Math.cos(i * 0.18 + time * s.speed) * 5;
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.stroke();

      ctx!.restore();
    }

    // ─── Drawing — Interactive Live Moving Embers ───────────
    function drawEmber(e: Ember) {
      const progress = e.life / e.maxLife;
      const alpha = (1 - progress) * 0.65;
      const size = e.size * (1 - progress * 0.25);

      ctx!.save();
      ctx!.globalAlpha = alpha;

      // Outer glow
      const grad = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, size * e.glow * 3.5);
      grad.addColorStop(0, `hsla(${e.hue}, 85%, 55%, ${alpha * 0.5})`);
      grad.addColorStop(0.5, `hsla(${e.hue}, 75%, 45%, ${alpha * 0.18})`);
      grad.addColorStop(1, `hsla(${e.hue}, 65%, 35%, 0)`);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(e.x, e.y, size * e.glow * 3.5, 0, Math.PI * 2);
      ctx!.fill();

      // Core spark
      ctx!.fillStyle = `hsla(${e.hue}, 95%, 65%, ${alpha * 0.85})`;
      ctx!.beginPath();
      ctx!.arc(e.x, e.y, size * 0.65, 0, Math.PI * 2);
      ctx!.fill();

      // White hot center point
      ctx!.fillStyle = `rgba(240,255,240,${alpha * 0.7})`;
      ctx!.beginPath();
      ctx!.arc(e.x, e.y, size * 0.25, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    // ─── Main Animation Loop ───────────────────────────────
    let streamTimer = 0;
    let emberTimer = 0;
    let boltTimer = 0;

    function tick() {
      time += 0.016;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx!.clearRect(0, 0, w, h);

      // Deep volcanic void background
      ctx!.fillStyle = "#040609";
      ctx!.fillRect(0, 0, w, h);

      // 1. Parallax Stars
      drawStars();

      // 2. Volumetric Clouds
      drawClouds();

      // 3. Electric Lightning Flash
      boltTimer++;
      if (boltTimer > 110 + Math.random() * 180) {
        spawnBolt();
        boltTimer = 0;
      }
      drawLightning();

      // 4. Rugged Volcanic Ground
      drawTerrain();

      // 5. Doctor Doom Fortress
      drawFortress();

      // 6. Live Plasma Streams
      streamTimer++;
      if (streamTimer > 45 + Math.random() * 70) {
        spawnStream();
        streamTimer = 0;
      }
      for (let i = streams.length - 1; i >= 0; i--) {
        if (streams[i].life > 1) {
          streams.splice(i, 1);
          continue;
        }
        drawPlasma(streams[i]);
      }

      // 7. Interactive Live Moving Embers (React to Mouse)
      emberTimer++;
      if (emberTimer > 2) {
        spawnEmber();
        emberTimer = 0;
      }
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];

        // Sinuous rising motion + mouse interaction force field
        const dx = e.x - mouse.x;
        const dy = e.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          e.vx += (dx / dist) * force * 0.8;
          e.vy += (dy / dist) * force * 0.8;
        }

        e.x += e.vx + Math.sin(e.life * 0.035 + e.baseX * 0.01) * 0.3;
        e.y += e.vy;
        e.vx *= 0.98;
        e.vy = Math.min(-0.4, e.vy * 0.992);
        e.life++;

        if (e.life >= e.maxLife || e.y < -20) {
          embers.splice(i, 1);
          continue;
        }
        drawEmber(e);
      }

      // 8. Update Starfield Parallax Z
      for (const s of stars) {
        s.z -= s.speed * 0.003;
        if (s.z < 0.3) {
          s.z = 5;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
        }
      }

      // Cap object pools
      if (streams.length > 14) streams.splice(0, streams.length - 14);
      if (embers.length > 90) embers.splice(0, embers.length - 90);

      animationId = requestAnimationFrame(tick);
    }

    resize();
    animationId = requestAnimationFrame(tick);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}