"use client";

import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { ScientificInput } from "../../../components/calculators/ScientificInput";
import { useHistory } from "../../../hooks/useHistory";
import { ScientificNumber, Tooltip, NumericInput } from "@utilitiessite/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Terminal, FileJson, Check, MoonStar, ChevronDown } from "lucide-react";

const CONSTANTS = {
  G: 6.67430e-11,
  sigma: 5.67037e-8,
  H0: 70, // km/s/Mpc
  c: 299792458,
  earthMass: 5.972e24,
  solarMass: 1.989e30,
  jupiterMass: 1.898e27,
  saturnMass: 5.683e26,
  marsMass: 6.39e23,
  moonMass: 7.342e22,
  milkyWayMass: 2e41,
  earthMoonDist: 3.844e8,
  earthSunDist: 1.496e11,
  lightYear: 9.461e15,
  parsec: 3.086e16,
  solarLuminosity: 3.828e26,
};

const MASS_PRESETS = [
  { label: "Earth", value: CONSTANTS.earthMass },
  { label: "Sun", value: CONSTANTS.solarMass },
  { label: "Jupiter", value: CONSTANTS.jupiterMass },
  { label: "Saturn", value: CONSTANTS.saturnMass },
  { label: "Mars", value: CONSTANTS.marsMass },
  { label: "Moon", value: CONSTANTS.moonMass },
  { label: "Milky Way", value: CONSTANTS.milkyWayMass },
];

const DIST_PRESETS = [
  { label: "Earth–Moon", value: CONSTANTS.earthMoonDist },
  { label: "Earth–Sun (1 AU)", value: CONSTANTS.earthSunDist },
  { label: "1 Light-year", value: CONSTANTS.lightYear },
  { label: "1 Parsec", value: CONSTANTS.parsec },
  { label: "10 Parsecs", value: CONSTANTS.parsec * 10 },
];

const MASS_UNITS = [
  { label: "kg", value: 1 },
  { label: "Earth masses", value: CONSTANTS.earthMass },
  { label: "Solar masses", value: CONSTANTS.solarMass },
  { label: "Jupiter masses", value: CONSTANTS.jupiterMass },
];

const DIST_UNITS = [
  { label: "m", value: 1 },
  { label: "km", value: 1000 },
  { label: "AU", value: CONSTANTS.earthSunDist },
  { label: "Light-years", value: CONSTANTS.lightYear },
  { label: "Parsecs", value: CONSTANTS.parsec },
];

type CalcType = "gravity" | "orbital" | "escape" | "luminosity" | "hubble" | "schwarzschild" | "redshift";

const CALC_OPTIONS = [
  { value: "gravity", label: "Gravitational Force" },
  { value: "orbital", label: "Orbital Velocity" },
  { value: "escape", label: "Escape Velocity" },
  { value: "luminosity", label: "Luminosity (Stefan-Boltzmann)" },
  { value: "hubble", label: "Hubble Distance" },
  { value: "schwarzschild", label: "Schwarzschild Radius (Black Holes)" },
  { value: "redshift", label: "Redshift to Velocity" },
];

function formatHumanReadable(val: number, unit: string) {
  if (val === 0) return "0 " + unit;
  const absVal = Math.abs(val);

  const thresholds = [
    { value: 1e30, name: "nonillion" },
    { value: 1e27, name: "octillion" },
    { value: 1e24, name: "septillion" },
    { value: 1e21, name: "sextillion" },
    { value: 1e18, name: "quintillion" },
    { value: 1e15, name: "quadrillion" },
    { value: 1e12, name: "trillion" },
    { value: 1e9, name: "billion" },
    { value: 1e6, name: "million" },
  ];

  for (const t of thresholds) {
    if (absVal >= t.value) {
      return `≈ ${(val / t.value).toFixed(2)} ${t.name} ${unit}`;
    }
  }
  return `≈ ${val.toLocaleString()} ${unit}`;
}

