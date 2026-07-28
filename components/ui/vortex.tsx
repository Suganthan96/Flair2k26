"use client";

import React, { useEffect, useRef } from "react";

// Fast, zero-dependency 3D Noise algorithm for Vortex particle field
function createSimplexNoise3D() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = Math.floor(Math.random() * 256);
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }

  const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ];

  return function noise3D(x: number, y: number, z: number): number {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    const s = (x + y + z) * F3;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const t = (i + j + k) * G3;
    const X0 = i - t;
    const Y0 = j - t;
    const Z0 = k - t;
    const x0 = x - X0;
    const y0 = y - Y0;
    const z0 = z - Z0;

    let i1: number, j1: number, k1: number;
    let i2: number, j2: number, k2: number;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2.0 * G3;
    const y2 = y0 - j2 + 2.0 * G3;
    const z2 = z0 - k2 + 2.0 * G3;
    const x3 = x0 - 1.0 + 3.0 * G3;
    const y3 = y0 - 1.0 + 3.0 * G3;
    const z3 = z0 - 1.0 + 3.0 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    if (t0 > 0) {
      t0 *= t0;
      const gi0 = (permMod12[(ii + (perm[(jj + (perm[kk & 255] || 0)) & 255] || 0)) & 255] || 0) % 12;
      const g0 = grad3[gi0];
      n0 = t0 * t0 * (g0[0] * x0 + g0[1] * y0 + g0[2] * z0);
    }
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    if (t1 > 0) {
      t1 *= t1;
      const gi1 = (permMod12[(ii + i1 + (perm[(jj + j1 + (perm[(kk + k1) & 255] || 0)) & 255] || 0)) & 255] || 0) % 12;
      const g1 = grad3[gi1];
      n1 = t1 * t1 * (g1[0] * x1 + g1[1] * y1 + g1[2] * z1);
    }
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    if (t2 > 0) {
      t2 *= t2;
      const gi2 = (permMod12[(ii + i2 + (perm[(jj + j2 + (perm[(kk + k2) & 255] || 0)) & 255] || 0)) & 255] || 0) % 12;
      const g2 = grad3[gi2];
      n2 = t2 * t2 * (g2[0] * x2 + g2[1] * y2 + g2[2] * z2);
    }
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    if (t3 > 0) {
      t3 *= t3;
      const gi3 = (permMod12[(ii + 1 + (perm[(jj + 1 + (perm[(kk + 1) & 255] || 0)) & 255] || 0)) & 255] || 0) % 12;
      const g3 = grad3[gi3];
      n3 = t3 * t3 * (g3[0] * x3 + g3[1] * y3 + g3[2] * z3);
    }

    return 32.0 * (n0 + n1 + n2 + n3);
  };
}

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export function Vortex({
  children,
  className = "",
  containerClassName = "",
  particleCount = 600,
  rangeY = 120,
  baseHue = 150, // Emerald Green theme default
  baseSpeed = 0.0,
  rangeSpeed = 1.6,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "#040608",
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise3D = createSimplexNoise3D();
    let animationFrameId: number;
    let tick = 0;

    const particlePropsLength = 9;
    const particleProps = new Float32Array(particleCount * particlePropsLength);

    const TAU = Math.PI * 2;
    const rand = (n: number) => n * Math.random();
    const randRange = (n: number) => n - rand(2 * n);
    const fadeInOut = (t: number, m: number) => {
      const hm = 0.5 * m;
      return Math.abs(((t + hm) % m) - hm) / hm;
    };

    let center: [number, number] = [0, 0];

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      center[0] = 0.5 * canvas.width;
      center[1] = 0.5 * canvas.height;
    };

    const initParticle = (i: number) => {
      const x = rand(canvas.width);
      const y = center[1] + randRange(rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = 100 + rand(200);
      const speed = baseSpeed + rand(rangeSpeed);
      const radius = baseRadius + rand(rangeRadius);
      const hue = baseHue + rand(40);

      particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const initParticles = () => {
      for (let i = 0; i < particlePropsLength * particleCount; i += particlePropsLength) {
        initParticle(i);
      }
    };

    const drawParticle = (
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) => {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue}, 85%, 60%, ${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    const updateParticle = (i: number) => {
      const x = particleProps[i];
      const y = particleProps[i + 1];
      const n = noise3D(x * 0.00125, y * 0.00125, tick * 0.0005) * TAU * 2;
      const vx = Math.cos(n);
      const vy = Math.sin(n);
      const life = particleProps[i + 4];
      const ttl = particleProps[i + 5];
      const speed = particleProps[i + 6];
      const radius = particleProps[i + 7];
      const hue = particleProps[i + 8];

      const x2 = x + vx * speed;
      const y2 = y + vy * speed;

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      particleProps[i] = x2;
      particleProps[i + 1] = y2;
      particleProps[i + 4] = life + 1;

      if (x2 > canvas.width || x2 < 0 || y2 > canvas.height || y2 < 0 || life > ttl) {
        initParticle(i);
      }
    };

    const render = () => {
      tick++;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlePropsLength * particleCount; i += particlePropsLength) {
        updateParticle(i);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resizeCanvas();
    initParticles();
    render();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    backgroundColor,
    baseHue,
    baseRadius,
    baseSpeed,
    particleCount,
    rangeRadius,
    rangeSpeed,
    rangeY,
  ]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      {children && <div className={`relative z-10 ${className}`}>{children}</div>}
    </div>
  );
}
