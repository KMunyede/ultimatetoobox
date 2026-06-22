"use client";

import React, { useState, useEffect } from "react";

interface Preset {
  label: string;
  value: number;
}

interface ScientificInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  presets?: Preset[];
  units: { label: string; value: number }[];
  defaultUnit?: number;
}

export function ScientificInput({
  label,
  value,
  onChange,
  presets = [],
  units,
  defaultUnit = 1,
}: ScientificInputProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(
    presets.find(p => Math.abs(p.value - value) < 1e-10 * Math.abs(value))?.label || (presets.length > 0 ? null : "Custom")
  );

  // Internal state for custom input
  const getInitialParts = () => {
    if (value === 0) return { coefficient: "0", exponent: "0" };
    const expStr = value.toExponential();
    const parts = expStr.split("e");
    return {
      coefficient: parseFloat(parts[0]).toFixed(3).replace(/\.?0+$/, ""),
      exponent: parts[1].replace("+", ""),
    };
  };

  const [parts, setParts] = useState(getInitialParts());
  const [currentUnit, setCurrentUnit] = useState(defaultUnit);

  useEffect(() => {
    if (selectedPreset && selectedPreset !== "Custom") {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        onChange(preset.value);
        const p = preset.value.toExponential().split("e");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParts({
          coefficient: parseFloat(p[0]).toFixed(3).replace(/\.?0+$/, ""),
          exponent: p[1].replace("+", ""),
        });
      }
    }
  }, [selectedPreset, presets, onChange]);

  const handleCustomChange = (newCoefficient: string, newExponent: string) => {
    setParts({ coefficient: newCoefficient, exponent: newExponent });
    const coef = parseFloat(newCoefficient);
    const exp = parseInt(newExponent);
    if (!isNaN(coef) && !isNaN(exp)) {
      onChange(coef * Math.pow(10, exp));
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <label className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{label}</label>

      {/* Preset Pills */}
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setSelectedPreset(p.label)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedPreset === p.label
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedPreset("Custom")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              selectedPreset === "Custom"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Custom...
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        {selectedPreset !== "Custom" && selectedPreset !== null ? (
          <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2 border border-dashed border-slate-200 dark:border-slate-700">
            <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">
              {parts.coefficient} &times; 10<sup className="text-xs ml-0.5">{parts.exponent}</sup>
            </span>
          </div>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              value={parts.coefficient}
              onChange={(e) => handleCustomChange(e.target.value, parts.exponent)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="1.0"
              step="0.001"
            />
            <span className="text-slate-400 font-bold">&times; 10^</span>
            <input
              type="number"
              value={parts.exponent}
              onChange={(e) => handleCustomChange(parts.coefficient, e.target.value)}
              className="w-24 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
          </div>
        )}

        <select
          value={currentUnit}
          onChange={(e) => setCurrentUnit(parseFloat(e.target.value))}
          className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-3 py-2 text-sm font-bold text-slate-700 dark:text-slate-300 outline-none"
        >
          {units.map((u) => (
            <option key={u.label} value={u.value}>{u.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
