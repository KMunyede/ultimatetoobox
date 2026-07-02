"use client";

import React, { useState, useCallback } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { ScientificNumber } from "@utilitiessite/ui";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";

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
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [inputUnits, setInputUnits] = useState<Record<string, number>>({});
  const [result, setResult] = useState("");

  const { history, addEntry, clearHistory } = useHistory("equation-solver");

  const solve = useCallback(() => {
    const values: Record<string, number> = {};
    equation.variables.forEach(v => {
      if (v.id !== target) {
        const rawVal = inputs[v.id] || "";
        values[v.id] = (parseFloat(rawVal) || 0) * (inputUnits[v.id] || v.units[0].value);
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
      className="@container max-w-5xl mx-auto space-y-8 my-8"
    >
      <div className="flex overflow-x-auto pb-2 scrollbar-hide md:flex-wrap gap-3">
        {Object.keys(LIBRARY).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
              category === cat
                ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        <div className="md:col-span-4 lg:col-span-3 flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {LIBRARY[category].map((eq) => (
            <button
              key={eq.id}
              onClick={() => handleEquationChange(eq)}
              className={`p-4 rounded-2xl border-2 text-left transition-all min-w-[200px] md:min-w-0 ${
                equation.id === eq.id
                  ? "bg-brand-primary/5 border-brand-primary shadow-sm"
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-brand-primary/50 shadow-sm"
              }`}
            >
              <div className="font-black text-slate-900 dark:text-white mb-1 truncate uppercase text-xs tracking-tight">{eq.name}</div>
              <div className="text-[10px] font-mono text-brand-primary font-bold">{eq.formula}</div>
            </button>
          ))}
        </div>

        <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left: Input Selection */}
            <div className="space-y-8">
              <Select
                label="Solve for"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                options={equation.variables.map(v => ({ label: v.label, value: v.id }))}
              />

              <div className="space-y-6">
                {equation.variables.filter(v => v.id !== target).map(v => (
                  <div key={v.id} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <NumberInput
                        label={v.label}
                        value={inputs[v.id] || ""}
                        onChange={val => setInputs(prev => ({ ...prev, [v.id]: val }))}
                        placeholder="0.00"
                        className="text-lg font-mono font-bold"
                      />
                    </div>
                    {v.units.length > 1 && (
                      <div className="w-28">
                        <Select
                          value={inputUnits[v.id] || v.units[0].value}
                          onChange={(e) => setInputUnits(prev => ({ ...prev, [v.id]: parseFloat(e.target.value) }))}
                          options={v.units.map(u => ({ label: u.label, value: u.value.toString() }))}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={solve}
                className="w-full !py-4 rounded-2xl"
              >
                SOLVE EQUATION
              </Button>
            </div>

            {/* Right: Results Display */}
            <div className="flex flex-col gap-6">
              {result ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-brand-primary/5 rounded-[2rem] p-8 border border-brand-primary/10 flex flex-col justify-center items-center text-center h-full min-h-[250px] shadow-inner"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-4">Calculated {target}</div>
                  <div className="text-5xl md:text-6xl font-mono font-black text-slate-900 dark:text-white tracking-tighter">
                    <ScientificNumber value={parseFloat(result)} suffix={equation.variables.find(v => v.id === target)?.unit} />
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] p-8 border-2 border-dashed border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center h-full min-h-[250px] text-slate-400">
                  <p className="text-[10px] font-black uppercase tracking-widest">Enter values to compute result</p>
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