export function AstrophysicsCalculatorClient({
  initialType
}: {
  initialType?: CalcType
}) {
  const [calcType, setCalcType] = useState<CalcType>(initialType || "gravity");
  const [val1, setVal1] = useState(CONSTANTS.earthMass.toString());
  const [val2, setVal2] = useState(CONSTANTS.solarMass.toString());
  const [val3, setVal3] = useState(CONSTANTS.earthSunDist.toString());

  const [result, setResult] = useState("");
  const [humanResult, setHumanResult] = useState("");
  const [lastLaTeX, setLastLaTeX] = useState("");
  const [lastPython, setLastPython] = useState("");
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isAstronomerMode, setIsAstronomerMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { history, addEntry, clearHistory } = useHistory("astrophysics");

  const calculate = useCallback(() => {
    let res = 0;
    let expr = "";
    let unit = "";
    let latex = "";
    let python = "";

    const v1 = parseFloat(val1) || 0;
    const v2 = parseFloat(val2) || 0;
    const v3 = parseFloat(val3) || 0;

    switch (calcType) {
      case "gravity":
        res = (CONSTANTS.G * v1 * v2) / Math.pow(v3, 2);
        expr = `G(${v1.toExponential(2)} * ${v2.toExponential(2)}) / ${v3.toExponential(2)}²`;
        unit = "newtons";
        latex = `F = G \\frac{m_1 m_2}{r^2} = ${res.toExponential(4)} \\text{ N}`;
        python = `G = 6.67430e-11\nm1 = ${v1}\nm2 = ${v2}\nr = ${v3}\nF = (G * m1 * m2) / (r**2)`;
        break;
      case "orbital":
        res = Math.sqrt((CONSTANTS.G * v1) / v3);
        expr = `√(G * ${v1.toExponential(2)} / ${v3.toExponential(2)})`;
        unit = "m/s";
        latex = `v_o = \\sqrt{\\frac{GM}{r}} = ${res.toExponential(4)} \\text{ m/s}`;
        python = `G = 6.67430e-11\nM = ${v1}\nr = ${v3}\nv_o = (G * M / r)**0.5`;
        break;
      case "escape":
        res = Math.sqrt((2 * CONSTANTS.G * v1) / v3);
        expr = `√(2 * G * ${v1.toExponential(2)} / ${v3.toExponential(2)})`;
        unit = "m/s";
        latex = `v_e = \\sqrt{\\frac{2GM}{r}} = ${res.toExponential(4)} \\text{ m/s}`;
        python = `G = 6.67430e-11\nM = ${v1}\nr = ${v3}\nv_e = (2 * G * M / r)**0.5`;
        break;
      case "luminosity":
        res = 4 * Math.PI * Math.pow(v1, 2) * CONSTANTS.sigma * Math.pow(v2, 4);
        expr = `4π * ${v1.toExponential(2)}² * σ * ${v2}⁴`;
        unit = "watts";
        latex = `L = 4\\pi R^2 \\sigma T^4 = ${res.toExponential(4)} \\text{ W}`;
        python = `import math\nsigma = 5.67037e-8\nR = ${v1}\nT = ${v2}\nL = 4 * math.pi * (R**2) * sigma * (T**4)`;
        break;
      case "hubble":
        res = v1 / CONSTANTS.H0;
        expr = `${v1} / H0`;
        unit = "megaparsecs";
        latex = `d = \\frac{v}{H_0} = ${res.toExponential(4)} \\text{ Mpc}`;
        python = `v = ${v1}\nH0 = 70\nd = v / H0`;
        break;
      case "schwarzschild":
        res = (2 * CONSTANTS.G * v1) / Math.pow(CONSTANTS.c, 2);
        expr = `(2 * G * ${v1.toExponential(2)}) / c²`;
        unit = "meters";
        latex = `R_s = \\frac{2GM}{c^2} = ${res.toExponential(4)} \\text{ m}`;
        python = `G = 6.67430e-11\nc = 299792458\nM = ${v1}\nRs = (2 * G * M) / (c**2)`;
        break;
      case "redshift":
        // simple v = c*z for low z
        res = v1 * CONSTANTS.c;
        expr = `${v1} * c`;
        unit = "m/s";
        latex = `v \\approx cz = ${res.toExponential(4)} \\text{ m/s}`;
        python = `c = 299792458\nz = ${v1}\nv = c * z`;
        break;
    }

    const resStr = res.toExponential(4);
    setResult(resStr);
    setHumanResult(formatHumanReadable(res, unit));
    setLastLaTeX(latex);
    setLastPython(python);
    addEntry(expr, resStr + " " + unit);
  }, [calcType, val1, val2, val3, addEntry]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`@container max-w-4xl mx-auto flex flex-col gap-6 transition-colors duration-500 ${isAstronomerMode ? 'astronomer-theme' : ''}`}
    >
      {/* Theme Toggle Header */}
      <div className="flex justify-end items-center gap-4 px-2">
        <div className="flex items-center gap-2 mr-auto">
          <div className={`w-2 h-2 rounded-full ${isAstronomerMode ? 'bg-red-500 animate-pulse' : 'bg-brand-primary'}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${isAstronomerMode ? 'text-red-500' : 'text-text-muted'}`}>
            {isAstronomerMode ? 'Red Night-Vision Active' : 'Daylight Mode'}
          </span>
        </div>

        <Tooltip content="Toggle Deep-Red interface for low-light observatory use" position="left">
          <button
            onClick={() => setIsAstronomerMode(!isAstronomerMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all active:scale-95 ${
              isAstronomerMode
                ? 'bg-red-950 text-red-500 border-red-900 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                : 'bg-white dark:bg-slate-900 border-border-base text-text-secondary hover:border-brand-primary'
            }`}
          >
            <MoonStar size={14} className={isAstronomerMode ? 'animate-pulse' : ''} />
            Astronomer Mode
          </button>
        </Tooltip>
      </div>

      <style jsx global>{`
        .astronomer-theme .bg-canvas-card { background-color: #0c0000 !important; border-color: #300000 !important; }
        .astronomer-theme .bg-canvas-muted { background-color: #1a0000 !important; border-color: #300000 !important; }
        .astronomer-theme .text-text-primary { color: #ff3333 !important; }
        .astronomer-theme .text-text-secondary { color: #cc0000 !important; }
        .astronomer-theme .text-text-muted { color: #880000 !important; }
        .astronomer-theme .bg-brand-primary { background-color: #660000 !important; color: #ff3333 !important; }
        .astronomer-theme input, .astronomer-theme select { color: #ff3333 !important; border-color: #440000 !important; }
        .astronomer-theme .border-border-base { border-color: #330000 !important; }
        .astronomer-theme .shadow-sm, .astronomer-theme .shadow-xl { box-shadow: 0 10px 15px -3px rgba(139, 0, 0, 0.1) !important; }
      `}</style>

      <div className="bg-canvas-card border border-border-base rounded-3xl p-5 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">

          {/* Controls Column (25% width) */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Calculation Type</label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-canvas-muted border border-border-base rounded-2xl px-4 py-3 flex items-center justify-between gap-2 text-left focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none shadow-inner group"
                >
                  <span className="text-base md:text-lg font-bold text-text-primary line-clamp-2 leading-tight">
                    {CALC_OPTIONS.find(opt => opt.value === calcType)?.label}
                  </span>
                  <ChevronDown size={20} className={`text-text-muted shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 bg-canvas-card border border-border-base rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {CALC_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setCalcType(option.value as CalcType);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 border-b border-border-base/50 last:border-0 ${
                              calcType === option.value
                                ? "bg-brand-primary/10 text-brand-primary"
                                : "text-text-secondary hover:bg-canvas-muted"
                            }`}
                          >
                            <span className="text-sm md:text-base font-bold whitespace-normal leading-snug">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <Tooltip content="Instantly compute the astrophysical result based on inputs" position="bottom" className="w-full">
              <button
                onClick={calculate}
                title="Run Calculation"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-black py-4 rounded-2xl text-xl shadow-lg transition-all active:scale-95"
              >
                CALCULATE
              </button>
            </Tooltip>
          </div>

          {/* Dynamic Inputs Column (75% width) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {calcType === "gravity" && (
              <>
                <ScientificInput label="Mass 1 (m1)" value={parseFloat(val1) || 0} onChange={v => setVal1(v.toString())} presets={MASS_PRESETS} units={MASS_UNITS} />
                <ScientificInput label="Mass 2 (m2)" value={parseFloat(val2) || 0} onChange={v => setVal2(v.toString())} presets={MASS_PRESETS} units={MASS_UNITS} />
                <ScientificInput label="Distance (r)" value={parseFloat(val3) || 0} onChange={v => setVal3(v.toString())} presets={DIST_PRESETS} units={DIST_UNITS} />
              </>
            )}
            {(calcType === "orbital" || calcType === "escape" || calcType === "schwarzschild") && (
              <>
                <ScientificInput label="Central Mass (M)" value={parseFloat(val1) || 0} onChange={v => setVal1(v.toString())} presets={MASS_PRESETS} units={MASS_UNITS} />
                {calcType !== "schwarzschild" && (
                   <ScientificInput label="Radius/Distance (r)" value={parseFloat(val3) || 0} onChange={v => setVal3(v.toString())} presets={DIST_PRESETS} units={DIST_UNITS} />
                )}
              </>
            )}
            {calcType === "luminosity" && (
              <>
                <ScientificInput label="Star Radius (R)" value={parseFloat(val1) || 0} onChange={v => setVal1(v.toString())} presets={DIST_PRESETS} units={DIST_UNITS} />
                <div className="flex flex-col gap-2 p-4 bg-canvas-muted border border-border-base rounded-2xl shadow-inner">
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Surface Temperature (T)</label>
                  <div className="flex items-center gap-3">
                    <Tooltip content="The effective temperature of the stellar body" position="top" className="flex-1">
                      <NumericInput
                        title="Surface Temperature Input"
                        value={val2}
                        onChange={val => setVal2(val)}
                        className="w-full bg-canvas-card border border-border-base rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-text-primary outline-none focus:border-brand-primary transition-colors"
                        placeholder="5778"
                      />
                    </Tooltip>
                    <span className="text-xs font-bold text-text-muted uppercase">Kelvin</span>
                  </div>
                </div>
              </>
            )}
            {calcType === "hubble" && (
              <div className="flex flex-col gap-2 p-4 bg-canvas-muted border border-border-base rounded-2xl shadow-inner">
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Recessional Velocity (v)</label>
                <div className="flex items-center gap-3">
                  <Tooltip content="The speed at which the object is moving away from the observer" position="top" className="flex-1">
                    <NumericInput
                      title="Recessional Velocity Input"
                      value={val1}
                      onChange={val => setVal1(val)}
                      className="w-full bg-canvas-card border border-border-base rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-text-primary outline-none focus:border-brand-primary transition-colors"
                      placeholder="1000"
                    />
                  </Tooltip>
                  <span className="text-xs font-bold text-text-muted uppercase">km/s</span>
                </div>
              </div>
            )}
            {calcType === "redshift" && (
              <div className="flex flex-col gap-2 p-4 bg-canvas-muted border border-border-base rounded-2xl shadow-inner">
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest ml-1">Redshift (z)</label>
                <div className="flex items-center gap-3">
                  <Tooltip content="The cosmological redshift value" position="top" className="flex-1">
                    <NumericInput
                      title="Redshift Input"
                      value={val1}
                      onChange={val => setVal1(val)}
                      className="w-full bg-canvas-card border border-border-base rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-text-primary outline-none focus:border-brand-primary transition-colors"
                      placeholder="0.1"
                    />
                  </Tooltip>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-brand-primary rounded-[2.5rem] p-4 md:p-5 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Calculated Result</div>
              <div className="text-3xl md:text-5xl font-mono font-black mb-1 tracking-tighter leading-none">
                <ScientificNumber value={parseFloat(result)} className="text-white" />
              </div>
              <div className="text-base font-medium opacity-90 italic">
                {humanResult}
              </div>
            </div>
          </motion.div>

          {/* Research Export Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Tooltip content="Copy formula and result for a research paper (LaTeX format)" position="bottom" className="w-full">
              <button
                onClick={() => copyToClipboard(lastLaTeX, 'latex')}
                className="w-full h-12 flex items-center justify-center gap-2.5 bg-white dark:bg-slate-900 border border-border-base rounded-xl text-xs font-black uppercase tracking-widest hover:border-brand-primary transition-all active:scale-95 shadow-sm"
              >
                {copiedType === 'latex' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copiedType === 'latex' ? 'LaTeX Copied!' : 'Copy for Paper (LaTeX)'}
              </button>
            </Tooltip>

            <Tooltip content="Copy code snippet for Python (AstroPy compatible)" position="bottom" className="w-full">
              <button
                onClick={() => copyToClipboard(lastPython, 'python')}
                className="w-full h-12 flex items-center justify-center gap-2.5 bg-white dark:bg-slate-900 border border-border-base rounded-xl text-xs font-black uppercase tracking-widest hover:border-brand-primary transition-all active:scale-95 shadow-sm"
              >
                {copiedType === 'python' ? <Check size={14} className="text-green-600" /> : <Terminal size={14} />}
                {copiedType === 'python' ? 'Python Copied!' : 'Copy as Python'}
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      {/* History Section */}
      <CalculatorDisplay
        expression=""
        result={result}
        history={history}
        onClearHistory={clearHistory}
        onRestore={(entry) => {
          setResult(entry.result);
        }}
      />
    </motion.div>
  );
}
