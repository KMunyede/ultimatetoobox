"use client";

import React, { useState, useCallback } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { ScientificNumber, Tooltip } from "@utilitiessite/ui";
import { motion } from "framer-motion";

const CONSTANTS = {
  h: 6.626e-34,
  hbar: 1.054e-34,
  c: 3e8,
  G: 6.674e-11,
  k: 8.987e9,
  R: 8.314,
  g: 9.80665,
  earthMass: 5.972e24,
  solarMass: 1.989e30,
};

interface Variable {
  id: string;
  label: string;
  unit: string;
  units: { label: string; value: number }[];
}

interface Equation {
  id: string;
  name: string;
  formula: string;
  variables: Variable[];
  solve: (target: string, values: Record<string, number>) => number;
}

const MASS_UNITS = [
  { label: "kg", value: 1 },
  { label: "g", value: 0.001 },
  { label: "Earth masses", value: CONSTANTS.earthMass },
  { label: "Solar masses", value: CONSTANTS.solarMass },
];

const DIST_UNITS = [
  { label: "m", value: 1 },
  { label: "cm", value: 0.01 },
  { label: "mm", value: 0.001 },
  { label: "km", value: 1000 },
];

const LIBRARY: Record<string, Equation[]> = {
  Mechanics: [
    {
      id: "fma",
      name: "Newton's 2nd Law",
      formula: "F = m × a",
      variables: [
        { id: "F", label: "Force (F)", unit: "N", units: [{ label: "N", value: 1 }] },
        { id: "m", label: "Mass (m)", unit: "kg", units: MASS_UNITS },
        { id: "a", label: "Acceleration (a)", unit: "m/s²", units: [{ label: "m/s²", value: 1 }] },
      ],
      solve: (t, v) => (t === "F" ? v.m * v.a : t === "m" ? v.F / v.a : v.F / v.m),
    },
    {
      id: "ke",
      name: "Kinetic Energy",
      formula: "KE = ½mv²",
      variables: [
        { id: "KE", label: "Kinetic Energy (KE)", unit: "J", units: [{ label: "J", value: 1 }] },
        { id: "m", label: "Mass (m)", unit: "kg", units: MASS_UNITS },
        { id: "v", label: "Velocity (v)", unit: "m/s", units: [{ label: "m/s", value: 1 }, { label: "km/h", value: 1/3.6 }] },
      ],
      solve: (t, v) => (t === "KE" ? 0.5 * v.m * v.v ** 2 : t === "m" ? (2 * v.KE) / v.v ** 2 : Math.sqrt((2 * v.KE) / v.m)),
    },
  ],
  Thermodynamics: [
    {
      id: "gas",
      name: "Ideal Gas Law",
      formula: "PV = nRT",
      variables: [
        { id: "P", label: "Pressure (P)", unit: "Pa", units: [{ label: "Pa", value: 1 }, { label: "atm", value: 101325 }] },
        { id: "V", label: "Volume (V)", unit: "m³", units: [{ label: "m³", value: 1 }, { label: "L", value: 0.001 }] },
        { id: "n", label: "Moles (n)", unit: "mol", units: [{ label: "mol", value: 1 }] },
        { id: "T", label: "Temperature (T)", unit: "K", units: [{ label: "K", value: 1 }] },
        { id: "R", label: "Gas Constant (R)", unit: "J/mol·K", units: [{ label: "8.314", value: 8.314 }] },
      ],
      solve: (t, v) => {
        if (t === "P") return (v.n * v.R * v.T) / v.V;
        if (t === "V") return (v.n * v.R * v.T) / v.P;
        if (t === "n") return (v.P * v.V) / (v.R * v.T);
        if (t === "T") return (v.P * v.V) / (v.n * v.R);
        return 0;
      },
    },
  ],
  Electromagnetism: [
    {
      id: "ohms",
      name: "Ohm's Law",
      formula: "V = IR",
      variables: [
        { id: "V", label: "Voltage (V)", unit: "V", units: [{ label: "V", value: 1 }, { label: "mV", value: 0.001 }] },
        { id: "I", label: "Current (I)", unit: "A", units: [{ label: "A", value: 1 }, { label: "mA", value: 0.001 }] },
        { id: "R", label: "Resistance (R)", unit: "Ω", units: [{ label: "Ω", value: 1 }, { label: "kΩ", value: 1000 }] },
      ],
      solve: (t, v) => (t === "V" ? v.I * v.R : t === "I" ? v.V / v.R : v.V / v.I),
    },
  ],
};

