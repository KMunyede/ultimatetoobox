"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Tooltip } from "./Tooltip";

interface CopyButtonProps {
  value: string | number;
  label?: string;
  className?: string;
}

export function CopyButton({ value, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Tooltip content={copied ? "Copied!" : (label ? `Copy ${label}` : "Copy to clipboard")}>
      <button
        onClick={handleCopy}
        className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${className}`}
        aria-label={label || "Copy to clipboard"}
      >
        {copied ? (
          <Check size={16} className="text-emerald-500" />
        ) : (
          <Copy size={16} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
        )}
        {label && (
          <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200">
            {copied ? "Copied!" : label}
          </span>
        )}
      </button>
    </Tooltip>
  );
}
