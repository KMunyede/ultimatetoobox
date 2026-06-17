"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MoveLeft } from "lucide-react";

export function ScientificCalculatorClient() {
  const [state, setState] = useUrlState({
    expression: "",
    result: "",
    mode: "DEG",
  });

  const { expression, result, mode } = state;

  const append = (char: string) => {
    setState({ ...state, expression: (expression as string) + char });
  };

  const clear = () => setState({ ...state, expression: "", result: "" });

  const backspace = () => {
    const exp = expression as string;
    setState({ ...state, expression: exp.slice(0, -1) });
  };

  const calculate = () => {
    try {
      // Improved safe replacement for evaluation
      let safeExp = (expression as string)
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        // Handle implicit multiplication (e.g. 2π, (1+2)(3+4))
        .replace(/(\d)(\()/g, "$1*(")
        .replace(/(\))(\()/g, "$1*(")
        .replace(/(\))(\d)/g, "$1*$2")
        .replace(/(\d)(π|e|sin|cos|tan|sqrt|log|ln)/g, "$1*$2")
        .replace(/(π|e)(\d)/g, "$1*$2")

        .replace(/sin\(/g, mode === "DEG" ? "Math.sin(Math.PI/180*" : "Math.sin(")
        .replace(/cos\(/g, mode === "DEG" ? "Math.cos(Math.PI/180*" : "Math.cos(")
        .replace(/tan\(/g, mode === "DEG" ? "Math.tan(Math.PI/180*" : "Math.tan(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/\^/g, "**");

      // eslint-disable-next-line no-eval
      const res = eval(safeExp);

      if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
         setState({ ...state, result: "Error" });
      } else {
         setState({ ...state, result: Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(10)).toString() });
      }
    } catch (e) {
      setState({ ...state, result: "Error" });
    }
  };

  const buttons = [
    { label: "sin", action: () => append("sin("), type: "func" },
    { label: "cos", action: () => append("cos("), type: "func" },
    { label: "tan", action: () => append("tan("), type: "func" },
    { label: "π", action: () => append("π"), type: "const" },
    { label: "e", action: () => append("e"), type: "const" },
    { label: "log", action: () => append("log("), type: "func" },
    { label: "ln", action: () => append("ln("), type: "func" },
    { label: "(", action: () => append("("), type: "op_alt" },
    { label: ")", action: () => append(")"), type: "op_alt" },
    { label: "√", action: () => append("sqrt("), type: "func" },
    { label: "^", action: () => append("^"), type: "op_alt" },
    { label: "AC", action: clear, type: "clear" },
    { label: "÷", action: () => append("/"), type: "op" },
    { label: "×", action: () => append("*"), type: "op" },
    { label: "7", action: () => append("7"), type: "num" },
    { label: "8", action: () => append("8"), type: "num" },
    { label: "9", action: () => append("9"), type: "num" },
    { label: "-", action: () => append("-"), type: "op" },
    { label: "4", action: () => append("4"), type: "num" },
    { label: "5", action: () => append("5"), type: "num" },
    { label: "6", action: () => append("6"), type: "num" },
    { label: "+", action: () => append("+"), type: "op" },
    { label: "1", action: () => append("1"), type: "num" },
    { label: "2", action: () => append("2"), type: "num" },
    { label: "3", action: () => append("3"), type: "num" },
    { label: "=", action: calculate, type: "eq" },
    { label: "0", action: () => append("0"), type: "num" },
    { label: ".", action: () => append("."), type: "num" },
    { label: "DEL", action: backspace, type: "del" },
  ];

  const tourSteps = [
    { element: '#tour-calc-display', popover: { title: '1. Display', description: 'Your current expression and the live result appear here.' } },
    { element: '#tour-calc-mode', popover: { title: '2. Angle Mode', description: 'Switch between Degrees and Radians for trigonometric functions.' } },
    { element: '#tour-calc-grid', popover: { title: '3. Functions', description: 'Use advanced functions like sin, cos, log, and constants like Pi.' } },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8"
    >
      <div className="flex justify-between items-center px-1">
        <div id="tour-calc-mode" className="flex p-1 bg-canvas-muted rounded-xl border border-border-base">
          <button
            onClick={() => setState({ ...state, mode: "DEG" })}
            className={`px-4 py-2 text-[11px] font-black rounded-lg transition-all ${mode === "DEG" ? "bg-canvas-card text-brand-primary shadow-sm border border-border-base" : "text-text-muted hover:text-text-secondary"}`}
          >
            DEG
          </button>
          <button
            onClick={() => setState({ ...state, mode: "RAD" })}
            className={`px-4 py-2 text-[11px] font-black rounded-lg transition-all ${mode === "RAD" ? "bg-canvas-card text-brand-primary shadow-sm border border-border-base" : "text-text-muted hover:text-text-secondary"}`}
          >
            RAD
          </button>
        </div>
        <div className="flex gap-4">
            <ShareButton />
            <ToolTutorial tourId="scientific_calc" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-border-base rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/20" />
        
        {/* Display */}
        <div id="tour-calc-display" className="mb-10 p-8 bg-canvas-muted rounded-3xl border border-border-base flex flex-col items-end justify-center min-h-[160px] shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-[10px] font-black text-purple-500 uppercase tracking-widest opacity-40">Scientific Engine</div>
            <div className="text-text-muted text-lg font-mono truncate w-full text-right mb-2 tracking-tight">
                {expression || "0"}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-black text-text-primary tracking-tighter truncate w-full text-right"
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
                        ${btn.type === 'num' ? 'bg-canvas-card text-text-primary border-border-base hover:bg-canvas-muted shadow-sm' :
                          btn.type === 'op' ? 'bg-orange-500/10 text-orange-600 border-orange-500/10 hover:bg-orange-500/20' :
                          btn.type === 'op_alt' ? 'bg-canvas-muted text-text-secondary border-border-base hover:border-text-muted' :
                          btn.type === 'func' ? 'bg-purple-500/5 text-purple-600 border-purple-500/10 hover:bg-purple-500/10 text-sm tracking-tight' :
                          btn.type === 'const' ? 'bg-pink-500/5 text-pink-600 border-pink-500/10 hover:bg-pink-500/10' :
                          btn.type === 'eq' ? 'bg-brand-primary text-white border-brand-primary shadow-xl shadow-brand-primary/20 sm:row-span-1' :
                          btn.type === 'clear' ? 'bg-red-500/10 text-red-600 border-red-500/10 hover:bg-red-500/20' :
                          btn.type === 'del' ? 'bg-red-500/5 text-red-500 border-red-500/5 hover:bg-red-500/10' :
                          'bg-canvas-muted text-text-secondary border-border-base'}
                    `}
                >
                    {btn.label === 'DEL' ? <MoveLeft size={22} /> : btn.label}
                </button>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
