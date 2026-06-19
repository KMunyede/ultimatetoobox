"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CalculatorDisplay } from "../../../components/calculators/CalculatorDisplay";
import { useHistory } from "../../../hooks/useHistory";
import { IconShare, IconCopy, IconCheck } from "@tabler/icons-react";

const math = create(all);

type AngleMode = "deg" | "rad" | "grad";

export function ScientificCalculatorClient() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
      <ScientificCalculatorInner />
    </Suspense>
  );
}

function ScientificCalculatorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [shouldReset, setShouldReset] = useState(false);
  const [angleMode, setAngleMode] = useState<AngleMode>("rad");
  const [isSecond, setIsSecond] = useState(false);
  const [isHyp, setIsHyp] = useState(false);
  const [copying, setCopying] = useState(false);

  const { history, addEntry, clearHistory } = useHistory("scientific");

  // Restore from URL
  useEffect(() => {
    const expr = searchParams.get("expr");
    if (expr) {
      setExpression(decodeURIComponent(expr));
    }
  }, [searchParams]);

  const calculate = useCallback(async () => {
    if (!expression) return;
    try {
      // Lazy load mathjs
      const { create, all } = await import("mathjs");
      const math = create(all);

      // Configure mathjs for current angle mode
      let evalResult: any;

      // We wrap the evaluation to handle degrees/radians/gradians for trig functions
      // This is a bit complex in mathjs, a common trick is to use 'unit' for inputs
      // or configure the global math instance.
      // For simplicity, we'll try to use the raw expression and rely on mathjs's unit system if possible,
      // or manually convert trig inputs if we detect sin/cos/tan.

      // Let's use a simpler approach: if in DEG mode, we append ' deg' to trig arguments if they are numbers.
      // But better: mathjs supports 'sin(45 deg)'.
      // We'll replace sin(x) with sin(x deg) if in deg mode, etc.

      let processedExpr = expression
        .replace(/π/g, "pi")
        .replace(/e/g, "e")
        .replace(/√\(/g, "sqrt(")
        .replace(/\^2/g, "^2")
        .replace(/\^3/g, "^3")
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

      if (angleMode === "deg") {
        // This is naive but works for simple sin(45) -> sin(45 deg)
        processedExpr = processedExpr.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, "$1(($2) deg)");
      } else if (angleMode === "grad") {
        processedExpr = processedExpr.replace(/(sin|cos|tan|asin|acos|atan)\(([^)]+)\)/g, "$1(($2) grad)");
      }

      evalResult = math.evaluate(processedExpr);

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
    // Top Row Functions
    { label: isSecond ? (isHyp ? "asinh" : "asin") : (isHyp ? "sinh" : "sin"), type: "func" },
    { label: isSecond ? (isHyp ? "acosh" : "acos") : (isHyp ? "cosh" : "cos"), type: "func" },
    { label: isSecond ? (isHyp ? "atanh" : "atan") : (isHyp ? "tanh" : "tan"), type: "func" },
    { label: "ln", type: "func" },
    { label: "log", type: "func" },

    // Power/Root Row
    { label: "x²", type: "operator", val: "^2" },
    { label: "x³", type: "operator", val: "^3" },
    { label: "√x", type: "func", val: "√" },
    { label: "π", type: "number" },
    { label: "e", type: "number" },

    // Mode Toggles
    { label: "DEG", type: "mode", active: angleMode === "deg" },
    { label: "RAD", type: "mode", active: angleMode === "rad" },
    { label: "GRAD", type: "mode", active: angleMode === "grad" },
    { label: "2nd", type: "mode", active: isSecond },
    { label: "HYP", type: "mode", active: isHyp },

    // Standard Layout Below
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

    { label: "AC", type: "clear", className: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "^", type: "operator" },
    { label: "=", type: "equals", className: "bg-blue-600 text-white" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
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

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:border-blue-500 transition-all shadow-sm active:scale-95"
        >
          {copying ? <IconCheck size={18} className="text-green-600" /> : <IconShare size={18} />}
          {copying ? "Link Copied!" : "Share Calculation"}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-4">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => onButtonClick(btn.label, btn.type)}
            className={`
              h-14 md:h-16 rounded-xl text-sm md:text-base font-bold transition-all active:scale-95
              ${btn.className || (btn.type === "mode"
                ? (btn.active ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800" : "bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800")
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-blue-500")}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
