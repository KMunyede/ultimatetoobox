"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { motion } from "framer-motion";

const BUTTONS = [
  { label: "AC", type: "clear", className: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-100 dark:border-rose-900/50" },
  { label: "+/−", type: "operator", className: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" },
  { label: "%", type: "operator", className: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" },
  { label: "÷", type: "operator", value: "/", className: "bg-brand-primary text-white" },
  { label: "7", type: "number" },
  { label: "8", type: "number" },
  { label: "9", type: "number" },
  { label: "×", type: "operator", value: "*", className: "bg-brand-primary text-white" },
  { label: "4", type: "number" },
  { label: "5", type: "number" },
  { label: "6", type: "number" },
  { label: "−", type: "operator", value: "-", className: "bg-brand-primary text-white" },
  { label: "1", type: "number" },
  { label: "2", type: "number" },
  { label: "3", type: "number" },
  { label: "+", type: "operator", value: "+", className: "bg-brand-primary text-white" },
  { label: "0", type: "number", span: 2 },
  { label: ".", type: "number" },
  { label: "=", type: "equals", className: "bg-brand-primary text-white" },
];

export function StandardCalculatorClient() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [shouldReset, setShouldReset] = useState(false);
  const { history, addEntry, clearHistory } = useHistory("standard");

  const calculate = useCallback(async () => {
    if (!expression) return;
    try {
      const { create, all } = await import("mathjs");
      const math = create(all);

      const cleanExpr = expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
      const evalResult = math.evaluate(cleanExpr);
      const formattedResult = Number.isInteger(evalResult)
        ? evalResult.toString()
        : parseFloat(evalResult.toFixed(8)).toString();

      setResult(formattedResult);
      addEntry(expression, formattedResult);
      setShouldReset(true);
    } catch (e) {
      setResult("Error");
    }
  }, [expression, addEntry]);

  const handleInput = useCallback((val: string) => {
    if (shouldReset) {
      if (/[0-9.]/.test(val)) {
        setExpression(val);
        setResult("");
      } else {
        setExpression(result + val);
        setResult("");
      }
      setShouldReset(false);
    } else {
      setExpression((prev) => prev + val);
    }
  }, [shouldReset, result]);

  const handleClear = useCallback(() => {
    setExpression("");
    setResult("");
    setShouldReset(false);
  }, []);

  const handleToggleSign = useCallback(async () => {
    if (expression) {
      try {
        const { create, all } = await import("mathjs");
        const math = create(all);
        const evalResult = math.evaluate(`(${expression}) * -1`);
        setExpression(evalResult.toString());
      } catch (e) {
        setResult("Error");
      }
    }
  }, [expression]);

  const handlePercent = useCallback(async () => {
    if (expression) {
      try {
        const { create, all } = await import("mathjs");
        const math = create(all);
        const evalResult = math.evaluate(`(${expression}) / 100`);
        setExpression(evalResult.toString());
      } catch (e) {
        setResult("Error");
      }
    }
  }, [expression]);

  const onButtonClick = (btn: typeof BUTTONS[0]) => {
    if (btn.type === "number") {
      handleInput(btn.label);
    } else if (btn.type === "operator") {
      if (btn.label === "+/−") handleToggleSign();
      else if (btn.label === "%") handlePercent();
      else handleInput(btn.value || btn.label);
    } else if (btn.type === "clear") {
      handleClear();
    } else if (btn.type === "equals") {
      calculate();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) handleInput(e.key);
      if (e.key === ".") handleInput(".");
      if (e.key === "+") handleInput("+");
      if (e.key === "-") handleInput("-");
      if (e.key === "*") handleInput("*");
      if (e.key === "/") handleInput("/");
      if (e.key === "%") handlePercent();
      if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      }
      if (e.key === "Escape") handleClear();
      if (e.key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, calculate, handleClear, handlePercent]);

  const handleRestore = (entry: { expression: string; result: string }) => {
    setExpression(entry.expression);
    setResult(entry.result);
    setShouldReset(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto my-8"
    >
      <CalculatorDisplay
        expression={expression}
        result={result}
        history={history}
        onClearHistory={clearHistory}
        onRestore={handleRestore}
      />

      <div className="grid grid-cols-4 gap-3 mt-6">
        {BUTTONS.map((btn, i) => (
          <button
            key={i}
            onClick={() => onButtonClick(btn)}
            className={`
              w-full h-14 rounded-2xl text-xl font-black uppercase tracking-widest transition-all active:scale-95 border-2
              ${btn.span === 2 ? "col-span-2" : "col-span-1"}
              ${btn.className || "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:border-brand-primary"}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
