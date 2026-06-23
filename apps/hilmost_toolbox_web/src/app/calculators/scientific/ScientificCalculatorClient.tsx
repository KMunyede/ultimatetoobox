"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { IconCheck } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Tooltip } from "@utilitiessite/ui";

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
  const [copying, setCopying] = useState(false);

  const { history, addEntry, clearHistory } = useHistory("scientific");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const expr = params.get("expr");
    if (expr) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("expr", encodeURIComponent(expression));
    navigator.clipboard.writeText(url.toString());
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
    window.history.replaceState(null, "", `${pathname}?${url.searchParams.toString()}`);
  };

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
    { label: isSecond ? (isHyp ? "asinh" : "asin") : (isHyp ? "sinh" : "sin"), type: "func", tip: isSecond ? "Inverse Sine" : "Sine Function" },
    { label: isSecond ? (isHyp ? "acosh" : "acos") : (isHyp ? "cosh" : "cos"), type: "func", tip: isSecond ? "Inverse Cosine" : "Cosine Function" },
    { label: isSecond ? (isHyp ? "atanh" : "atan") : (isHyp ? "tanh" : "tan"), type: "func", tip: isSecond ? "Inverse Tangent" : "Tangent Function" },
    { label: "ln", type: "func", tip: "Natural Logarithm (base e)" },
    { label: "log", type: "func", tip: "Common Logarithm (base 10)" },
    { label: "x²", type: "operator", val: "^2", tip: "Square (Power of 2)" },
    { label: "x³", type: "operator", val: "^3", tip: "Cube (Power of 3)" },
    { label: "√x", type: "func", val: "√", tip: "Square Root" },
    { label: "π", type: "number", tip: "Pi Constant (≈3.14159)" },
    { label: "e", type: "number", tip: "Euler's Number (≈2.71828)" },
    { label: "DEG", type: "mode", active: angleMode === "deg", tip: "Degrees Mode (360°)" },
    { label: "RAD", type: "mode", active: angleMode === "rad", tip: "Radians Mode (2π)" },
    { label: "GRAD", type: "mode", active: angleMode === "grad", tip: "Gradians Mode (400)" },
    { label: "2nd", type: "mode", active: isSecond, tip: "Shift: Toggles Inverse Functions" },
    { label: "HYP", type: "mode", active: isHyp, tip: "Hyperbolic Function Mode" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "(", type: "operator" },
    { label: ")", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "×", type: "operator", val: "×" },
    { label: "÷", type: "operator", val: "÷" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "−", type: "operator", val: "−" },
    { label: "AC", type: "clear", className: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white", tip: "All Clear" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "^", type: "operator", tip: "Power Function (x to the power of y)" },
    { label: "=", type: "equals", className: "bg-blue-600 text-white", tip: "Calculate Result" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container max-w-4xl mx-auto"
    >
      <div className="flex flex-col gap-5">
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

        {/* Adaptive Button Grid: 5 columns in Portrait, 10 columns in Wide Landscape */}
        <div className="grid grid-cols-5 @[600px]:grid-cols-7 @[900px]:grid-cols-10 gap-2 md:gap-3">
          {buttons.map((btn, i) => {
            const buttonNode = (
              <button
                key={i}
                onClick={() => onButtonClick(btn.label, btn.type)}
                className={`
                  w-full h-12 md:h-14 @[600px]:h-16 rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all active:scale-95
                  ${btn.className || (btn.type === "mode"
                    ? (btn.active ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800" : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800")
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-blue-500")}
                `}
              >
                {btn.label}
              </button>
            );

            return btn.tip ? (
              <Tooltip key={i} content={btn.tip} position="top">
                {buttonNode}
              </Tooltip>
            ) : (
              <React.Fragment key={i}>
                {buttonNode}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
