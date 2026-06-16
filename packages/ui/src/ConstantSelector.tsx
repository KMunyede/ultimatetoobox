"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

export interface UniversalConstant {
  name: string;
  symbol: string;
  value: string;
  unit: string;
}

export const UNIVERSAL_CONSTANTS: UniversalConstant[] = [
  { name: "Speed of Light", symbol: "c", value: "299792458", unit: "m/s" },
  { name: "Gravitational Constant", symbol: "G", value: "6.67430e-11", unit: "m³ kg⁻¹ s⁻²" },
  { name: "Planck Constant", symbol: "h", value: "6.62607015e-34", unit: "J·s" },
  { name: "Elementary Charge", symbol: "e", value: "1.602176634e-19", unit: "C" },
  { name: "Avogadro Constant", symbol: "N_A", value: "6.02214076e23", unit: "mol⁻¹" },
  { name: "Boltzmann Constant", symbol: "k", value: "1.380649e-23", unit: "J/K" },
  { name: "Ideal Gas Constant", symbol: "R", value: "8.314462618", unit: "J/(mol·K)" },
  { name: "Earth Mass", symbol: "M_⊕", value: "5.9722e24", unit: "kg" },
  { name: "Earth Radius", symbol: "R_⊕", value: "6371000", unit: "m" },
  { name: "Solar Mass", symbol: "M_☉", value: "1.98847e30", unit: "kg" },
  { name: "Pi", symbol: "π", value: "3.14159265359", unit: "" },
];

interface ConstantSelectorProps {
  onSelect: (value: string) => void;
}

export function ConstantSelector({ onSelect }: ConstantSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onSelect(val);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
        title="Insert Universal Constant"
      >
        <Sparkles size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Universal Constants</span>
          </div>
          <div className="max-h-64 overflow-y-auto no-scrollbar">
            {UNIVERSAL_CONSTANTS.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(c.value)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors group"
              >
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-medium text-slate-900 dark:text-slate-100">{c.name}</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-serif">{c.symbol}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  {c.value} {c.unit}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
