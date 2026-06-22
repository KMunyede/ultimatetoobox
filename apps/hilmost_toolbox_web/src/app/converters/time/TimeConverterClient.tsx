"use client";
import { useEffect } from "react";
import { ToolTutorial, Tooltip } from "@utilitiessite/ui";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

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
  }, [val1, unit1, unit2, activeInput, setState]);

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
  }, [val2, unit1, unit2, activeInput, setState]);

  const tourSteps = [
    { element: '#tour-time-input1', popover: { title: '1. Base Time', description: 'Enter the amount of time and its unit.' } },
    { element: '#tour-time-input2', popover: { title: '2. Target Time', description: 'The equivalent amount of time appears here.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          
          {/* Unit 1 */}
          <div id="tour-time-input1" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">From</label>
            <div className="space-y-3">
              <Tooltip content="Enter the duration of time you want to convert" position="top">
                <input
                  type="number"
                  inputMode="decimal"
                  title="Source Time Duration"
                  className="w-full h-16 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                  value={val1}
                  onChange={(e) => setState({ activeInput: 1, val1: e.target.value })}
                />
              </Tooltip>
              <Tooltip content="Select the source time unit (e.g. hours, days)" position="bottom">
                <select
                  title="Select Source Time Unit"
                  className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all capitalize"
                  value={unit1}
                  onChange={(e) => setState({ activeInput: 1, unit1: e.target.value as UnitType })}
                >
                  {Object.keys(UNITS).map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </Tooltip>
            </div>
          </div>

          {/* Transfer Icon */}
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={24} className="rotate-90 md:rotate-0" />
          </div>

          {/* Unit 2 */}
          <div id="tour-time-input2" className="flex-1 w-full space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">To</label>
            <div className="space-y-3">
              <Tooltip content="The converted duration appears here" position="top">
                <input
                  type="number"
                  inputMode="decimal"
                  title="Target Time Duration"
                  className="w-full h-16 px-5 text-2xl font-bold border border-base rounded-2xl bg-canvas-muted text-text-primary focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                  value={val2}
                  onChange={(e) => setState({ activeInput: 2, val2: e.target.value })}
                />
              </Tooltip>
              <Tooltip content="Select the time unit you want to convert to" position="bottom">
                <select
                  title="Select Target Time Unit"
                  className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all capitalize"
                  value={unit2}
                  onChange={(e) => setState({ activeInput: 1, unit2: e.target.value as UnitType })}
                >
                  {Object.keys(UNITS).map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </Tooltip>
            </div>
          </div>

        </div>

        {/* Quick Result Summary */}
        <div className="mt-10 pt-8 border-t border-base text-center">
            <p className="text-text-secondary font-medium italic">
                {val1 || "0"} {unit1} is equal to <span className="text-brand-primary font-black not-italic text-xl">{val2 || "0"}</span> {unit2}
            </p>
        </div>
      </div>
    </motion.div>
  );
}
