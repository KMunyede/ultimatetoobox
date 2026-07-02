"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Copy,
  Check,
  Trash2,
  Palette,
  ShieldCheck,
  History,
  Eye,
  Plus,
  X
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { NumberInput } from "../../../components/ui/NumberInput";

// --- Math Helpers ---

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const getRelativeLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (lum1: number, lum2: number) => {
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return (l1 + 0.05) / (l2 + 0.05);
};

const generatePalette = (h: number, s: number, l: number) => {
  const tints = [
    { h: (h + 180) % 360, s, l }, // Complementary
    { h: (h + 30) % 360, s, l },  // Analogous 1
    { h: (h - 30 + 360) % 360, s, l }, // Analogous 2
    { h: (h + 120) % 360, s, l }, // Triadic 1
    { h: (h - 120 + 360) % 360, s, l } // Triadic 2
  ];
  return tints.map(t => {
    const rgb = hslToRgb(t.h, t.s, t.l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });
};

export function ColorPickerTool() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: "59", g: "130", b: "246" });
  const [hsl, setHsl] = useState({ h: "217", s: "91", l: "60" });
  const [contrastColor, setContrastColor] = useState("#FFFFFF");
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("hilmost_color_history");
    if (saved) {
      try {
        setSavedColors(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load color history");
      }
    }
  }, []);

  // Update all formats when one changes
  const updateFromHex = (newHex: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(newHex)) return;
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    setRgb({ r: newRgb.r.toString(), g: newRgb.g.toString(), b: newRgb.b.toString() });
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    setHsl({ h: newHsl.h.toString(), s: newHsl.s.toString(), l: newHsl.l.toString() });
  };

  const updateFromRgb = (newRgbStrings: { r: string, g: string, b: string }) => {
    setRgb(newRgbStrings);
    const r = parseInt(newRgbStrings.r) || 0;
    const g = parseInt(newRgbStrings.g) || 0;
    const b = parseInt(newRgbStrings.b) || 0;
    const newHex = rgbToHex(r, g, b);
    setHex(newHex);
    const newHsl = rgbToHsl(r, g, b);
    setHsl({ h: newHsl.h.toString(), s: newHsl.s.toString(), l: newHsl.l.toString() });
  };

  const updateFromHsl = (newHslStrings: { h: string, s: string, l: string }) => {
    setHsl(newHslStrings);
    const h = parseInt(newHslStrings.h) || 0;
    const s = parseInt(newHslStrings.s) || 0;
    const l = parseInt(newHslStrings.l) || 0;
    const newRgb = hslToRgb(h, s, l);
    setRgb({ r: newRgb.r.toString(), g: newRgb.g.toString(), b: newRgb.b.toString() });
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(label);
    setTimeout(() => setCopyStatus(null), 1500);
  };

  const handleSaveColor = () => {
    const newSaved = [hex, ...savedColors.filter(c => c !== hex)].slice(0, 20);
    setSavedColors(newSaved);
    localStorage.setItem("hilmost_color_history", JSON.stringify(newSaved));
  };

  const clearHistory = () => {
    setSavedColors([]);
    localStorage.removeItem("hilmost_color_history");
  };

  const contrastRatio = useMemo(() => {
    const r = parseInt(rgb.r) || 0;
    const g = parseInt(rgb.g) || 0;
    const b = parseInt(rgb.b) || 0;
    const lum1 = getRelativeLuminance(r, g, b);
    const rgb2 = hexToRgb(contrastColor);
    const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
    return getContrastRatio(lum1, lum2);
  }, [rgb, contrastColor]);

  const palette = useMemo(() => {
    const h = parseInt(hsl.h) || 0;
    const s = parseInt(hsl.s) || 0;
    const l = parseInt(hsl.l) || 0;
    return generatePalette(h, s, l);
  }, [hsl]);

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-12">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-10">

        {/* 1. Visual Picker */}
        <section id="main-picker" className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#57544C] ml-1 mb-1.5 block">Visual Color Picker</label>
          <div className="relative group h-24">
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer border-none bg-transparent"
            />
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-4 border-white/20 ring-1 ring-black/5" />
          </div>
        </section>

        {/* 2. Format Inputs */}
        <section id="format-inputs" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* HEX */}
          <div className="space-y-1.5 w-full">
            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">HEX Code</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">#</span>
              <Input
                type="text"
                value={hex.replace("#", "")}
                maxLength={6}
                onChange={(e) => {
                    const val = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, "");
                    if (val.length === 6) updateFromHex(`#${val}`);
                    else setHex(`#${val}`);
                }}
                onBlur={() => {
                    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
                        updateFromRgb(rgb);
                    }
                }}
                className="pl-8"
              />
            </div>
          </div>

          {/* RGB */}
          <div className="space-y-1.5 w-full">
            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">RGB Values</label>
            <div className="grid grid-cols-3 gap-2">
              {(['r', 'g', 'b'] as const).map(k => (
                <NumberInput
                  key={k}
                  value={rgb[k]}
                  onChange={(val) => updateFromRgb({ ...rgb, [k]: val })}
                  min={0}
                  max={255}
                  className="text-center"
                />
              ))}
            </div>
          </div>

          {/* HSL */}
          <div className="space-y-1.5 w-full">
            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">HSL Values</label>
            <div className="grid grid-cols-3 gap-2">
              {(['h', 's', 'l'] as const).map(k => (
                <NumberInput
                  key={k}
                  value={hsl[k]}
                  onChange={(val) => updateFromHsl({ ...hsl, [k]: val })}
                  min={0}
                  max={k === 'h' ? 360 : 100}
                  className="text-center"
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. RGB Sliders */}
        <section className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-black text-red-500">R</span>
              <input
                type="range" min={0} max={255} value={parseInt(rgb.r) || 0}
                onChange={(e) => updateFromRgb({ ...rgb, r: e.target.value })}
                className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <span className="w-8 text-[10px] font-mono text-slate-400">{rgb.r}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-black text-emerald-500">G</span>
              <input
                type="range" min={0} max={255} value={parseInt(rgb.g) || 0}
                onChange={(e) => updateFromRgb({ ...rgb, g: e.target.value })}
                className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="w-8 text-[10px] font-mono text-slate-400">{rgb.g}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-black text-blue-500">B</span>
              <input
                type="range" min={0} max={255} value={parseInt(rgb.b) || 0}
                onChange={(e) => updateFromRgb({ ...rgb, b: e.target.value })}
                className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="w-8 text-[10px] font-mono text-slate-400">{rgb.b}</span>
            </div>
          </div>
        </section>

        {/* 4. Copy Buttons Row */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            onClick={() => handleCopy(hex, 'hex')}
            className="!py-3"
          >
            {copyStatus === 'hex' ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === 'hex' ? "Copied!" : "Copy HEX"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const r = parseInt(rgb.r) || 0;
              const g = parseInt(rgb.g) || 0;
              const b = parseInt(rgb.b) || 0;
              handleCopy(`rgb(${r}, ${g}, ${b})`, 'rgb');
            }}
            className="!py-3"
          >
            {copyStatus === 'rgb' ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === 'rgb' ? "Copied!" : "Copy RGB"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const h = parseInt(hsl.h) || 0;
              const s = parseInt(hsl.s) || 0;
              const l = parseInt(hsl.l) || 0;
              handleCopy(`hsl(${h}, ${s}%, ${l}%)`, 'hsl');
            }}
            className="!py-3"
          >
            {copyStatus === 'hsl' ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === 'hsl' ? "Copied!" : "Copy HSL"}
          </Button>
        </section>

        {/* 5. Color Preview */}
        <section className="relative h-32 rounded-3xl shadow-inner flex items-center justify-center overflow-hidden border-2 border-slate-100 dark:border-slate-800" style={{ backgroundColor: hex }}>
          <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: (parseInt(hsl.l) || 0) > 60 ? '#000000' : '#FFFFFF' }}>
            {hex}
          </span>
        </section>

        {/* 6. WCAG Contrast Checker */}
        <section id="wcag-checker" className="pt-10 border-t border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-brand-primary" />
            <h3 className="text-sm font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">Accessibility (WCAG 2.1)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="space-y-1.5 flex-1">
                  <Input
                    label="Compare With (Background)"
                    type="text"
                    value={contrastColor}
                    onChange={(e) => setContrastColor(e.target.value.toUpperCase())}
                    className="font-mono"
                  />
                </div>
                <input
                  type="color"
                  value={contrastColor}
                  onChange={(e) => setContrastColor(e.target.value.toUpperCase())}
                  className="h-[46px] w-16 rounded-lg cursor-pointer bg-transparent border border-[#D8D6CF] dark:border-slate-800"
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 text-center">
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">
                {contrastRatio.toFixed(2)}:1
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contrast Ratio</p>

              <div className="grid grid-cols-2 gap-2 mt-6">
                {([
                  { label: "AA Normal", pass: contrastRatio >= 4.5 },
                  { label: "AA Large", pass: contrastRatio >= 3 },
                  { label: "AAA Normal", pass: contrastRatio >= 7 },
                  { label: "AAA Large", pass: contrastRatio >= 4.5 },
                ] as const).map((check) => (
                  <div key={check.label} className={`py-1.5 px-2 rounded-lg text-[10px] font-black uppercase border-2 flex items-center justify-center gap-1.5 ${check.pass ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600' : 'border-red-500/20 bg-red-500/10 text-red-600 opacity-40'}`}>
                    {check.pass ? <Check size={10} /> : <X size={10} />}
                    {check.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Palette Generator */}
        <section className="pt-10 border-t border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette size={18} className="text-brand-primary" />
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">Harmonious Palette</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {palette.map((c, i) => (
              <button
                key={`${c}-${i}`}
                onClick={() => updateFromHex(c)}
                className="group relative flex flex-col items-center space-y-2"
              >
                <div className="w-full aspect-square rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform group-hover:scale-105 active:scale-95 overflow-hidden" style={{ backgroundColor: c }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <Eye size={16} className="text-white drop-shadow-md" />
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-brand-primary transition-colors uppercase">{c}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 8. Saved Colors / History */}
        <section className="pt-10 border-t border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={18} className="text-brand-primary" />
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-800 dark:text-slate-100">Color History</h3>
            </div>
            {savedColors.length > 0 && (
              <button onClick={clearHistory} className="text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-1.5">
                <Trash2 size={12} /> Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <button
                onClick={handleSaveColor}
                className="w-16 aspect-square rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-300 hover:border-brand-primary hover:text-brand-primary transition-all group"
            >
                <Plus size={20} className="group-active:scale-125 transition-transform" />
                <span className="text-[8.5px] font-black uppercase mt-1">Save</span>
            </button>

            {savedColors.map((c, i) => (
              <button
                key={`history-${c}-${i}`}
                onClick={() => updateFromHex(c)}
                className="group relative flex flex-col items-center space-y-2 animate-in fade-in zoom-in-90 duration-300"
              >
                <div className="w-16 aspect-square rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform group-hover:scale-105 active:scale-95" style={{ backgroundColor: c }} />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{c}</span>
              </button>
            ))}

            {savedColors.length === 0 && (
              <div className="flex-1 flex items-center justify-center py-10 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-slate-400 italic text-xs">
                No saved colors yet.
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none mt-12">
        <ShieldCheck size={12} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 100% Browser-Side processing. Privacy Guaranteed.</span>
      </div>
    </div>
  );
}
