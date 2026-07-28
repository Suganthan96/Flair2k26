"use client";

import React from "react";
import DoomCosmos from "./DoomCosmos";
import { Vortex } from "./ui/vortex";
import { VantaCells } from "./ui/VantaCells";
import { VantaDots } from "./ui/VantaDots";
import { VantaTopology } from "./ui/VantaTopology";
import { VantaHalo } from "./ui/VantaHalo";
import { VantaNet } from "./ui/VantaNet";
import { VantaBirds } from "./ui/VantaBirds";
import { WebcamPixelGrid } from "./ui/webcam-pixel-grid";
import { useBackground } from "./BackgroundContext";

export default function SectionBackground() {
  const { theme } = useBackground();

  if (theme === "vortex") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Vortex
          backgroundColor="#040608"
          baseHue={150}
          particleCount={550}
          rangeY={160}
          baseSpeed={0.1}
          rangeSpeed={1.8}
          containerClassName="h-full w-full"
        />
      </div>
    );
  }

  if (theme === "vanta-cells") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaCells />
      </div>
    );
  }

  if (theme === "vanta-dots") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaDots />
      </div>
    );
  }

  if (theme === "vanta-topology") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaTopology />
      </div>
    );
  }

  if (theme === "vanta-halo") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaHalo />
      </div>
    );
  }

  if (theme === "vanta-net") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaNet />
      </div>
    );
  }

  if (theme === "vanta-birds") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaBirds />
      </div>
    );
  }

  if (theme === "webcam-grid") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="emerald"
          backgroundColor="#030303"
          mirror={true}
          gapRatio={0.05}
          invertColors={false}
          darken={0.6}
          borderColor="#ffffff"
          borderOpacity={0.06}
          className="w-full h-full"
        />
      </div>
    );
  }

  // Default / Original: DoomCosmos
  return <DoomCosmos />;
}
