"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";

export function PercentageClient() {
  const [state, setState] = useUrlState({
    p1: "20",
    v1: "150",
    p2_1: "30",
    p2_2: "150",
    v3_1: "50",
    v3_2: "75",
  });

  const { p1, v1, p2_1, p2_2, v3_1, v3_2 } = state;

  const res1 = (parseFloat(p1 as string) / 100) * parseFloat(v1 as string);
  const res2 = (parseFloat(p2_1 as string) / parseFloat(p2_2 as string)) * 100;
  const res3 = ((parseFloat(v3_2 as string) - parseFloat(v3_1 as string)) / parseFloat(v3_1 as string)) * 100;

  const tourSteps = [
    { element: '#tour-perc-1', popover: { title: '1. Basic Percentage', description: 'Find a percentage of a number (e.g. 20% of 150).' } },
    { element: '#tour-perc-2', popover: { title: '2. Percentage Value', description: 'Find what percentage one number is of another.' } },
    { element: '#tour-perc-3', popover: { title: '3. Percentage Change', description: 'Calculate the increase or decrease between two values.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="percentage_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Section 1: X% of Y */}
        <div id="tour-perc-1" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">What is X% of Y?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg font-medium text-text-secondary">What is</span>
            <input
              type="number"
              className="w-24 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={p1}
              onChange={e => setState({ p1: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">% of</span>
            <input
              type="number"
              className="w-32 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={v1}
              onChange={e => setState({ v1: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">?</span>
            <div className="flex-1 min-w-[120px] h-14 flex items-center justify-center bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
              <span className="text-2xl font-black text-brand-primary">{!isNaN(res1) ? res1.toFixed(2).replace(/\.?0+$/, '') : "0"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: X is what % of Y? */}
        <div id="tour-perc-2" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">X is what % of Y?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <input
              type="number"
              className="w-32 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={p2_1}
              onChange={e => setState({ p2_1: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">is what % of</span>
            <input
              type="number"
              className="w-32 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={p2_2}
              onChange={e => setState({ p2_2: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">?</span>
            <div className="flex-1 min-w-[120px] h-14 flex items-center justify-center bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
              <span className="text-2xl font-black text-brand-primary">{!isNaN(res2) && isFinite(res2) ? res2.toFixed(2).replace(/\.?0+$/, '') + "%" : "0%"}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Percentage Change */}
        <div id="tour-perc-3" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
          <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6">Percentage Increase/Decrease</h2>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg font-medium text-text-secondary">From</span>
            <input
              type="number"
              className="w-32 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={v3_1}
              onChange={e => setState({ v3_1: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">to</span>
            <input
              type="number"
              className="w-32 h-14 px-3 text-xl font-bold border border-base rounded-xl bg-canvas-muted text-text-primary text-center focus:ring-2 focus:ring-brand-primary/20 outline-none"
              value={v3_2}
              onChange={e => setState({ v3_2: e.target.value })}
            />
            <span className="text-lg font-medium text-text-secondary">is a</span>
            <div className={`flex-1 min-w-[150px] h-14 flex items-center justify-center rounded-xl border ${res3 >= 0 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-red-500/10 border-red-500/20 text-red-600"}`}>
              <span className="text-2xl font-black uppercase tracking-tighter">
                {!isNaN(res3) && isFinite(res3) ? `${res3 > 0 ? "+" : ""}${res3.toFixed(2).replace(/\.?0+$/, '')}%` : "0%"}
                <span className="ml-2 text-xs font-bold">{res3 >= 0 ? "Increase" : "Decrease"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
