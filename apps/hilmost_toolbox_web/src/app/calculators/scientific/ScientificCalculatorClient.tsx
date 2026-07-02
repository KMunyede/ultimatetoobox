"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { motion } from "framer-motion";

type AngleMode = "deg" | "rad" | "grad";

/**
 * Scientific Calculator Client component.
 * Refactored for complete orientation adaptability.
 * Uses CSS Grid with @container queries to handle Portrait vs Landscape transitions.
 */
export function ScientificCalculatorClient() {
  const pathname = usePathname();

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [shouldReset, setShouldReset] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>("rad");
  const [isSecond, setIsSecond] = useState(false);
  const [isHyp, setIsHyp] = useState(false);

  const { history, addEntry, clearHistory } = useHistory("scientific");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const expr = params.get("expr");
    if (expr) {
      setExpression(decodeURIComponent(expr));
    }
  }, []);

  const calculate = useCallback(async () => {
    if (!expression) return;
    try {
      const { create, all } = await import("mathjs");
      const math = create(all);

      let processedExpr = expression
        .replace(/&pi;/g, "pi")
        .replace(/&tau;/g, "tau")
        .replace(/π/g, "pi")
        .replace(/e/g, "e")
        .replace(/√\(/g, "sqrt(")
        .replace(/\^2/g, "^2")
        .replace(/\^3/g, "^3")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

      if (angleMode === "deg") {
        processedExpr = processedExpr.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, "$1(($2) deg)");
      } else if (angleMode === "grad") {
        processedExpr = processedExpr.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, "$1(($2) grad)");
      }

      const evalResult = math.evaluate(processedExpr);

      const formattedResult = typeof evalResult === "number"
        ? (Number.isInteger(evalResult) ? evalResult.toString() : parseFloat(evalResult.toFixed(10)).toString())
        : evalResult.toString();

      setResult(formattedResult);
      addEntry(expression, formattedResult);
      setShouldReset(true);
    } catch (e) {
      setResult("Error");
    }
  }, [expression, addEntry, angleMode]);

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

  const onButtonClick = (val: string, type: string) => {
    if (type === "number") handleInput(val);
    else if (type === "operator") handleInput(val);
    else if (type === "func") handleInput(val + "(");
    else if (type === "clear") {
      setExpression("");
      setResult("");
      setShouldReset(false);
    } else if (type === "equals") calculate();
    else if (type === "mode") {
      if (val === "DEG" || val === "RAD" || val === "GRAD") setAngleMode(val.toLowerCase() as AngleMode);
      if (val === "2nd") setIsSecond(!isSecond);
      if (val === "HYP") setIsHyp(!isHyp);
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
      if (e.key === "(") handleInput("(");
      if (e.key === ")") handleInput(")");
      if (e.key === "^") handleInput("^");
      if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      }
      if (e.key === "Escape") {
        setExpression("");
        setResult("");
      }
      if (e.key === "Backspace") {
        setExpression((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleInput, calculate]);

  const buttons = [
    { label: "2nd", type: "mode", active: isSecond, className: "bg-slate-100 dark:bg-slate-800" },
    { label: "DEG", type: "mode", active: angleMode === "deg" },
    { label: "RAD", type: "mode", active: angleMode === "rad" },
    { label: "(", type: "operator", className: "bg-slate-50 dark:bg-slate-800/50" },
    { label: ")", type: "operator", className: "bg-slate-50 dark:bg-slate-800/50" },
    { label: "AC", type: "clear", className: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-100 dark:border-rose-900/50" },

    { label: isSecond ? (isHyp ? "asinh" : "asin") : (isHyp ? "sinh" : "sin"), type: "func", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: isSecond ? (isHyp ? "acosh" : "acos") : (isHyp ? "cosh" : "cos"), type: "func", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: isSecond ? (isHyp ? "atanh" : "atan") : (isHyp ? "tanh" : "tan"), type: "func", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "7", type: "number", className: "font-black" },
    { label: "8", type: "number", className: "font-black" },
    { label: "9", type: "number", className: "font-black" },
    { label: "÷", type: "operator", val: "÷", className: "text-brand-primary bg-brand-primary/5" },

    { label: "ln", type: "func", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "log", type: "func", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "√x", type: "func", val: "√", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "4", type: "number", className: "font-black" },
    { label: "5", type: "number", className: "font-black" },
    { label: "6", type: "number", className: "font-black" },
    { label: "×", type: "operator", val: "×", className: "text-brand-primary bg-brand-primary/5" },

    { label: "x²", type: "operator", val: "^2", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "x³", type: "operator", val: "^3", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "^", type: "operator", className: "bg-sky-50 dark:bg-sky-900/20" },
    { label: "1", type: "number", className: "font-black" },
    { label: "2", type: "number", className: "font-black" },
    { label: "3", type: "number", className: "font-black" },
    { label: "−", type: "operator", val: "−", className: "text-brand-primary bg-brand-primary/5" },

    { label: "HYP", type: "mode", active: isHyp, className: "bg-slate-50 dark:bg-slate-800/50" },
    { label: "π", type: "number", className: "bg-slate-50 dark:bg-slate-800/50" },
    { label: "e", type: "number", className: "bg-slate-50 dark:bg-slate-800/50" },
    { label: "0", type: "number", className: "font-black" },
    { label: ".", type: "number", className: "font-black" },
    { label: "=", type: "equals", className: "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg" },
    { label: "+", type: "operator", className: "text-brand-primary bg-brand-primary/5" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container max-w-4xl mx-auto my-8"
    >
      <div className="flex flex-col gap-6">
        <CalculatorDisplay
          expression={expression}
          result={result}
          history={history}
          onClearHistory={clearHistory}
          onRestore={(entry) => {
            setExpression(entry.expression);
            setResult(entry.result);
            setShouldReset(true);
          }}
        />

        <div className="grid grid-cols-5 @[700px]:grid-cols-7 gap-2 md:gap-4">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => onButtonClick(btn.val || btn.label, btn.type)}
              className={`
                w-full h-12 md:h-14 @[600px]:h-16 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black uppercase tracking-widest transition-all active:scale-95 border-2
                ${btn.className || ""}
                ${btn.type === "mode" && !btn.active ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400" : ""}
                ${btn.type === "mode" && btn.active ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" : ""}
                ${btn.type === "number" && !btn.className?.includes('bg-') ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white" : ""}
                ${btn.type === "operator" && !btn.className?.includes('bg-') ? "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white" : ""}
                ${btn.type === "func" && !btn.className?.includes('bg-') ? "bg-sky-50/50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800/50 text-sky-600 dark:text-sky-400" : ""}
                hover:border-brand-primary/50
              `}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
