"use client";

import React, { useEffect, useRef, useState } from "react";

interface WebcamPixelGridProps {
  gridCols?: number;
  gridRows?: number;
  maxElevation?: number;
  motionSensitivity?: number;
  elevationSmoothing?: number;
  colorMode?: "webcam" | "emerald" | "monochrome";
  backgroundColor?: string;
  mirror?: boolean;
  gapRatio?: number;
  invertColors?: boolean;
  darken?: number;
  borderColor?: string;
  borderOpacity?: number;
  className?: string;
  onWebcamReady?: () => void;
  onWebcamError?: (error: any) => void;
}

export function WebcamPixelGrid({
  gridCols = 60,
  gridRows = 40,
  motionSensitivity = 0.25,
  elevationSmoothing = 0.2,
  colorMode = "webcam",
  backgroundColor = "#030303",
  mirror = true,
  gapRatio = 0.05,
  invertColors = false,
  darken = 0.6,
  borderColor = "#ffffff",
  borderOpacity = 0.06,
  className = "",
  onWebcamReady,
  onWebcamError,
}: WebcamPixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasWebcam, setHasWebcam] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let stream: MediaStream | null = null;
    let isSubscribed = true;

    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    videoRef.current = video;

    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = gridCols;
    sampleCanvas.height = gridRows;
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

    // Request Webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 320, height: 240, frameRate: 30 } })
        .then((mediaStream) => {
          if (!isSubscribed) return;
          stream = mediaStream;
          video.srcObject = mediaStream;
          video.onloadedmetadata = () => {
            video.play();
            setHasWebcam(true);
            if (onWebcamReady) onWebcamReady();
          };
        })
        .catch((err) => {
          if (onWebcamError) onWebcamError(err);
          setHasWebcam(false);
        });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let tick = 0;
    const smoothedElevations = new Float32Array(gridCols * gridRows);

    const render = () => {
      tick++;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, w, h);

      const cellW = w / gridCols;
      const cellH = h / gridRows;
      const gapX = cellW * gapRatio;
      const gapY = cellH * gapRatio;
      const drawW = cellW - gapX;
      const drawH = cellH - gapY;

      let pixelData: Uint8ClampedArray | null = null;

      if (hasWebcam && video.readyState === video.HAVE_ENOUGH_DATA && sampleCtx) {
        sampleCtx.save();
        if (mirror) {
          sampleCtx.translate(gridCols, 0);
          sampleCtx.scale(-1, 1);
        }
        sampleCtx.drawImage(video, 0, 0, gridCols, gridRows);
        sampleCtx.restore();
        const imgData = sampleCtx.getImageData(0, 0, gridCols, gridRows);
        pixelData = imgData.data;
      }

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const idx = r * gridCols + c;
          let red = 16;
          let green = 185;
          let blue = 129;
          let brightness = 0.5;

          if (pixelData) {
            const pIdx = idx * 4;
            red = pixelData[pIdx];
            green = pixelData[pIdx + 1];
            blue = pixelData[pIdx + 2];
            brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          } else {
            // Interactive Fallback Grid Animation
            const wave = Math.sin(c * 0.15 + tick * 0.05) * Math.cos(r * 0.15 + tick * 0.05);
            brightness = 0.3 + wave * 0.35;
          }

          if (invertColors) brightness = 1 - brightness;
          brightness *= 1 - darken;

          const targetElevation = brightness * motionSensitivity;
          smoothedElevations[idx] += (targetElevation - smoothedElevations[idx]) * elevationSmoothing;

          const x = c * cellW + gapX / 2;
          const y = r * cellH + gapY / 2;

          ctx.save();
          if (colorMode === "webcam" && pixelData) {
            ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${brightness})`;
          } else if (colorMode === "monochrome") {
            const val = Math.floor(brightness * 255);
            ctx.fillStyle = `rgba(${val}, ${val}, ${val}, 0.8)`;
          } else {
            // Default Emerald Theme
            ctx.fillStyle = `rgba(16, 185, 129, ${brightness + 0.15})`;
          }

          ctx.fillRect(x, y, drawW, drawH);

          if (borderOpacity > 0) {
            ctx.strokeStyle = borderColor;
            ctx.globalAlpha = borderOpacity;
            ctx.strokeRect(x, y, drawW, drawH);
          }
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      isSubscribed = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [
    backgroundColor,
    borderColor,
    borderOpacity,
    colorMode,
    darken,
    elevationSmoothing,
    gapRatio,
    gridCols,
    gridRows,
    hasWebcam,
    invertColors,
    mirror,
    motionSensitivity,
    onWebcamError,
    onWebcamReady,
  ]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
