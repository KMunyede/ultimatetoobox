"use client";

import React, { useState, useEffect } from "react";
import { Info, ChevronDown } from "lucide-react";

interface Preset {
  label: string;
  value: number;
}

interface ScientificInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  presets?: Preset[];
  units?: { label: string; value: number }[];
  defaultUnitMultiplier?: number;
}

export function ScientificInput({
  label,
  value,
  onChange,
  presets = [],
  units = [],
  defaultUnitMultiplier = 1,
}: ScientificInputProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(
    presets.find(p => Math.abs(p.value - value) < 1e-10 * Math.abs(value))?.label || (presets.length > 0 ? null : "Custom")
  );

  // Use strings for inputs to support empty states and partial typing
  const [coefStr, setCoefStr] = useState("");
  const [expStr, setExpStr] = useState("");
  const [currentUnitMult, setCurrentUnitMult] = useState(defaultUnitMultiplier);

  // Sync internal strings when value changes from outside (e.g. preset selection)
  useEffect(() => {
    const adjustedVal = value / currentUnitMult;
    if (adjustedVal === 0) {
      setCoefStr("0");
      setExpStr("0");
    } else {
      const eStr = adjustedVal.toExponential();
      const p = eStr.split("e");
      setCoefStr(parseFloat(p[0]).toFixed(3).replace(/\.?0+$/, ""));
      setExpStr(p[1].replace("+", ""));
    }
  }, [value, currentUnitMult]);

  useEffect(() => {
    if (selectedPreset && selectedPreset !== "Custom") {
      const preset = presets.find(p => p.label === selectedPreset);
      if (preset) {
        onChange(preset.value);
      }
    }
  }, [selectedPreset, presets, onChange]);

  const handleCustomChange = (newCoef: string, newExp: string, unitMult: number = currentUnitMult) => {
    setCoefStr(newCoef);
    setExpStr(newExp);
    const c = parseFloat(newCoef);
    const e = parseInt(newExp);
    if (!isNaN(c) && !isNaN(e)) {
      onChange(c * Math.pow(10, e) * unitMult);
    }
  };

  const handleUnitChange = (newMult: number) => {
    setCurrentUnitMult(newMult);
    const c = parseFloat(coefStr);
    const e = parseInt(expStr);
    if (!isNaN(c) && !isNaN(e)) {
      onChange(c * Math.pow(10, e) * newMult);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
        {selectedPreset === "Custom" && (
          <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-2 py-0.5 rounded-full">
            Custom
          </span>
        )}
      </div>

      {/* 1. Presets - Horizontal Scroll */}
      {presets.length > 0 && (
        <div className="flex overflow-x-auto pb-2 -mx-1 px-1 gap-1.5 no-scrollbar">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => setSelectedPreset(p.label)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all border-2 flex-shrink-0 ${
                selectedPreset === p.label
                  ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-200"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedPreset("Custom")}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all border-2 flex-shrink-0 ${
              selectedPreset === "Custom"
                ? "bg-brand-primary text-white border-brand-primary shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-200"
            }`}
          >
            Custom...
          </button>
        </div>
      )}

      {/* 2. Main Interaction Area */}
      <div className="flex flex-col gap-3">
        {selectedPreset !== "Custom" && selectedPreset !== null ? (
          /* Locked Display */
          <div className="w-full bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Info size={12} className="text-slate-300" />
            </div>
            <span className="text-2xl font-mono font-black text-brand-primary tracking-tighter">
              {coefStr} &times; 10<sup className="text-xs ml-0.5 font-bold">{expStr}</sup>
            </span>
          </div>
        ) : (
          /* Expanded Custom Form - ULTRA DENSITY FIX */
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            {/* Numerical Inputs */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <input
                type="text"
                inputMode="decimal"
                value={coefStr}
                onChange={(e) => handleCustomChange(e.target.value.replace(/[^0-9.-]/g, ""), expStr)}
                className="flex-1 min-w-[70px] bg-white dark:bg-slate-900 border border-[#D8D6CF] dark:border-slate-700 rounded-lg px-3 py-2 font-mono font-bold text-slate-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all text-base shadow-inner"
                placeholder="1.0"
              />
              <span className="text-slate-400 font-bold text-[10px] uppercase whitespace-nowrap shrink-0">
                &times; 10^
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={expStr}
                onChange={(e) => handleCustomChange(coefStr, e.target.value.replace(/[^0-9-]/g, ""))}
                className="w-14 sm:w-16 bg-white dark:bg-slate-900 border border-[#D8D6CF] dark:border-slate-700 rounded-lg px-2 py-2 font-mono font-bold text-slate-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all text-base text-center shadow-inner"
                placeholder="0"
              />
            </div>

            {/* Units Dropdown */}
            {units.length > 0 && (
              <div className="w-full sm:w-32 shrink-0">
                <div className="relative">
                   <select
                      value={currentUnitMult}
                      onChange={(e) => handleUnitChange(parseFloat(e.target.value))}
                      className="w-full bg-white dark:bg-slate-950 border border-[#D8D6CF] dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all appearance-none"
                    >
                      {units.map((u) => (
                        <option key={u.label} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
