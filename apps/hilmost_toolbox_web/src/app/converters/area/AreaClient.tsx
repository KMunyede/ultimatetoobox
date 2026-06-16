"use client";

import { useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { ToolTutorial, CopyButton, Tooltip } from "@utilitiessite/ui";

import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

// Conversion rates relative to 1 Square Meter (m²)
export const AREA_UNITS: Record<string, number> = {
  "Square Meter": 1,
  "Square Kilometer": 1_000_000,
  "Square Centimeter": 0.0001,
  "Square Millimeter": 0.000001,
  "Hectare": 10_000,
  "Acre": 4046.8564224,
  "Square Foot": 0.09290304,
  "Square Inch": 0.00064516,
  "Square Yard": 0.83612736,
  "Square Mile": 2589988.110336,
};

export function AreaClient({ defaultFrom = "Square Foot", defaultTo = "Square Meter" }: { defaultFrom?: string, defaultTo?: string }) {
  const [state, setState] = useUrlState({
    val1: "1",
    unit1: defaultFrom,
    val2: "",
    unit2: defaultTo,
    activeInput: 1,
  });

  const { val1, unit1, val2, unit2, activeInput } = state as { val1: string; unit1: string; val2: string; unit2: string; activeInput: number };

  // Calculate top-to-bottom
  useEffect(() => {
    if (activeInput !== 1) return;
    if (val1 === "") {
      setState({ val2: "" });
      return;
    }
    const num = parseFloat(val1);
    if (!isNaN(num) && AREA_UNITS[unit1] && AREA_UNITS[unit2]) {
      const inBase = num * AREA_UNITS[unit1];
      const result = inBase / AREA_UNITS[unit2];
      // Format dynamically to avoid scientific notation for typical numbers
      const formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(10)).toString();
      setState({ val2: formatted });
    }
  }, [val1, unit1, unit2, activeInput, setState]);

  // Calculate bottom-to-top
  useEffect(() => {
    if (activeInput !== 2) return;
    if (val2 === "") {
      setState({ val1: "" });
      return;
    }
    const num = parseFloat(val2);
    if (!isNaN(num) && AREA_UNITS[unit1] && AREA_UNITS[unit2]) {
      const inBase = num * AREA_UNITS[unit2];
      const result = inBase / AREA_UNITS[unit1];
      const formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(10)).toString();
      setState({ val1: formatted });
    }
  }, [val2, unit1, unit2, activeInput, setState]);

  const handleSwap = () => {
    setState({
      unit1: unit2,
      unit2: unit1,
      val1: val2,
      val2: val1,
      activeInput: activeInput === 1 ? 2 : 1
    });
  };

  const tourSteps = [
    { element: '#tour-area-input1', popover: { title: '1. First Unit', description: 'Enter your area and select the unit you are converting from.' } },
    { element: '#tour-area-input2', popover: { title: '2. Target Unit', description: 'Select the unit you want to convert to. Type here to convert in reverse!' } },
    { element: '#tour-area-swap', popover: { title: '3. Swap Units', description: 'Click here to instantly swap the two units.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex justify-end gap-4 mb-4 md:mb-6">
        <ShareButton />
        <ToolTutorial tourId="area_converter" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="flex flex-col gap-4">
        <div id="tour-area-input1" className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">From</label>
          <Tooltip content="Enter starting area value" className="w-full">
            <input
              type="number"
              value={val1}
              onChange={(e) => setState({ val1: e.target.value, activeInput: 1 })}
              className="w-full bg-transparent text-2xl font-semibold text-slate-900 dark:text-white outline-none mb-4"
              placeholder="0"
            />
          </Tooltip>
          <Tooltip content="Select starting area unit">
            <select
              value={unit1}
              onChange={(e) => setState({ unit1: e.target.value, activeInput: 1 })}
              className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              {Object.keys(AREA_UNITS).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </Tooltip>
          <div className="flex items-center justify-between mt-3 text-sm">
            {val1 && !isNaN(Number(val1)) && (
              <span className="text-slate-500 font-mono">
                {Number(val1).toLocaleString(undefined, { maximumFractionDigits: 10 })} {unit1}
              </span>
            )}
            {val1 && <CopyButton value={val1} />}
          </div>
        </div>

        <div className="flex justify-center -my-2 z-10">
          <Tooltip content="Swap starting and target units">
            <button 
              id="tour-area-swap"
              onClick={handleSwap}
              className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              <ArrowRightLeft size={20} />
            </button>
          </Tooltip>
        </div>

        <div id="tour-area-input2" className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 transition-colors focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">To</label>
          <Tooltip content="Enter target area value for reverse conversion" className="w-full">
            <input
              type="number"
              value={val2}
              onChange={(e) => setState({ val2: e.target.value, activeInput: 2 })}
              className="w-full bg-transparent text-2xl font-semibold text-slate-900 dark:text-white outline-none mb-4"
              placeholder="0"
            />
          </Tooltip>
          <Tooltip content="Select target area unit">
            <select
              value={unit2}
              onChange={(e) => setState({ unit2: e.target.value, activeInput: 2 })}
              className="w-full bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-700 dark:text-slate-300 font-medium outline-none cursor-pointer"
            >
              {Object.keys(AREA_UNITS).map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </Tooltip>
          <div className="flex items-center justify-between mt-3 text-sm">
            {val2 && !isNaN(Number(val2)) && (
              <span className="text-slate-500 font-mono">
                {Number(val2).toLocaleString(undefined, { maximumFractionDigits: 10 })} {unit2}
              </span>
            )}
            {val2 && <CopyButton value={val2} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
