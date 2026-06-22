"use client";
import { useEffect } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

type UnitType = "celsius" | "fahrenheit" | "kelvin";

export function TemperatureConverterClient({ defaultUnit1, defaultUnit2 }: { defaultUnit1?: string, defaultUnit2?: string }) {
  const [state, setState] = useUrlState({
    val1: "0",
    unit1: (defaultUnit1 || "celsius") as UnitType,
    val2: "32",
    unit2: (defaultUnit2 || "fahrenheit") as UnitType,
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
  }, [val1, unit1, unit2, activeInput, setState]);

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
  }, [val2, unit1, unit2, activeInput, setState]);

  const tourSteps = [
    { element: '#tour-temp-input1', popover: { title: '1. First Temperature', description: 'Enter a temperature and select its unit.' } },
    { element: '#tour-temp-input2', popover: { title: '2. Second Temperature', description: 'The converted temperature appears here. Change the unit to view it in another scale.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-8 shadow-xl">
        <div className="flex flex-col @[600px]:flex-row items-center gap-5 @[600px]:gap-5">
          
          {/* Unit 1 */}
          <div id="tour-temp-input1" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">From</label>
            <div className="space-y-3">
              <input
                type="number"
                inputMode="decimal"
                className="w-full h-14 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                value={val1}
                onChange={(e) => setState({ activeInput: 1, val1: e.target.value })}
              />
              <select
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all capitalize"
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value as UnitType })}
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
            </div>
          </div>

          {/* Transfer Icon */}
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 @[600px]:rotate-0" />
          </div>

          {/* Unit 2 */}
          <div id="tour-temp-input2" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">To</label>
            <div className="space-y-3">
              <input
                type="number"
                inputMode="decimal"
                className="w-full h-14 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                value={val2}
                onChange={(e) => setState({ activeInput: 2, val2: e.target.value })}
              />
              <select
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all capitalize"
                value={unit2}
                onChange={(e) => setState({ activeInput: 1, unit2: e.target.value as UnitType })}
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
            </div>
          </div>

        </div>

        {/* Quick Result Summary */}
        <div className="mt-10 pt-8 border-t border-base text-center">
            <p className="text-text-secondary font-medium italic">
                {val1 || "0"}° {unit1} is equal to <span className="text-brand-primary font-black not-italic text-xl">{val2 || "0"}</span> {unit2}
            </p>
        </div>
      </div>
    </motion.div>
  );
}
