"use client";

import React, { useState, useCallback } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { ScientificInput } from "../../../components/calculators/ScientificInput";
import { useHistory } from "../../../hooks/useHistory";
import { ScientificNumber } from "@utilitiessite/ui";
import { motion } from "framer-motion";

const CONSTANTS = {
  G: 6.674e-11,
  sigma: 5.67e-8,
  H0: 70, // km/s/Mpc
  c: 3e8,
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

type CalcType = "gravity" | "orbital" | "escape" | "luminosity" | "hubble";

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
  const [val1, setVal1] = useState(CONSTANTS.earthMass);
  const [val2, setVal2] = useState(CONSTANTS.solarMass);
  const [val3, setVal3] = useState(CONSTANTS.earthSunDist);

  const [result, setResult] = useState("");
  const [humanResult, setHumanResult] = useState("");
  const { history, addEntry, clearHistory } = useHistory("astrophysics");

  const calculate = useCallback(() => {
    let res = 0;
    let expr = "";
    let unit = "";

    switch (calcType) {
      case "gravity":
        res = (CONSTANTS.G * val1 * val2) / Math.pow(val3, 2);
        expr = `G(${val1.toExponential(2)} * ${val2.toExponential(2)}) / ${val3.toExponential(2)}²`;
        unit = "newtons";
        break;
      case "orbital":
        res = Math.sqrt((CONSTANTS.G * val1) / val3);
        expr = `√(G * ${val1.toExponential(2)} / ${val3.toExponential(2)})`;
        unit = "m/s";
        break;
      case "escape":
        res = Math.sqrt((2 * CONSTANTS.G * val1) / val3);
        expr = `√(2 * G * ${val1.toExponential(2)} / ${val3.toExponential(2)})`;
        unit = "m/s";
        break;
      case "luminosity":
        res = 4 * Math.PI * Math.pow(val1, 2) * CONSTANTS.sigma * Math.pow(val2, 4);
        expr = `4π * ${val1.toExponential(2)}² * σ * ${val2}⁴`;
        unit = "watts";
        break;
      case "hubble":
        res = val1 / CONSTANTS.H0;
        expr = `${val1} / H0`;
        unit = "megaparsecs";
        break;
    }

    const resStr = res.toExponential(4);
    setResult(resStr);
    setHumanResult(formatHumanReadable(res, unit));
    addEntry(expr, resStr + " " + unit);
  }, [calcType, val1, val2, val3, addEntry]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container max-w-4xl mx-auto flex flex-col gap-6"
    >
      <div className="bg-canvas-card border border-border-base rounded-3xl p-5 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* Controls Column */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Calculation Type</label>
              <select
                value={calcType}
                onChange={(e) => setCalcType(e.target.value as CalcType)}
                className="w-full bg-canvas-muted border border-border-base rounded-2xl px-4 py-3 text-lg font-bold text-text-primary focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none cursor-pointer"
              >
                <option value="gravity">Gravitational Force</option>
                <option value="orbital">Orbital Velocity</option>
                <option value="escape">Escape Velocity</option>
                <option value="luminosity">Luminosity (Stefan-Boltzmann)</option>
                <option value="hubble">Hubble Distance</option>
              </select>
            </div>

            {/* Main Action Button */}
            <button
              onClick={calculate}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-black py-4 rounded-2xl text-xl shadow-lg transition-all active:scale-95"
            >
              CALCULATE
            </button>
          </div>

          {/* Dynamic Inputs Column */}
          <div className="flex flex-col gap-4">
            {calcType === "gravity" && (
              <>
                <ScientificInput label="Mass 1 (m1)" value={val1} onChange={setVal1} presets={MASS_PRESETS} units={MASS_UNITS} />
                <ScientificInput label="Mass 2 (m2)" value={val2} onChange={setVal2} presets={MASS_PRESETS} units={MASS_UNITS} />
                <ScientificInput label="Distance (r)" value={val3} onChange={setVal3} presets={DIST_PRESETS} units={DIST_UNITS} />
              </>
            )}
            {(calcType === "orbital" || calcType === "escape") && (
              <>
                <ScientificInput label="Central Mass (M)" value={val1} onChange={setVal1} presets={MASS_PRESETS} units={MASS_UNITS} />
                <ScientificInput label="Radius/Distance (r)" value={val3} onChange={setVal3} presets={DIST_PRESETS} units={DIST_UNITS} />
              </>
            )}
            {calcType === "luminosity" && (
              <>
                <ScientificInput label="Star Radius (R)" value={val1} onChange={setVal1} presets={DIST_PRESETS} units={DIST_UNITS} />
                <div className="flex flex-col gap-2 p-4 bg-canvas-muted border border-border-base rounded-2xl">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Surface Temperature (T)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={val2}
                      onChange={(e) => setVal2(parseFloat(e.target.value))}
                      className="flex-1 bg-canvas-card border border-border-base rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-text-primary outline-none focus:border-brand-primary transition-colors"
                      placeholder="5778"
                    />
                    <span className="text-xs font-bold text-text-muted uppercase">Kelvin</span>
                  </div>
                </div>
              </>
            )}
            {calcType === "hubble" && (
              <div className="flex flex-col gap-2 p-4 bg-canvas-muted border border-border-base rounded-2xl">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Recessional Velocity (v)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={val1}
                    onChange={(e) => setVal1(parseFloat(e.target.value))}
                    className="flex-1 bg-canvas-card border border-border-base rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-text-primary outline-none focus:border-brand-primary transition-colors"
                    placeholder="1000"
                  />
                  <span className="text-xs font-bold text-text-muted uppercase">km/s</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-brand-primary rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Calculated Result</div>
            <div className="text-4xl md:text-5xl font-mono font-black mb-3 tracking-tighter">
              <ScientificNumber value={parseFloat(result)} className="text-white" />
            </div>
            <div className="text-lg font-medium opacity-90 italic">
              {humanResult}
            </div>
          </div>
        </motion.div>
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
