"use client";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";

export function PercentageClient() {
  const [state, setState] = useUrlState({
    p1: "20",
    v1: "150",
    p2_1: "30",
    p2_2: "150",
    v3_1: "50",
    v3_2: "75",
  });

  const { p1, v1, p2_1, p2_2, v3_1, v3_2 } = state as Record<string, string>;

  const res1 = (parseFloat(p1) / 100) * parseFloat(v1);
  const res2 = (parseFloat(p2_1) / parseFloat(p2_2)) * 100;
  const res3 = ((parseFloat(v3_2) - parseFloat(v3_1)) / parseFloat(v3_1)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 gap-8">
        {/* Section 1: X% of Y */}
        <div id="tour-perc-1" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">What is X% of Y?</h2>
          <div className="flex flex-wrap items-end gap-4">
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">What is</span>
            <div className="w-28">
              <NumberInput
                value={p1}
                onChange={v => setState({ p1: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">% of</span>
            <div className="w-36">
              <NumberInput
                value={v1}
                onChange={v => setState({ v1: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">?</span>
            <div className="flex-1 min-w-[120px] h-[46px] flex items-center justify-center bg-brand-primary/5 border border-brand-primary/20 rounded-lg shadow-inner mb-0.5">
              <span className="text-xl font-black text-brand-primary">{!isNaN(res1) ? res1.toFixed(2).replace(/\.?0+$/, '') : "0"}</span>
            </div>
          </div>
        </div>

        {/* Section 2: X is what % of Y? */}
        <div id="tour-perc-2" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">X is what % of Y?</h2>
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-36">
              <NumberInput
                value={p2_1}
                onChange={v => setState({ p2_1: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">is what % of</span>
            <div className="w-36">
              <NumberInput
                value={p2_2}
                onChange={v => setState({ p2_2: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">?</span>
            <div className="flex-1 min-w-[120px] h-[46px] flex items-center justify-center bg-brand-primary/5 border border-brand-primary/20 rounded-lg shadow-inner mb-0.5">
              <span className="text-xl font-black text-brand-primary">{!isNaN(res2) && isFinite(res2) ? res2.toFixed(2).replace(/\.?0+$/, '') + "%" : "0%"}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Percentage Change */}
        <div id="tour-perc-3" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Percentage Increase/Decrease</h2>
          <div className="flex flex-wrap items-end gap-4">
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">From</span>
            <div className="w-36">
              <NumberInput
                value={v3_1}
                onChange={v => setState({ v3_1: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">to</span>
            <div className="w-36">
              <NumberInput
                value={v3_2}
                onChange={v => setState({ v3_2: v })}
                className="text-xl font-black text-center"
              />
            </div>
            <span className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3.5">is a</span>
            <div className={`flex-1 min-w-[180px] h-[46px] flex items-center justify-center rounded-lg border-2 mb-0.5 ${res3 >= 0 ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/50 text-emerald-600" : "bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-800/50 text-rose-600"}`}>
              <span className="text-xl font-black uppercase tracking-tight">
                {!isNaN(res3) && isFinite(res3) ? `${res3 > 0 ? "+" : ""}${res3.toFixed(2).replace(/\.?0+$/, '')}%` : "0%"}
                <span className="ml-2 text-[10px] font-black uppercase">{res3 >= 0 ? "Increase" : "Decrease"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
