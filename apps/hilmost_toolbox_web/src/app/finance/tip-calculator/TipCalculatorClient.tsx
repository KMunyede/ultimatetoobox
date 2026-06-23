"use client";
import { ToolTutorial, NumberTicker, Tooltip, NumericInput } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion } from "framer-motion";
import { Users, DollarSign, Percent } from "lucide-react";

export function TipCalculatorClient() {
  const [state, setState] = useUrlState({
    bill: "120",
    tipPerc: "18",
    people: "4",
  });

  const { bill, tipPerc, people } = state;

  const B = parseFloat(bill as string) || 0;
  const T = parseFloat(tipPerc as string) || 0;
  const P = Math.max(1, parseInt(people as string) || 1);

  const totalTip = B * (T / 100);
  const totalBill = B + totalTip;
  const perPerson = totalBill / P;

  const tourSteps = [
    { element: '#tour-tip-inputs', popover: { title: '1. Bill Details', description: 'Enter the bill amount and your desired tip percentage.' } },
    { element: '#tour-tip-split', popover: { title: '2. Splitting', description: 'Enter the number of people to split the total cost evenly.' } },
    { element: '#tour-tip-results', popover: { title: '3. Final Amounts', description: 'Instantly see the tip total and exactly what each person owes.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-4"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Form */}
        <div id="tour-tip-inputs" className="bg-canvas-card border border-base rounded-2xl p-5 md:p-5 space-y-6 shadow-sm">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                <DollarSign size={12} /> Bill Amount
            </label>
            <Tooltip content="The total amount of the bill before adding a tip" position="top">
              <NumericInput
                title="Total Bill Amount"
                className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                value={bill}
                onChange={val => setState({ bill: val })}
              />
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Percent size={12} /> Tip %
                </label>
                <Tooltip content="The percentage you want to tip (e.g. 15, 18, 20)" position="top">
                  <NumericInput
                  title="Tip Percentage"
                  className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                  value={tipPerc}
                  onChange={val => setState({ tipPerc: val })}
                  />
                </Tooltip>
            </div>
            <div id="tour-tip-split" className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                    <Users size={12} /> Split
                </label>
                <Tooltip content="The number of people splitting the bill" position="top">
                  <NumericInput
                  title="Number of People"
                  className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-lg font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none"
                  value={people}
                  onChange={val => setState({ people: val })}
                  />
                </Tooltip>
            </div>
          </div>
        </div>

        {/* Results */}
        <div id="tour-tip-results" className="bg-canvas-card border border-base rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />

          <div className="relative z-10 text-center space-y-2">
            <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Total Per Person</span>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary tracking-tighter">
              $<NumberTicker value={perPerson} decimals={2} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-base">
            <div className="text-center space-y-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Tip</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={totalTip} decimals={2} /></p>
            </div>
            <div className="text-center space-y-1">
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Total Bill</span>
                <p className="text-xl font-bold text-text-primary">$<NumberTicker value={totalBill} decimals={2} /></p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
