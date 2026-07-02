"use client";
import { useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { NumberInput } from "../../../components/ui/NumberInput";
import { Select } from "../../../components/ui/Select";
import { motion } from "framer-motion";

const UNITS = {
  bits: 0.125,
  bytes: 1,
  kilobytes: 1024,
  megabytes: Math.pow(1024, 2),
  gigabytes: Math.pow(1024, 3),
  terabytes: Math.pow(1024, 4),
  petabytes: Math.pow(1024, 5),
};

type UnitType = keyof typeof UNITS;

export function DataStorageClient() {
  const [state, setState] = useUrlState({
    val1: "1",
    unit1: "gigabytes",
    val2: "1024",
    unit2: "megabytes",
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
      const inBytes = num * UNITS[unit1];
      const result = inBytes / UNITS[unit2];
      setState({ val2: Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '') });
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
      const inBytes = num * UNITS[unit2];
      const result = inBytes / UNITS[unit1];
      setState({ val1: Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '') });
    }
  }, [val2, unit1, unit2, activeInput, setState]);

  const unitOptions = Object.keys(UNITS).map(u => ({ label: u.charAt(0).toUpperCase() + u.slice(1), value: u }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Input 1 */}
          <div id="tour-ds-input1" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">From</label>
            <div className="space-y-4">
              <NumberInput
                value={val1}
                onChange={(v) => setState({ activeInput: 1, val1: v })}
                className="text-2xl font-black"
                min={0}
              />
              <Select
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value as UnitType })}
                options={unitOptions}
              />
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>

          {/* Input 2 */}
          <div id="tour-ds-input2" className="flex-1 w-full space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">To</label>
            <div className="space-y-4">
              <NumberInput
                value={val2}
                onChange={(v) => setState({ activeInput: 2, val2: v })}
                className="text-2xl font-black"
                min={0}
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
                {val1 || "0"} {unit1} equals <span className="text-brand-primary font-black not-italic text-xl">{val2 || "0"}</span> {unit2}
            </p>
        </div>
      </div>
    </motion.div>
  );
}
