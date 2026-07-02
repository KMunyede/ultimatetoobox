"use client";

import { NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";
import { NumberInput } from "../../../components/ui/NumberInput";
import { PillSelector } from "../../../components/ui/PillSelector";

export function VatTaxClient() {
  const [state, setState] = useUrlState({
    amount: "100",
    rate: "20",
    mode: "add",
  });

  const { amount, rate, mode } = state as Record<string, string>;

  const V = parseFloat(amount) || 0;
  const R = parseFloat(rate) || 0;

  let net = 0;
  let vat = 0;
  let gross = 0;

  if (mode === "add") {
    net = V;
    vat = V * (R / 100);
    gross = V + vat;
  } else {
    gross = V;
    net = V / (1 + R / 100);
    vat = gross - net;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="grid grid-cols-1 @[640px]:grid-cols-2 gap-8">
        {/* Form Column */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 @[400px]:p-8 space-y-8 shadow-sm h-fit">

          <PillSelector
            value={mode}
            onChange={v => setState({ mode: v })}
            options={[
              { label: "Add VAT", value: "add" },
              { label: "Remove VAT", value: "remove" },
            ]}
          />

          <div id="tour-vat-inputs" className="space-y-8">
            <NumberInput
              label={mode === 'add' ? 'Net Amount (Before Tax)' : 'Gross Amount (Total Price)'}
              value={amount}
              onChange={val => setState({ amount: val })}
              min={0}
              className="text-xl font-bold"
            />
            <NumberInput
              label="VAT / Sales Tax Rate (%)"
              value={rate}
              onChange={val => setState({ rate: val })}
              min={0}
              max={100}
              step={0.1}
              className="text-xl font-bold"
            />
          </div>
        </div>

        {/* Results Column */}
        <div id="tour-vat-results" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Grand Total</span>
            <div className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={gross} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Price</span>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  $<NumberTicker value={net} decimals={2} />
                </p>
            </div>
            <div className="text-center space-y-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax ({rate}%)</span>
                <p className="text-2xl font-black text-emerald-600 tracking-tight">
                  +<NumberTicker value={vat} decimals={2} />
                </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
