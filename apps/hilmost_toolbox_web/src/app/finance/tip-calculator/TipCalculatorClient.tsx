"use client";
import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { Users, DollarSign, Percent } from "lucide-react";
import { NumberInput } from "../../../components/ui/NumberInput";

export function TipCalculatorClient() {
  const [state, setState] = useUrlState({
    bill: "120",
    tipPerc: "18",
    people: "4",
  });

  const { bill, tipPerc, people } = state as Record<string, string>;

  const B = parseFloat(bill) || 0;
  const T = parseFloat(tipPerc) || 0;
  const P = Math.max(1, parseInt(people) || 1);

  const totalTip = B * (T / 100);
  const totalBill = B + totalTip;
  const perPerson = totalBill / P;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div id="tour-tip-inputs" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 mb-2 ml-1">
                <DollarSign size={16} className="text-brand-primary" />
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Bill Amount</label>
            </div>
            <NumberInput
              value={bill}
              onChange={val => setState({ bill: val })}
              min={0}
              placeholder="e.g. 120"
              className="text-lg font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Percent size={16} className="text-brand-primary" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Tip %</label>
                </div>
                <NumberInput
                  value={tipPerc}
                  onChange={val => setState({ tipPerc: val })}
                  min={0}
                  max={100}
                  className="text-lg font-bold"
                />
            </div>
            <div id="tour-tip-split" className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2 ml-1">
                    <Users size={16} className="text-brand-primary" />
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Split</label>
                </div>
                <NumberInput
                  value={people}
                  onChange={val => setState({ people: val })}
                  min={1}
                  max={100}
                  className="text-lg font-bold"
                />
            </div>
          </div>
        </div>

        {/* Results */}
        <div id="tour-tip-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2 py-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Per Person</span>
            <div className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={perPerson} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Tip</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalTip} decimals={2} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bill</span>
                <p className="text-xl font-black text-slate-900 dark:text-white">$<NumberTicker value={totalBill} decimals={2} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
