"use client";
import { useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";

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

  const unitOptions = [
    { label: "Celsius", value: "celsius" },
    { label: "Fahrenheit", value: "fahrenheit" },
    { label: "Kelvin", value: "kelvin" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col @[600px]:flex-row items-center gap-8">
          
          {/* Unit 1 */}
          <div id="tour-temp-input1" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">From</label>
            <div className="space-y-4">
              <NumberInput
                value={val1}
                onChange={(v) => setState({ activeInput: 1, val1: v })}
                className="text-2xl font-black"
              />
              <Select
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value as UnitType })}
                options={unitOptions}
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 @[600px]:rotate-0" />
          </div>

          {/* Unit 2 */}
          <div id="tour-temp-input2" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">To</label>
            <div className="space-y-4">
              <NumberInput
                value={val2}
                onChange={(v) => setState({ activeInput: 2, val2: v })}
                className="text-2xl font-black"
              />
              <Select
                value={unit2}
                onChange={(e) => setState({ activeInput: 1, unit2: e.target.value as UnitType })}
                options={unitOptions}
              />
            </div>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-bold italic uppercase tracking-widest text-sm">
                {val1 || "0"}° {unit1} is equal to <span className="text-brand-primary font-black not-italic text-xl">{val2 || "0"}</span> {unit2}
            </p>
        </div>
      </div>
    </motion.div>
  );
}