export function EquationSolverClient({
  initialCategory,
  initialEquationId
}: {
  initialCategory?: string,
  initialEquationId?: string
}) {
  const [category, setCategory] = useState(initialCategory && LIBRARY[initialCategory] ? initialCategory : "Mechanics");
  const [equation, setEquation] = useState<Equation>(() => {
    if (initialEquationId) {
      const eq = LIBRARY[category].find(e => e.id === initialEquationId);
      if (eq) return eq;
    }
    return LIBRARY[category][0];
  });
  const [target, setTarget] = useState<string>(equation.variables[0].id);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [inputUnits, setInputUnits] = useState<Record<string, number>>({});
  const [result, setResult] = useState("");

  const { history, addEntry, clearHistory } = useHistory("equation-solver");

  const solve = useCallback(() => {
    const values: Record<string, number> = {};
    equation.variables.forEach(v => {
      if (v.id !== target) {
        values[v.id] = (inputs[v.id] || 0) * (inputUnits[v.id] || v.units[0].value);
      }
    });

    try {
      const res = equation.solve(target, values);
      const resStr = Number.isFinite(res) ? res.toExponential(4) : "Error";
      setResult(resStr);
      addEntry(`${equation.name} (Solve for ${target})`, resStr);
    } catch (e) {
      setResult("Error");
    }
  }, [equation, target, inputs, inputUnits, addEntry]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const firstEq = LIBRARY[cat][0];
    setEquation(firstEq);
    setTarget(firstEq.variables[0].id);
    setInputs({});
    setInputUnits({});
    setResult("");
  };

  const handleEquationChange = (eq: Equation) => {
    setEquation(eq);
    setTarget(eq.variables[0].id);
    setInputs({});
    setInputUnits({});
    setResult("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container max-w-5xl mx-auto space-y-6"
    >
      {/* Category Selection: Scrollable on mobile, flex on desktop */}
      <div className="flex overflow-x-auto pb-2 scrollbar-hide md:flex-wrap gap-2">
        {Object.keys(LIBRARY).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              category === cat
                ? "bg-brand-primary text-white shadow-md"
                : "bg-canvas-card border border-base text-text-muted hover:border-brand-primary hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Equation Sidebar: Horizontal on mobile, Vertical on Desktop */}
        <div className="md:col-span-4 lg:col-span-3 flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {LIBRARY[category].map((eq) => (
            <button
              key={eq.id}
              onClick={() => handleEquationChange(eq)}
              className={`p-4 rounded-2xl border text-left transition-all min-w-[200px] md:min-w-0 ${
                equation.id === eq.id
                  ? "bg-brand-primary/5 border-brand-primary shadow-sm"
                  : "bg-canvas-card border-base hover:border-brand-primary/50 shadow-sm"
              }`}
            >
              <div className="font-bold text-text-primary mb-1 truncate">{eq.name}</div>
              <div className="text-xs font-mono text-brand-primary">{eq.formula}</div>
            </button>
          ))}
        </div>

        {/* Solver Panel */}
        <div className="md:col-span-8 lg:col-span-9 bg-canvas-card border border-base rounded-[2rem] p-5 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Input Selection */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Solve for</label>
                <Tooltip content="Choose which variable you want the calculator to find" position="top" className="w-full">
                  <select
                    value={target}
                    title="Target Variable to Solve"
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-canvas-muted border border-base rounded-2xl px-4 py-3 text-lg font-black text-text-primary outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all cursor-pointer"
                  >
                    {equation.variables.map(v => (
                      <option key={v.id} value={v.id}>{v.label}</option>
                    ))}
                  </select>
                </Tooltip>
              </div>

              <div className="space-y-4">
                {equation.variables.filter(v => v.id !== target).map(v => (
                  <div key={v.id} className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">{v.label}</label>
                    <div className="flex gap-2">
                      <Tooltip content={`Enter the value for ${v.label}`} position="top" className="flex-1">
                        <input
                          type="number"
                          inputMode="decimal"
                          title={`${v.label} Input`}
                          value={inputs[v.id] || ""}
                          onChange={(e) => setInputs(prev => ({ ...prev, [v.id]: parseFloat(e.target.value) }))}
                          className="w-full bg-canvas-muted border border-base rounded-xl px-4 py-3 font-mono font-bold text-lg text-text-primary outline-none focus:border-brand-primary transition-colors"
                          placeholder="0.00"
                        />
                      </Tooltip>
                      {v.units.length > 1 && (
                        <Tooltip content="Choose unit of measurement" position="top">
                          <select
                            value={inputUnits[v.id] || v.units[0].value}
                            title={`${v.label} Unit Selection`}
                            onChange={(e) => setInputUnits(prev => ({ ...prev, [v.id]: parseFloat(e.target.value) }))}
                            className="bg-canvas-card border border-base rounded-xl px-3 py-3 text-sm font-bold text-text-secondary outline-none cursor-pointer"
                          >
                            {v.units.map(u => (
                              <option key={u.label} value={u.value}>{u.label}</option>
                            ))}
                          </select>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Tooltip content="Solve the equation for the target variable" position="bottom" className="w-full">
                <button
                  onClick={solve}
                  title="Run Solver"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-black py-4 rounded-2xl text-xl shadow-lg transition-all active:scale-95 mt-2"
                >
                  SOLVE EQUATION
                </button>
              </Tooltip>
            </div>

            {/* Right: Results Display */}
            <div className="flex flex-col gap-6">
              {result ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-brand-primary/5 rounded-[1.5rem] p-6 border border-brand-primary/10 flex flex-col justify-center items-center text-center h-full min-h-[200px]"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-3">Calculated {target}</div>
                  <div className="text-4xl md:text-5xl font-mono font-black text-text-primary tracking-tighter">
                    <ScientificNumber value={parseFloat(result)} suffix={equation.variables.find(v => v.id === target)?.unit} />
                  </div>
                </motion.div>
              ) : (
                <div className="bg-canvas-muted rounded-[1.5rem] p-6 border border-dashed border-base flex flex-col justify-center items-center text-center h-full min-h-[200px] text-text-muted">
                  <p className="text-sm font-medium">Enter values to see results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CalculatorDisplay
        expression=""
        result={result}
        history={history}
        onClearHistory={clearHistory}
        onRestore={() => {}}
      />
    </motion.div>
  );
}
