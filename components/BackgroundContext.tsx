"use client";

import React, { createContext, useContext, useState } from "react";

export type BackgroundTheme = "vortex" | "vanta-cells" | "vanta-dots" | "vanta-topology" | "vanta-halo" | "vanta-net" | "vanta-birds" | "webcam-grid" | "cosmos";

export interface ThemeOption {
  id: BackgroundTheme;
  name: string;
  badge: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "vortex",
    name: "Vortex Swirl",
    badge: "Option 1",
    description: "Aceternity UI 3D Quantum Particle Vortex Flow",
  },
  {
    id: "vanta-cells",
    name: "Vanta Cells",
    badge: "Option 2",
    description: "Vanta.js Living Bio-Organic Cells (color1: 0x2a8c, color2: 0x4fcc42)",
  },
  {
    id: "vanta-dots",
    name: "Vanta Dots",
    badge: "Option 3",
    description: "Vanta.js Interactive Dots Grid (color: 0x20ff83, color2: 0x39d385)",
  },
  {
    id: "vanta-topology",
    name: "Vanta Topology",
    badge: "Option 4",
    description: "Vanta.js Topographic Contour Lines (color: 0x15ac0d)",
  },
  {
    id: "vanta-halo",
    name: "Vanta Halo",
    badge: "Option 5",
    description: "Vanta.js Glowing 3D Quantum Energy Fog Halo (baseColor: 0x29ca62)",
  },
  {
    id: "vanta-net",
    name: "Vanta Net",
    badge: "Option 6",
    description: "Vanta.js 3D Geometric Constellation Net (color: 0x3fff52)",
  },
  {
    id: "vanta-birds",
    name: "Vanta Birds",
    badge: "Option 7",
    description: "Vanta.js 3D Flocking Birds (color1: 0x97214, color2: 0x315fd1)",
  },
  {
    id: "webcam-grid",
    name: "Webcam Pixel Grid",
    badge: "Option 8",
    description: "Interactive Live Motion/Webcam Pixel Grid Matrix",
  },
  {
    id: "cosmos",
    name: "Doom Cosmos",
    badge: "Original",
    description: "Interactive Hex Shield, Volcanic Citadel & Rising Embers",
  },
];

interface BackgroundContextType {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
}

const BackgroundContext = createContext<BackgroundContextType>({
  theme: "vortex",
  setTheme: () => {},
});

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<BackgroundTheme>("vortex");

  return (
    <BackgroundContext.Provider value={{ theme, setTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
