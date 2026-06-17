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
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (b < 25) return { label: "Normal weight", color: "text-brand-primary", bg: "bg-brand-primary/10", border: "border-brand-primary/20" };
    if (b < 30) return { label: "Overweight", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "Obese", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
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
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="bmi_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Inputs */}
        <div id="tour-bmi-inputs" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm space-y-6 hover:shadow-md transition-shadow">
        
        {/* Unit Toggle */}
        <div className="flex p-1 bg-canvas-muted rounded-xl border border-base">
          <button
            onClick={() => setState({ unitSystem: "metric" })}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unitSystem === "metric" ? "bg-canvas-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
          >
            Metric
          </button>
          <button
            onClick={() => setState({ unitSystem: "imperial" })}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${unitSystem === "imperial" ? "bg-canvas-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
          >
            Imperial
          </button>
        </div>

        {unitSystem === "metric" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Height (cm)</label>
              <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-medium text-lg"
                value={cm}
                onChange={e => setState({ cm: e.target.value })}
                placeholder="e.g. 175"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Weight (kg)</label>
              <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-medium text-lg"
                value={kg}
                onChange={e => setState({ kg: e.target.value })}
                placeholder="e.g. 70"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Height</label>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                     type="number"
                     className="w-full h-14 px-4 pr-8 border border-base rounded-xl bg-canvas-muted text-text-primary focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-medium text-lg"
                     value={ft}
                     onChange={e => setState({ ft: e.target.value })}
                     placeholder="ft"
                  />
                  <span className="absolute right-4 top-4 text-text-muted font-bold text-sm">ft</span>
                </div>
                <div className="flex-1 relative">
                  <input
                     type="number"
                     className="w-full h-14 px-4 pr-10 border border-base rounded-xl bg-canvas-muted text-text-primary focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-medium text-lg"
                     value={inch}
                     onChange={e => setState({ inch: e.target.value })}
                     placeholder="in"
                  />
                  <span className="absolute right-4 top-4 text-text-muted font-bold text-sm">in</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Weight (lbs)</label>
              <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all font-medium text-lg"
                value={lbs}
                onChange={e => setState({ lbs: e.target.value })}
                placeholder="e.g. 150"
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        id="tour-bmi-results" 
        className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow min-h-[300px]"
      >
        {bmi !== null && !isNaN(bmi) && isFinite(bmi) ? (
          <>
            <div className="text-text-secondary font-medium mb-2">Your BMI is</div>
            <div className="text-7xl md:text-8xl font-black text-text-primary mb-8 tracking-tighter">
              <NumberTicker value={bmi} decimals={1} duration={0.8} />
            </div>
            {(() => {
              const cat = getCategory(bmi);
              return (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`px-8 py-3 rounded-full border ${cat.bg} ${cat.border} ${cat.color} font-bold text-xl md:text-2xl shadow-sm`}
                >
                  {cat.label}
                </motion.div>
              );
            })()}
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-text-muted">
            <div className="w-16 h-16 rounded-full bg-canvas-muted flex items-center justify-center border border-base">
                <span className="text-2xl font-bold">?</span>
            </div>
            <p className="max-w-[200px]">Enter your height and weight to see your BMI.</p>
          </div>
        )}
      </motion.div>

      </div>
    </motion.div>
  );
}
