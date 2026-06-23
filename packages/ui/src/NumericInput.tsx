"use client";

import React, { useState, useEffect } from "react";

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
}

/**
 * A specialized input component for numeric values that automatically
 * formats the display with thousand separators (commas).
 */
export function NumericInput({ value, onChange, className, ...props }: NumericInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Function to format the numeric string with commas
  const formatValue = (val: string) => {
    if (!val) return "";

    // Split into integer and fractional parts
    const parts = val.split(".");

    // Add commas to integer part
    // We only keep digits in the integer part for formatting
    const integerPart = parts[0].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct with fractional part if it exists
    if (parts.length > 1) {
      // Keep only digits in fractional part
      const fractionalPart = parts[1].replace(/\D/g, "");
      return `${integerPart}.${fractionalPart}`;
    }

    return integerPart;
  };

  // Keep display in sync with internal value
  useEffect(() => {
    const formatted = formatValue(value?.toString() || "");
    setDisplayValue(formatted);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove commas to get the raw numeric value
    const rawValue = inputValue.replace(/,/g, "");

    // Validate: only digits and at most one decimal point
    if (/^\d*\.?\d*$/.test(rawValue)) {
      onChange(rawValue);
    }
  };

  return (
    <input
      {...props}
      type="text"
      inputMode="decimal"
      className={className}
      value={displayValue}
      onChange={handleChange}
    />
  );
}
