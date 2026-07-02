"use client";
import { NumberTicker, Tooltip } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { PillSelector } from "../../../components/ui/PillSelector";
import { NumberInput } from "../../../components/ui/NumberInput";

export function BMIClient() {
  const [state, setState] = useUrlState({
    unitSystem: "metric",
    cm: "170",
    kg: "70",
    ft: "5",
    inch: "7",
    lbs: "154",
  });

  const { unitSystem, cm, kg, ft, inch, lbs } = state as {
    unitSystem: "metric" | "imperial";
    cm: string;
    kg: string;
    ft: string;
    inch: string;
    lbs: string;
  };

  let bmi: number | null = null;

  if (unitSystem === "metric") {
    const h = parseFloat(cm) / 100;
    const w = parseFloat(kg);
    if (h > 0 && w > 0) {
      bmi = w / (h * h);
    }
  } else {
    const hInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    const w = parseFloat(lbs);
    if (hInches > 0 && w > 0) {
      bmi = (w / (hInches * hInches)) * 703;
    }
  }

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (b < 25) return { label: "Normal weight", color: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" };
    if (b < 30) return { label: "Overweight", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <div id="tour-bmi-inputs" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-8">
        
        <PillSelector
          value={unitSystem}
          onChange={(val) => setState({ unitSystem: val })}
          options={[
            { label: "Metric", value: "metric" },
            { label: "Imperial", value: "imperial" },
          ]}
        />

        {unitSystem === "metric" ? (
          <div className="space-y-6">
            <NumberInput
              label="Height (cm)"
              value={cm}
              onChange={(val) => setState({ cm: val })}
              placeholder="e.g. 175"
              min={50}
              max={250}
            />
            <NumberInput
              label="Weight (kg)"
              value={kg}
              onChange={(val) => setState({ kg: val })}
              placeholder="e.g. 70"
              min={10}
              max={500}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1.5 w-full">
              <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">Height</label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <NumberInput
                     value={ft}
                     onChange={(val) => setState({ ft: val })}
                     placeholder="ft"
                     min={2}
                     max={8}
                  />
                  <span className="absolute right-4 bottom-3 text-slate-400 font-bold text-xs">ft</span>
                </div>
                <div className="flex-1 relative">
                  <NumberInput
                     value={inch}
                     onChange={(val) => setState({ inch: val })}
                     placeholder="in"
                     min={0}
                     max={11}
                  />
                  <span className="absolute right-4 bottom-3 text-slate-400 font-bold text-xs">in</span>
                </div>
              </div>
            </div>
            <NumberInput
              label="Weight (lbs)"
              value={lbs}
              onChange={(val) => setState({ lbs: val })}
              placeholder="e.g. 150"
              min={20}
              max={1000}
            />
          </div>
        )}
      </div>

      {/* Results */}
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        id="tour-bmi-results" 
        className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center min-h-[250px]"
      >
        {bmi !== null && !isNaN(bmi) && isFinite(bmi) ? (
          <>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Your BMI Score</div>
            <div className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
              <NumberTicker value={bmi} decimals={1} duration={0.8} />
            </div>
            {(() => {
              const cat = getCategory(bmi);
              return (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-8 py-3 rounded-full border-2 ${cat.bg} ${cat.border} ${cat.color} font-black text-xl md:text-2xl uppercase tracking-widest shadow-sm`}
                >
                  {cat.label}
                </motion.div>
              );
            })()}
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-slate-300">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-100 dark:border-slate-700">
                <span className="text-4xl font-black">?</span>
            </div>
            <p className="max-w-[200px] text-xs font-bold uppercase tracking-widest">Enter height and weight to reveal your BMI</p>
          </div>
        )}
      </motion.div>

      </div>
    </motion.div>
  );
}
