import React from "react";

interface ScientificNumberProps {
  value: number;
  precision?: number; // Defaults to 4
  className?: string;
  suffix?: string; // Optional unit (e.g. "N")
  prefix?: string; // Optional prefix (e.g. "$")
  multiLine?: boolean;
}

function formatWithCommas(str: string) {
  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function ScientificNumber({ value, precision = 4, className = "", suffix, prefix, multiLine = false }: ScientificNumberProps) {
  if (isNaN(value) || !isFinite(value)) return <span className={className}>Invalid</span>;

  // For numbers between 0.001 and 1000000, show them normally with grouping
  const absValue = Math.abs(value);
  if (absValue === 0 || (absValue >= 0.001 && absValue < 1000000)) {
    const rawStr = Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(precision)).toString();
    const formattedStr = formatWithCommas(rawStr);
    return (
      <span className={className}>
        {prefix}{formattedStr} {suffix && <span className="text-[0.4em] text-slate-500 font-medium ml-1 uppercase">{suffix}</span>}
      </span>
    );
  }

  // Large or very small numbers get scientific notation
  const expStr = value.toExponential(precision);
  const parts = expStr.split("e");
  const baseStr = formatWithCommas(parseFloat(parts[0]).toString());
  const exponentStr = parts[1].replace("+", "");

  if (multiLine) {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        {/* Line 1: Mantissa with prefix */}
        <div className="leading-tight tracking-tight font-normal">
          {prefix}{baseStr}
        </div>

        {/* Line 2: Scale (x 10 ^ x) with suffix */}
        <div className="leading-tight tracking-tight font-normal flex items-center justify-center gap-2">
          <span>x 10 ^ {exponentStr}</span>
          {suffix && <span className="uppercase">{suffix}</span>}
        </div>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{prefix}{baseStr} &times; 10</span>
      <sup className="text-[0.6em] ml-0.5">{exponentStr}</sup>
      {suffix && <span className="text-[0.5em] text-slate-500 font-medium ml-1 uppercase">{suffix}</span>}
    </span>
  );
}
