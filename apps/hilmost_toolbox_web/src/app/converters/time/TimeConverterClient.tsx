"use client";
import { useEffect } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";

const UNITS = {
  milliseconds: 0.001,
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629800,
  years: 31557600,
};

type UnitType = keyof typeof UNITS;

export function TimeConverterClient() {
  const [state, setState] = useUrlState({
    val1: "1",
    unit1: "hours",
    val2: "60",
    unit2: "minutes",
    activeInput: 1,
  });

  const { val1, unit1, val2, unit2, activeInput } = state as { val1: string, unit1: UnitType, val2: string, unit2: UnitType, activeInput: number };

  useEffect(() => {
    if (activeInput !== 1) return;
    if (val1 === "") {
      setState({ val2: "" });
      return;
    }
    const num = parseFloat(val1);
    if (!isNaN(num)) {
      const inSeconds = num * UNITS[unit1];
      const result = inSeconds / UNITS[unit2];
      setState({ val2: Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '') });
    }
  }, [val1, unit1, unit2, activeInput]);

  useEffect(() => {
    if (activeInput !== 2) return;
    if (val2 === "") {
      setState({ val1: "" });
      return;
    }
    const num = parseFloat(val2);
    if (!isNaN(num)) {
      const inSeconds = num * UNITS[unit2];
      const result = inSeconds / UNITS[unit1];
      setState({ val1: Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '') });
    }
  }, [val2, unit1, unit2, activeInput]);

  const tourSteps = [
    { element: '#tour-time-input1', popover: { title: '1. Base Time', description: 'Enter the amount of time and its unit.' } },
    { element: '#tour-time-input2', popover: { title: '2. Target Time', description: 'The equivalent amount of time appears here.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="time_converter" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          
          {/* Input 1 */}
          <div id="tour-time-input1" className="flex-1 w-full flex flex-col gap-2">
          <input
            type="number"
            inputMode="decimal"
            className="w-full h-14 px-4 text-xl font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
            value={val1}
            onChange={(e) => {
              setState({ activeInput: 1, val1: e.target.value });
            }}
          />
          <select
            className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer capitalize transition-all hover:border-blue-400"
            value={unit1}
            onChange={(e) => {
              setState({ activeInput: 1, unit1: e.target.value as UnitType });
            }}
          >
            {Object.keys(UNITS).map(u => (
              <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Icon */}
        <div className="hidden md:flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <ArrowRightLeft size={24} />
        </div>
        
        {/* Input 2 */}
        <div id="tour-time-input2" className="flex-1 w-full flex flex-col gap-2">
          <input
            type="number"
            inputMode="decimal"
            className="w-full h-14 px-4 text-xl font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
            value={val2}
            onChange={(e) => {
              setState({ activeInput: 2, val2: e.target.value });
            }}
          />
          <select
            className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer capitalize transition-all hover:border-blue-400"
            value={unit2}
            onChange={(e) => {
              setState({ activeInput: 1, unit2: e.target.value as UnitType });
            }}
          >
            {Object.keys(UNITS).map(u => (
              <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
            ))}
          </select>
        </div>

        </div>
      </div>
    </div>
  );
}
