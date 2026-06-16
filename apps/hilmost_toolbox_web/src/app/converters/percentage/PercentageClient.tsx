"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";

export function PercentageClient() {
  const [state, setState] = useUrlState({
    val1A: "",
    val1B: "",
    val2A: "",
    val2B: "",
    val3A: "",
    val3B: "",
  });

  const { val1A, val1B, val2A, val2B, val3A, val3B } = state as { val1A: string, val1B: string, val2A: string, val2B: string, val3A: string, val3B: string };

  const calc1 = (a: string, b: string) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return null;
    return (numA * numB) / 100;
  };

  const calc2 = (a: string, b: string) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB) || numB === 0) return null;
    return (numA / numB) * 100;
  };

  const calc3 = (a: string, b: string) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB) || numA === 0) return null;
    return ((numB - numA) / numA) * 100;
  };

  const res1 = calc1(val1A, val1B);
  const res2 = calc2(val2A, val2B);
  const res3 = calc3(val3A, val3B);

  const tourSteps = [
    { element: '#tour-perc-1', popover: { title: '1. What is X% of Y?', description: 'Use this to find a percentage of a number.' } },
    { element: '#tour-perc-2', popover: { title: '2. X is what % of Y?', description: 'Use this to figure out the percentage one number is of another.' } },
    { element: '#tour-perc-3', popover: { title: '3. Percentage Change', description: 'Find out the percentage increase or decrease between two numbers.' } },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="percentage_calculator" steps={tourSteps} buttonText="How to use" />
      </div>
      
      {/* Type 1: What is X% of Y? */}
      <div id="tour-perc-1" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">What is X% of Y?</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">What is</span>
            <input
              type="number"
              className="w-full md:w-24 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={val1A}
              onChange={e => setState({ val1A: e.target.value })}
              placeholder="X"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium">% of</span>
            <input
              type="number"
              className="w-full md:w-32 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={val1B}
              onChange={e => setState({ val1B: e.target.value })}
              placeholder="Y"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium">?</span>
          </div>
          {res1 !== null && (
            <div className="md:ml-auto text-2xl font-bold text-blue-600 dark:text-blue-400 break-all bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
              = {Number.isInteger(res1) ? res1 : res1.toFixed(4).replace(/\.?0+$/, '')}
            </div>
          )}
        </div>
      </div>

      {/* Type 2: X is what % of Y? */}
      <div id="tour-perc-2" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">X is what percent of Y?</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="number"
              className="w-full md:w-32 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={val2A}
              onChange={e => setState({ val2A: e.target.value })}
              placeholder="X"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">is what % of</span>
            <input
              type="number"
              className="w-full md:w-32 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={val2B}
              onChange={e => setState({ val2B: e.target.value })}
              placeholder="Y"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium">?</span>
          </div>
          {res2 !== null && (
            <div className="md:ml-auto text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl">
              = {Number.isInteger(res2) ? res2 : res2.toFixed(4).replace(/\.?0+$/, '')}%
            </div>
          )}
        </div>
      </div>

      {/* Type 3: Percentage Change */}
      <div id="tour-perc-3" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">Percentage change from X to Y?</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">From</span>
            <input
              type="number"
              className="w-full md:w-32 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={val3A}
              onChange={e => setState({ val3A: e.target.value })}
              placeholder="X"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">to</span>
            <input
              type="number"
              className="w-full md:w-32 h-12 px-3 text-lg border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={val3B}
              onChange={e => setState({ val3B: e.target.value })}
              placeholder="Y"
            />
            <span className="text-slate-600 dark:text-slate-400 font-medium">?</span>
          </div>
          {res3 !== null && (
            <div className="md:ml-auto text-2xl font-bold text-purple-600 dark:text-purple-400 break-all bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-xl">
              = {res3 > 0 ? "+" : ""}{Number.isInteger(res3) ? res3 : res3.toFixed(4).replace(/\.?0+$/, '')}%
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
