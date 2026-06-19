"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { ScientificNumber } from "@utilitiessite/ui";

const CONSTANTS = {
  h: 6.626e-34,
  hbar: 1.054e-34,
  c: 3e8,
  G: 6.674e-11,
  k: 8.987e9, // Coulomb constant
  R: 8.314, // Ideal gas constant J/(mol*K)
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

const TIME_UNITS = [
  { label: "s", value: 1 },
  { label: "ms", value: 0.001 },
  { label: "min", value: 60 },
  { label: "hr", value: 3600 },
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
    {
      id: "pe",
      name: "Gravitational PE",
      formula: "PE = mgh",
      variables: [
        { id: "PE", label: "Potential Energy (PE)", unit: "J", units: [{ label: "J", value: 1 }] },
        { id: "m", label: "Mass (m)", unit: "kg", units: MASS_UNITS },
        { id: "h", label: "Height (h)", unit: "m", units: DIST_UNITS },
        { id: "g", label: "Gravity (g)", unit: "m/s²", units: [{ label: "Earth (9.81)", value: 9.80665 }] },
      ],
      solve: (t, v) => (t === "PE" ? v.m * v.g * v.h : t === "m" ? v.PE / (v.g * v.h) : t === "h" ? v.PE / (v.m * v.g) : v.PE / (v.m * v.h)),
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
  Relativity: [
    {
      id: "emc2",
      name: "Mass-Energy",
      formula: "E = mc²",
      variables: [
        { id: "E", label: "Energy (E)", unit: "J", units: [{ label: "J", value: 1 }] },
        { id: "m", label: "Mass (m)", unit: "kg", units: MASS_UNITS },
        { id: "c", label: "Light Speed (c)", unit: "m/s", units: [{ label: "299,792,458", value: 299792458 }] },
      ],
      solve: (t, v) => (t === "E" ? v.m * v.c ** 2 : v.E / v.c ** 2),
    },
  ],
};

export function EquationSolverClient() {
  const [category, setCategory] = useState("Mechanics");
  const [equation, setEquation] = useState<Equation>(LIBRARY["Mechanics"][0]);
  const [target, setTarget] = useState<string>(equation.variables[0].id);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [inputUnits, setInputUnits] = useState<Record<string, number>>({});
  const [result, setResult] = useState("");

  const { history, addEntry, clearHistory } = useHistory("equation-solver");

  const solve = useCallback(() => {
    const values: Record<string, number> = {};
    equation.variables.forEach(v => {
      if (v.id !== target) {
        values[v.id] = (inputs[v.id] || 0) * (inputUnits[v.id] || 1);
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
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(LIBRARY).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              category === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Equation Sidebar */}
        <div className="flex flex-col gap-3">
          {LIBRARY[category].map((eq) => (
            <button
              key={eq.id}
              onClick={() => handleEquationChange(eq)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                equation.id === eq.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500"
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white mb-1">{eq.name}</div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400">{eq.formula}</div>
            </button>
          ))}
        </div>

        {/* Solver Panel */}
        <div className="md:col-span-2 flex flex-col gap-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Solve for</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-lg font-bold text-slate-900 dark:text-white outline-none"
            >
              {equation.variables.map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            {equation.variables.filter(v => v.id !== target).map(v => (
              <div key={v.id} className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{v.label}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputs[v.id] || ""}
                    onChange={(e) => setInputs(prev => ({ ...prev, [v.id]: parseFloat(e.target.value) }))}
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 font-mono font-bold text-slate-900 dark:text-white outline-none"
                    placeholder="Enter value..."
                  />
                  {v.units.length > 1 && (
                    <select
                      value={inputUnits[v.id] || v.units[0].value}
                      onChange={(e) => setInputUnits(prev => ({ ...prev, [v.id]: parseFloat(e.target.value) }))}
                      className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 outline-none"
                    >
                      {v.units.map(u => (
                        <option key={u.label} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                  )}
                  {v.units.length === 1 && (
                    <span className="flex items-center px-3 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      {v.units[0].label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={solve}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl text-xl shadow-lg transition-all active:scale-95 mt-1"
          >
            SOLVE
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Calculated {target}</div>
          <div className="text-3xl md:text-4xl font-mono font-black">
            <ScientificNumber value={parseFloat(result)} className="text-white" suffix={equation.variables.find(v => v.id === target)?.unit} />
          </div>
        </div>
      )}

      {/* History Tape */}
      <div className="mt-4">
        <CalculatorDisplay
          expression=""
          result={result}
          history={history}
          onClearHistory={clearHistory}
          onRestore={() => {}}
        />
      </div>
    </div>
  );
}
