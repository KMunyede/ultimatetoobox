"use client";
import { useEffect } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";

type UnitType = "celsius" | "fahrenheit" | "kelvin";

export function TemperatureConverterClient({ defaultUnit1 = "celsius", defaultUnit2 = "fahrenheit" }: { defaultUnit1?: string, defaultUnit2?: string }) {
  const [state, setState] = useUrlState({
    val1: "0",
    unit1: defaultUnit1,
    val2: "32",
    unit2: defaultUnit2,
    activeInput: 1,
  });

  const { val1, unit1, val2, unit2, activeInput } = state as { val1: string, unit1: UnitType, val2: string, unit2: UnitType, activeInput: number };

  const toCelsius = (val: number, unit: UnitType) => {
    if (unit === "fahrenheit") return (val - 32) * 5/9;
    if (unit === "kelvin") return val - 273.15;
    return val;
  };

  const fromCelsius = (val: number, unit: UnitType) => {
    if (unit === "fahrenheit") return (val * 9/5) + 32;
    if (unit === "kelvin") return val + 273.15;
    return val;
  };

  useEffect(() => {
    if (activeInput !== 1) return;
    if (val1 === "") {
      setState({ val2: "" });
      return;
    }
    const num = parseFloat(val1);
    if (!isNaN(num)) {
      const c = toCelsius(num, unit1);
      const result = fromCelsius(c, unit2);
      setState({ val2: Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '') });
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
      const c = toCelsius(num, unit2);
      const result = fromCelsius(c, unit1);
      setState({ val1: Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '') });
    }
  }, [val2, unit1, unit2, activeInput]);

  const tourSteps = [
    { element: '#tour-temp-input1', popover: { title: '1. First Temperature', description: 'Enter a temperature and select its unit.' } },
    { element: '#tour-temp-input2', popover: { title: '2. Second Temperature', description: 'The converted temperature appears here. Change the unit to view it in another scale.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="temperature_converter" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          
          {/* Input 1 */}
          <div id="tour-temp-input1" className="flex-1 w-full flex flex-col gap-2">
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
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </div>

        {/* Icon */}
        <div className="hidden md:flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          <ArrowRightLeft size={24} />
        </div>
        
        {/* Input 2 */}
        <div id="tour-temp-input2" className="flex-1 w-full flex flex-col gap-2">
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
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </div>

        </div>
      </div>
    </div>
  );
}
