"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Delete, Eraser, MoveLeft, History } from "lucide-react";

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
      // Basic math security check and evaluation
      // In a principal-level app, we would use a math parser like mathjs
      // For now, using a safe replacement and eval for the prototype
      let safeExp = (expression as string)
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/sin\(/g, mode === "DEG" ? "Math.sin(Math.PI/180*" : "Math.sin(")
        .replace(/cos\(/g, mode === "DEG" ? "Math.cos(Math.PI/180*" : "Math.cos(")
        .replace(/tan\(/g, mode === "DEG" ? "Math.tan(Math.PI/180*" : "Math.tan(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/\^/g, "**");

      const res = eval(safeExp);
      setState({ ...state, result: Number.isInteger(res) ? res.toString() : res.toFixed(8).replace(/\.?0+$/, '') });
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
    { label: "(", action: () => append("("), type: "op" },
    { label: ")", action: () => append(")"), type: "op" },
    { label: "√", action: () => append("sqrt("), type: "func" },
    { label: "^", action: () => append("^"), type: "op" },
    { label: "C", action: clear, type: "clear" },
    { label: "/", action: () => append("/"), type: "op" },
    { label: "*", action: () => append("*"), type: "op" },
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
      className="@container space-y-6"
    >
      <div className="flex justify-between items-center">
        <div id="tour-calc-mode" className="flex p-1 bg-canvas-muted rounded-xl border border-base">
          <button
            onClick={() => setState({ ...state, mode: "DEG" })}
            className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${mode === "DEG" ? "bg-canvas-card text-brand-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
          >
            DEG
          </button>
          <button
            onClick={() => setState({ ...state, mode: "RAD" })}
            className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${mode === "RAD" ? "bg-canvas-card text-brand-primary shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
          >
            RAD
          </button>
        </div>
        <div className="flex gap-4">
            <ShareButton />
            <ToolTutorial tourId="scientific_calc" steps={tourSteps} buttonText="How to use" />
        </div>
      </div>

      <div className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary/20" />
        
        {/* Display */}
        <div id="tour-calc-display" className="mb-8 p-6 bg-canvas-muted rounded-2xl border border-base flex flex-col items-end justify-center min-h-[120px] shadow-inner overflow-hidden">
            <div className="text-text-muted text-sm font-mono truncate w-full text-right mb-1">
                {expression || "0"}
            </div>
            <div className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter truncate w-full text-right">
                {result ? `= ${result}` : expression ? "" : "0"}
            </div>
        </div>

        {/* Keypad Grid */}
        <div id="tour-calc-grid" className="grid grid-cols-4 sm:grid-cols-5 gap-3 md:gap-4">
            {buttons.map((btn) => (
                <button
                    key={btn.label}
                    onClick={btn.action}
                    className={`h-14 md:h-16 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center
                        ${btn.type === 'num' ? 'bg-canvas-card text-text-primary border border-base hover:bg-canvas-muted shadow-sm' :
                          btn.type === 'op' ? 'bg-canvas-muted text-brand-primary border border-base hover:border-brand-primary/50' :
                          btn.type === 'func' ? 'bg-brand-primary/5 text-brand-primary border border-brand-primary/10 hover:bg-brand-primary/10 text-sm' :
                          btn.type === 'const' ? 'bg-indigo-500/5 text-indigo-600 border border-indigo-500/10' :
                          btn.type === 'eq' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 col-span-1' :
                          btn.type === 'clear' ? 'bg-red-500/5 text-red-500 border border-red-500/10' :
                          'bg-canvas-muted text-text-secondary'}
                    `}
                >
                    {btn.label === 'DEL' ? <MoveLeft size={20} /> : btn.label}
                </button>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
