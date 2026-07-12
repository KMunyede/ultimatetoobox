"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { MoveRight, RefreshCw, Layout, Smartphone, Monitor, Square, Tv } from "lucide-react";

const COMMON_RATIOS = [
  { label: "1:1", w: 1, h: 1, icon: <Square size={14} />, desc: "Square (Instagram)" },
  { label: "16:9", w: 16, h: 9, icon: <Monitor size={14} />, desc: "Widescreen (HDTV)" },
  { label: "4:3", w: 4, h: 3, icon: <Tv size={14} />, desc: "Standard (Old TV)" },
  { label: "9:16", w: 9, h: 16, icon: <Smartphone size={14} />, desc: "Vertical (TikTok)" },
  { label: "21:9", w: 21, h: 9, icon: <Monitor size={14} />, desc: "Ultrawide" },
];

export function AspectRatioCalculatorClient() {
  const [origW, setOrigW] = useState("1920");
  const [origH, setOrigH] = useState("1080");
  const [newW, setNewW] = useState("1280");
  const [newH, setNewH] = useState("720");

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const simplifiedRatio = React.useMemo(() => {
    const w = parseInt(origW) || 0;
    const h = parseInt(origH) || 0;
    if (w === 0 || h === 0) return "0:0";
    const common = gcd(w, h);
    return `${w / common}:${h / common}`;
  }, [origW, origH]);

  const handleOrigChange = (w: string, h: string) => {
    setOrigW(w);
    setOrigH(h);
    const width = parseFloat(w) || 0;
    const height = parseFloat(h) || 0;
    const targetW = parseFloat(newW) || 0;
    if (width > 0 && height > 0 && targetW > 0) {
      setNewH(((targetW * height) / width).toFixed(0));
    }
  };

  const handleNewWChange = (val: string) => {
    setNewW(val);
    const w = parseFloat(origW) || 0;
    const h = parseFloat(origH) || 0;
    const nw = parseFloat(val) || 0;
    if (w > 0 && h > 0 && nw > 0) {
      setNewH(((nw * h) / w).toFixed(0));
    }
  };

  const handleNewHChange = (val: string) => {
    setNewH(val);
    const w = parseFloat(origW) || 0;
    const h = parseFloat(origH) || 0;
    const nh = parseFloat(val) || 0;
    if (w > 0 && h > 0 && nh > 0) {
      setNewW(((nh * w) / h).toFixed(0));
    }
  };

  const selectRatio = (w: number, h: number) => {
    setOrigW(w.toString());
    setOrigH(h.toString());
    const nw = parseFloat(newW) || 1280;
    setNewW(nw.toString());
    setNewH(((nw * h) / w).toFixed(0));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-5 my-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 space-y-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Original Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="Width (px)"
                value={origW}
                onChange={(val) => handleOrigChange(val, origH)}
                min={1}
              />
              <NumberInput
                label="Height (px)"
                value={origH}
                onChange={(val) => handleOrigChange(origW, val)}
                min={1}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Calculate New Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <NumberInput
                label="New Width"
                value={newW}
                onChange={handleNewWChange}
                min={1}
              />
              <NumberInput
                label="New Height"
                value={newH}
                onChange={handleNewHChange}
                min={1}
              />
            </div>
          </div>
        </div>

        {/* Results & Presets */}
        <div className="space-y-5">
          <div className="bg-brand-primary text-white rounded-3xl p-6 shadow-xl shadow-brand-primary/20 flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Simplified Ratio</span>
            <div className="text-6xl font-black tracking-tighter">
              {simplifiedRatio}
            </div>
            <p className="text-xs font-medium opacity-90">
              {origW} × {origH} pixels
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-[var(--color-border-base)] dark:border-slate-800 rounded-3xl p-4 md:p-5 shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Layout size={14} className="text-blue-500" />
              Common Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_RATIOS.map((ratio) => (
                <button
                  key={ratio.label}
                  onClick={() => selectRatio(ratio.w, ratio.h)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-brand-primary hover:bg-brand-primary/5 transition-all group text-left"
                >
                  <div className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-primary transition-colors">
                    {ratio.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{ratio.label}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{ratio.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
