import React from "react";

interface ScientificNumberProps {
  value: number;
  precision?: number; // Defaults to 4
  className?: string;
  suffix?: string; // Optional unit
}

function formatWithCommas(str: string) {
  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function ScientificNumber({ value, precision = 4, className = "", suffix }: ScientificNumberProps) {
  if (isNaN(value) || !isFinite(value)) return <span className={className}>Invalid</span>;

  // For numbers between 0.001 and 1000000, show them normally with grouping
  const absValue = Math.abs(value);
  if (absValue === 0 || (absValue >= 0.001 && absValue < 1000000)) {
    const rawStr = Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(precision)).toString();
    const formattedStr = formatWithCommas(rawStr);
    return (
      <span className={className}>
        {formattedStr} {suffix && <span className="text-[0.5em] text-slate-500 font-medium ml-1 uppercase">{suffix}</span>}
      </span>
    );
  }

  // Large or very small numbers get scientific notation
  const expStr = value.toExponential(precision);
  const parts = expStr.split("e");
  const baseStr = formatWithCommas(parseFloat(parts[0]).toString());
  const exponentStr = parts[1].replace("+", "");

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{baseStr} &times; 10</span>
      <sup className="text-[0.6em] ml-0.5">{exponentStr}</sup>
      {suffix && <span className="text-[0.5em] text-slate-500 font-medium ml-1 uppercase">{suffix}</span>}
    </span>
  );
}
