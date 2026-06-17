"use client";
import { ToolTutorial, NumberTicker } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
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
    { element: '#tour-vat-mode', popover: { title: '1. Choose Mode', description: 'Decide if you want to add tax to a net price or remove tax from a gross total.' } },
    { element: '#tour-vat-inputs', popover: { title: '2. Values', description: 'Enter your amount and the specific VAT/Tax rate.' } },
    { element: '#tour-vat-results', popover: { title: '3. Breakdown', description: 'See the exact split between net price, tax amount, and the grand total.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="vat_calculator" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow">

          <div id="tour-vat-mode" className="flex p-1 bg-canvas-muted rounded-xl border border-base">
            <button
              onClick={() => setState({ mode: "add" })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "add" ? "bg-canvas-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
            >
              Add VAT
            </button>
            <button
              onClick={() => setState({ mode: "remove" })}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${mode === "remove" ? "bg-canvas-card text-text-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
            >
              Remove VAT
            </button>
          </div>

          <div id="tour-vat-inputs" className="space-y-6">
            <div className="space-y-2">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">{mode === 'add' ? 'Net Amount' : 'Gross Amount'} ($)</label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={amount}
                onChange={e => setState({ amount: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">VAT / Tax Rate (%)</label>
                <input
                type="number"
                className="w-full h-14 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={rate}
                onChange={e => setState({ rate: e.target.value })}
                />
            </div>
          </div>
        </div>

        {/* Results */}
        <div id="tour-vat-results" className="bg-canvas-card border border-base rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2">
            <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Grand Total</span>
            <div className="text-6xl md:text-7xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={gross} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Net Amount</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={net} decimals={2} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Tax Amount ({rate}%)</span>
                <p className="text-xl font-bold text-emerald-600">+$<NumberTicker value={vat} decimals={2} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
