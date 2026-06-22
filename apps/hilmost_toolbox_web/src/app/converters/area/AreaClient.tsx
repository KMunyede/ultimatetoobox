"use client";
import { useEffect } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { ArrowRightLeft } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

const UNITS = {
  "square-meter": 1,
  "square-kilometer": 1000000,
  "square-centimeter": 0.0001,
  "square-millimeter": 0.000001,
  hectare: 10000,
  acre: 4046.85642,
  "square-foot": 0.09290304,
  "square-inch": 0.00064516,
  "square-yard": 0.83612736,
  "square-mile": 2589988.11,
};

type UnitType = keyof typeof UNITS;

export function AreaClient({ defaultFrom, defaultTo }: { defaultFrom?: string; defaultTo?: string }) {
  const sanitizeUnit = (u: string | undefined): UnitType => {
    if (!u) return "square-meter";
    const key = u.toLowerCase().replace(/ /g, '-');
    return (key in UNITS) ? (key as UnitType) : "square-meter";
  };

  const [state, setState] = useUrlState({
    val1: "1",
    unit1: sanitizeUnit(defaultFrom),
    val2: "",
    unit2: sanitizeUnit(defaultTo),
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
      const inBase = num * UNITS[unit1];
      const result = inBase / UNITS[unit2];
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
      const inBase = num * UNITS[unit2];
      const result = inBase / UNITS[unit1];
      setState({ val1: Number.isInteger(result) ? result.toString() : result.toFixed(6).replace(/\.?0+$/, '') });
    }
  }, [val2, unit1, unit2, activeInput, setState]);

  const formatUnitName = (u: string) => u.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const tourSteps = [
    { element: '#tour-area-input1', popover: { title: '1. Initial Area', description: 'Enter the area value and select its unit (e.g. square meters).' } },
    { element: '#tour-area-input2', popover: { title: '2. Result Area', description: 'The converted area appears here instantly.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="bg-canvas-card border border-base rounded-2xl p-5 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-5">

          {/* Unit 1 */}
          <div id="tour-area-input1" className="flex-1 w-full space-y-3">
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
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                value={unit1}
                onChange={(e) => setState({ activeInput: 1, unit1: e.target.value as UnitType })}
              >
                {Object.keys(UNITS).map(u => (
                  <option key={u} value={u}>{formatUnitName(u)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Transfer Icon */}
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-inner">
            <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
          </div>

          {/* Unit 2 */}
          <div id="tour-area-input2" className="flex-1 w-full space-y-3">
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
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-medium focus:ring-2 focus:ring-brand-primary/20 outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                value={unit2}
                onChange={(e) => setState({ activeInput: 1, unit2: e.target.value as UnitType })}
              >
                {Object.keys(UNITS).map(u => (
                  <option key={u} value={u}>{formatUnitName(u)}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Quick Result Summary */}
        <div className="mt-10 pt-8 border-t border-base text-center">
            <p className="text-text-secondary font-medium italic">
                {val1 || "0"} {formatUnitName(unit1)} equals <span className="text-brand-primary font-black not-italic text-xl">{val2 || "0"}</span> {formatUnitName(unit2)}
            </p>
        </div>
      </div>
    </motion.div>
  );
}
