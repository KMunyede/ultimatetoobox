"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MoveLeft, History } from "lucide-react";
import { evaluateScientific, formatResult } from "@/lib/calcLogic";

export function ScientificCalculatorClient() {
  const [state, setState] = useUrlState({
    expression: "",
    result: "",
    mode: "DEG",
    ans: "0"
  });

  const { expression, result, mode, ans } = state as Record<string, string>;
  const [history, setHistory] = useState<string[]>([]);

  const append = (char: string) => {
    setState({ ...state, expression: expression + char });
  };

  const clear = () => setState({ ...state, expression: "", result: "" });

  const backspace = () => {
    setState({ ...state, expression: expression.slice(0, -1) });
  };

  const calculate = () => {
    const res = evaluateScientific(expression, mode as "DEG" | "RAD");
    const formatted = formatResult(res);

    if (formatted !== "Error" && formatted !== "Infinity") {
      setHistory(prev => [`${expression} = ${formatted}`, ...prev].slice(0, 5));
      setState({ ...state, result: formatted, ans: formatted });
    } else {
      setState({ ...state, result: formatted });
    }
  };

  const useAns = () => append(ans);

  const buttons = [
    // Functions (Left)
    { label: "sin", action: () => append("sin("), type: "func" },
    { label: "cos", action: () => append("cos("), type: "func" },
    { label: "tan", action: () => append("tan("), type: "func" },
    { label: "π", action: () => append("π"), type: "const" },
    { label: "e", action: () => append("e"), type: "const" },

    { label: "log", action: () => append("log("), type: "func" },
    { label: "ln", action: () => append("ln("), type: "func" },
    { label: "n!", action: () => append("!"), type: "func" },
    { label: "(", action: () => append("("), type: "op_alt" },
    { label: ")", action: () => append(")"), type: "op_alt" },

    { label: "√", action: () => append("sqrt("), type: "func" },
    { label: "x²", action: () => append("^2"), type: "func" },
    { label: "xʸ", action: () => append("^"), type: "func" },
    { label: "1/x", action: () => append("1/("), type: "func" },
    { label: "AC", action: clear, type: "clear" },

    // Keypad (Right)
    { label: "7", action: () => append("7"), type: "num" },
    { label: "8", action: () => append("8"), type: "num" },
    { label: "9", action: () => append("9"), type: "num" },
    { label: "DEL", action: backspace, type: "del" },
    { label: "÷", action: () => append("/"), type: "op" },

    { label: "4", action: () => append("4"), type: "num" },
    { label: "5", action: () => append("5"), type: "num" },
    { label: "6", action: () => append("6"), type: "num" },
    { label: "Ans", action: useAns, type: "op_alt" },
    { label: "×", action: () => append("*"), type: "op" },

    { label: "1", action: () => append("1"), type: "num" },
    { label: "2", action: () => append("2"), type: "num" },
    { label: "3", action: () => append("3"), type: "num" },
    { label: "EXP", action: () => append("*10^"), type: "op_alt" },
    { label: "-", action: () => append("-"), type: "op" },

    { label: "0", action: () => append("0"), type: "num" },
    { label: ".", action: () => append("."), type: "num" },
    { label: "%", action: () => append("/100"), type: "op_alt" },
    { label: "=", action: calculate, type: "eq" },
    { label: "+", action: () => append("+"), type: "op" },
  ];

  const tourSteps = [
    { element: '#tour-calc-display', popover: { title: '1. Expression View', description: 'Type full mathematical expressions with nested functions.' } },
    { element: '#tour-calc-grid', popover: { title: '2. Scientific Grid', description: 'Access trigonometry, logarithms, factorials, and powers.' } },
    { element: '#tour-calc-history', popover: { title: '3. Calculation Log', description: 'Your recent results are saved for quick reference.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container grid grid-cols-1 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
    >
      <div className="xl:col-span-3 space-y-8">
        <div className="flex justify-between items-center px-1">
          <div id="tour-calc-mode" className="flex p-1.5 bg-canvas-muted rounded-[1.25rem] border border-border-base shadow-inner">
            <button
              onClick={() => setState({ ...state, mode: "DEG" })}
              className={`px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${mode === "DEG" ? "bg-canvas-card text-brand-primary shadow-xl border border-border-base scale-[1.05]" : "text-text-muted hover:text-text-secondary"}`}
            >
              DEG
            </button>
            <button
              onClick={() => setState({ ...state, mode: "RAD" })}
              className={`px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${mode === "RAD" ? "bg-canvas-card text-brand-primary shadow-xl border border-border-base scale-[1.05]" : "text-text-muted hover:text-text-secondary"}`}
            >
              RAD
            </button>
          </div>
          <div className="flex gap-4">
              <ShareButton />
              <ToolTutorial tourId="scientific_calc" steps={tourSteps} buttonText="How to use" />
          </div>
        </div>

        <div className="bg-canvas-card border border-border-base rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />

          {/* Display */}
          <div id="tour-calc-display" className="mb-12 p-10 bg-canvas-muted rounded-[2.5rem] border border-border-base flex flex-col items-end justify-center min-h-[200px] shadow-inner relative group">
              <div className="absolute top-6 left-8 flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                 <span className="text-[11px] font-black text-text-muted uppercase tracking-[0.25em]">Scientific Engine</span>
              </div>
              <div className="text-text-muted text-xl font-mono truncate w-full text-right mb-4 tracking-tight opacity-70">
                  {expression || "0"}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={result}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter truncate w-full text-right"
                >
                    {result ? `= ${result}` : expression ? "" : "0"}
                </motion.div>
              </AnimatePresence>
          </div>

          {/* Keypad Grid */}
          <div id="tour-calc-grid" className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4">
              {buttons.map((btn) => (
                  <button
                      key={btn.label}
                      onClick={btn.action}
                      className={`h-14 md:h-16 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center border
                          ${btn.type === 'num' ? 'bg-canvas-card text-text-primary border-border-base hover:bg-canvas-muted shadow-sm text-2xl' :
                            btn.type === 'op' ? 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20 text-2xl' :
                            btn.type === 'op_alt' ? 'bg-canvas-muted text-text-secondary border-border-base hover:border-text-muted text-sm uppercase tracking-tighter' :
                            btn.type === 'func' ? 'bg-purple-500/5 text-purple-600 border-purple-500/10 hover:bg-purple-500/10 text-sm italic' :
                            btn.type === 'const' ? 'bg-pink-500/5 text-pink-600 border-pink-500/10 hover:bg-pink-500/10 font-serif' :
                            btn.type === 'eq' ? 'bg-brand-primary text-white border-brand-primary shadow-2xl shadow-brand-primary/30 text-3xl' :
                            btn.type === 'clear' ? 'bg-red-500/10 text-red-600 border-red-500/10 hover:bg-red-500/20' :
                            btn.type === 'del' ? 'bg-red-500/5 text-red-500 border-red-500/5 hover:bg-red-500/10 text-xs font-black' :
                            'bg-canvas-muted text-text-secondary border-border-base'}
                      `}
                  >
                      {btn.label === 'DEL' ? <MoveLeft size={22} /> : btn.label}
                  </button>
              ))}
          </div>
        </div>
      </div>

      {/* Side Panel: History */}
      <div id="tour-calc-history" className="space-y-6">
          <div className="bg-canvas-card border border-border-base rounded-[3rem] p-8 shadow-xl h-full min-h-[500px]">
              <div className="flex items-center gap-3 mb-10">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-600">
                    <History size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-text-primary tracking-tighter">Calculation Log</h3>
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {history.length > 0 ? (
                    history.map((entry, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className="p-6 bg-canvas-muted border border-border-base rounded-3xl group hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden"
                        onClick={() => {
                           const parts = entry.split('=');
                           if (parts.length > 1) setState({ ...state, expression: parts[1].trim() });
                        }}
                      >
                        <div className="absolute top-0 right-0 w-1 h-full bg-purple-500/20" />
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.25em] mb-2 group-hover:text-purple-500 transition-colors">Session Log {history.length - i}</p>
                        <p className="text-base font-bold text-text-primary break-all leading-tight">{entry}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="h-80 flex flex-col items-center justify-center text-center opacity-30 grayscale">
                        <History size={64} className="text-text-muted mb-6" />
                        <p className="text-lg font-black text-text-primary uppercase tracking-widest">Awaiting Math</p>
                        <p className="text-sm font-medium text-text-muted mt-2">Calculations will appear here.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
          </div>
      </div>
    </motion.div>
  );
}
