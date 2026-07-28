"use client";

import React, { useState } from "react";
import { useBackground, THEME_OPTIONS, BackgroundTheme } from "./BackgroundContext";
import { Layers, ChevronDown, ChevronUp, Check, AlertCircle } from "lucide-react";

export default function BackgroundTesterToolbar() {
  const { theme, setTheme } = useBackground();
  const [isOpen, setIsOpen] = useState(true);

  const activeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div className="fixed bottom-6 right-6 z-[99999] max-w-sm select-none font-sans">
      {/* Container with Glassmorphism and Emerald Glow */}
      <div className="overflow-hidden rounded-2xl border border-emerald-500/40 bg-black/90 p-4 shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-xl transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-emerald-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Layers size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Background Tester
                </span>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-300 border border-amber-500/30">
                  Uncommitted
                </span>
              </div>
              <p className="text-[10px] text-white/50">
                Testing styles for all components (Excl. Home & Footer)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-950/60 text-emerald-400 transition hover:bg-emerald-800/60"
            title={isOpen ? "Minimize" : "Expand"}
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="mt-3 space-y-2">
            <p className="text-[11px] font-medium text-white/70">Select a background option:</p>

            <div className="space-y-1.5">
              {THEME_OPTIONS.map((opt) => {
                const isActive = opt.id === theme;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setTheme(opt.id as BackgroundTheme)}
                    className={`group flex w-full items-start justify-between rounded-xl border p-2.5 text-left transition-all duration-200 ${
                      isActive
                        ? "border-emerald-400 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "border-white/10 bg-black/40 hover:border-emerald-500/40 hover:bg-emerald-950/20"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold ${
                            isActive ? "text-emerald-300" : "text-white/80 group-hover:text-emerald-300"
                          }`}
                        >
                          {opt.badge}: {opt.name}
                        </span>
                      </div>
                      <p className="text-[10px] leading-tight text-white/50">
                        {opt.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-black">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-emerald-950/40 p-2 text-[10px] text-emerald-300/80 border border-emerald-900/30">
              <AlertCircle size={12} className="shrink-0 text-emerald-400" />
              <span>Click options above to see immediate changes on your screen!</span>
            </div>
          </div>
        )}

        {!isOpen && (
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-300">
              Active: {activeOption.badge} - {activeOption.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
