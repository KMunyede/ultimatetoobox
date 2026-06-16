import React from "react";

interface ScientificNumberProps {
  value: number;
  precision?: number; // Defaults to 4
  className?: string;
  suffix?: string; // Optional unit
}

export function ScientificNumber({ value, precision = 4, className = "", suffix }: ScientificNumberProps) {
  if (isNaN(value) || !isFinite(value)) return <span className={className}>Invalid</span>;

  // For numbers between 0.001 and 10000, we might just want to show them normally
  const absValue = Math.abs(value);
  if (absValue > 0 && (absValue >= 0.001 && absValue < 10000)) {
    // Normal floating point display, rounded nicely
    // If it's an integer, toFixed isn't necessary, but let's just do standard formatting
    const formattedStr = Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(precision)).toString();
    return (
      <span className={className}>
        {formattedStr} {suffix && <span className="text-sm text-slate-500 font-medium ml-1">{suffix}</span>}
      </span>
    );
  }

  // Large or very small numbers get scientific notation
  const expStr = value.toExponential(precision);
  // Example: "5.9720e+24"
  const parts = expStr.split("e");
  const baseStr = parseFloat(parts[0]).toString(); // remove trailing zeros
  const exponentStr = parts[1].replace("+", ""); // remove the '+' from '+24'

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{baseStr} &times; 10</span>
      <sup className="text-[0.6em] ml-0.5">{exponentStr}</sup>
      {suffix && <span className="text-sm text-slate-500 font-medium ml-1">{suffix}</span>}
    </span>
  );
}
