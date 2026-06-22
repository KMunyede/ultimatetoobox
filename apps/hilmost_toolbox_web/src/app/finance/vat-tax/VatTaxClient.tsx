"use client";

import { NumberTicker, ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { motion } from "framer-motion";

export function VatTaxClient() {
  const [state, setState] = useUrlState({
    amount: "100",
    rate: "20",
    mode: "add",
  });

  const { amount, rate, mode } = state;

  const V = parseFloat(amount as string) || 0;
  const R = parseFloat(rate as string) || 0;

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

  const tourSteps = [
    { element: '#tour-vat-mode', popover: { title: '1. Select Mode', description: 'Decide if you are adding tax to a price or removing it from a total.' } },
    { element: '#tour-vat-inputs', popover: { title: '2. Values', description: 'Enter the base amount and the specific tax percentage.' } },
    { element: '#tour-vat-results', popover: { title: '3. Breakdown', description: 'See the exact split between net, tax, and the final total.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >
      {/* Internal Tutorial Row */}
      <div className="flex justify-end mb-2">
        <ToolTutorial tourId="vat_calc_internal" steps={tourSteps} />
      </div>

      <div className="grid grid-cols-1 @[640px]:grid-cols-2 gap-5 md:gap-8">
        {/* Form Column */}
        <div className="bg-canvas-card border border-border-base rounded-[2rem] p-6 @[400px]:p-8 space-y-8 shadow-sm hover:shadow-md transition-all">

          {/* Mode Switcher - Large Tap Targets */}
          <div id="tour-vat-mode" className="flex p-1.5 bg-canvas-muted rounded-2xl border border-border-base">
            <button
              onClick={() => setState({ mode: "add" })}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === "add" ? "bg-canvas-card text-brand-primary shadow-sm ring-1 ring-border-base" : "text-text-muted hover:text-text-secondary"}`}
            >
              Add VAT
            </button>
            <button
              onClick={() => setState({ mode: "remove" })}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === "remove" ? "bg-canvas-card text-brand-primary shadow-sm ring-1 ring-border-base" : "text-text-muted hover:text-text-secondary"}`}
            >
              Remove VAT
            </button>
          </div>

          <div id="tour-vat-inputs" className="space-y-8">
            <div className="space-y-3">
                <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
                  {mode === 'add' ? 'Net Amount (Before Tax)' : 'Gross Amount (Total Price)'} ($)
                </label>
                <input
                type="number"
                inputMode="decimal"
                className="w-full h-14 px-5 border border-border-base rounded-2xl bg-canvas-muted text-text-primary text-xl font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all shadow-inner"
                value={amount}
                onChange={e => setState({ amount: e.target.value })}
                />
            </div>
            <div className="space-y-3">
                <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
                  VAT / Sales Tax Rate (%)
                </label>
                <input
                type="number"
                inputMode="decimal"
                className="w-full h-14 px-5 border border-border-base rounded-2xl bg-canvas-muted text-text-primary text-xl font-bold focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all shadow-inner"
                value={rate}
                onChange={e => setState({ rate: e.target.value })}
                />
            </div>
          </div>
        </div>

        {/* Results Column - Visual Impact */}
        <div id="tour-vat-results" className="bg-canvas-card border border-border-base rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center space-y-3">
            <span className="text-xs font-black text-text-muted uppercase tracking-[0.25em]">Grand Total Portfolio</span>
            <div className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={gross} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-8 mt-12 pt-10 border-t border-border-base/60">
            <div className="text-center space-y-2">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Net Price</span>
                <p className="text-2xl font-black text-text-primary tracking-tight">
                  $<NumberTicker value={net} decimals={2} />
                </p>
            </div>
            <div className="text-center space-y-2">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Tax ({rate}%)</span>
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
