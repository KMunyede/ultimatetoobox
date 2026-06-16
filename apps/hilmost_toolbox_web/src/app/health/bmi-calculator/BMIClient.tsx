"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function BMIClient() {
  const [state, setState] = useUrlState({
    unitSystem: "metric",
    cm: "170",
    kg: "70",
    ft: "5",
    inch: "7",
    lbs: "154",
  });

  const { unitSystem, cm, kg, ft, inch, lbs } = state;

  let bmi: number | null = null;

  if (unitSystem === "metric") {
    const h = parseFloat(cm as string) / 100;
    const w = parseFloat(kg as string);
    if (h > 0 && w > 0) {
      bmi = w / (h * h);
    }
  } else {
    const hInches = (parseFloat(ft as string) || 0) * 12 + (parseFloat(inch as string) || 0);
    const w = parseFloat(lbs as string);
    if (hInches > 0 && w > 0) {
      bmi = (w / (hInches * hInches)) * 703;
    }
  }

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800" };
    if (b < 25) return { label: "Normal weight", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800" };
    if (b < 30) return { label: "Overweight", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20", border: "border-yellow-200 dark:border-yellow-800" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200 dark:border-red-800" };
  };

  const tourSteps = [
    { element: '#tour-bmi-inputs', popover: { title: '1. Enter Details', description: 'Input your height and weight. You can toggle between metric and imperial units.' } },
    { element: '#tour-bmi-results', popover: { title: '2. Your BMI', description: 'See your calculated BMI score and which health category it falls into.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="bmi_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <div id="tour-bmi-inputs" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow">
        
        {/* Unit Toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setState({ unitSystem: "metric" })}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${unitSystem === "metric" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Metric (kg, cm)
          </button>
          <button
            onClick={() => setState({ unitSystem: "imperial" })}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${unitSystem === "imperial" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            Imperial (lbs, ft)
          </button>
        </div>

        {unitSystem === "metric" ? (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Height (cm)</label>
              <input
                type="number"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
                value={cm}
                onChange={e => setState({ cm: e.target.value })}
                placeholder="e.g. 175"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Weight (kg)</label>
              <input
                type="number"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
                value={kg}
                onChange={e => setState({ kg: e.target.value })}
                placeholder="e.g. 70"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Height</label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                     type="number"
                     className="w-full h-12 px-4 pr-8 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
                     value={ft}
                     onChange={e => setState({ ft: e.target.value })}
                     placeholder="ft"
                  />
                  <span className="absolute right-3 top-3 text-slate-400">ft</span>
                </div>
                <div className="flex-1 relative">
                  <input
                     type="number"
                     className="w-full h-12 px-4 pr-10 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
                     value={inch}
                     onChange={e => setState({ inch: e.target.value })}
                     placeholder="in"
                  />
                  <span className="absolute right-3 top-3 text-slate-400">in</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Weight (lbs)</label>
              <input
                type="number"
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all hover:border-blue-400"
                value={lbs}
                onChange={e => setState({ lbs: e.target.value })}
                placeholder="e.g. 150"
              />
            </div>
          </>
        )}
      </div>

      {/* Results */}
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        id="tour-bmi-results" 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
      >
        {bmi !== null && !isNaN(bmi) && isFinite(bmi) ? (
          <>
            <div className="text-slate-500 dark:text-slate-400 font-medium mb-2">Your BMI is</div>
            <div className="text-6xl font-black text-slate-900 dark:text-white mb-6">
              <NumberTicker value={bmi} decimals={1} duration={0.8} />
            </div>
            {(() => {
              const cat = getCategory(bmi);
              return (
                <div className={`px-6 py-2 rounded-full border ${cat.bg} ${cat.border} ${cat.color} font-bold text-lg`}>
                  {cat.label}
                </div>
              );
            })()}
          </>
        ) : (
          <div className="text-slate-400 dark:text-slate-500">
            Enter your height and weight to see your BMI.
          </div>
        )}
      </motion.div>

      </div>
    </motion.div>
  );
}
