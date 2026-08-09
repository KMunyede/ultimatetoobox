"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "./Input";

interface SearchableSelectProps {
  value: string;
  options: { label: string; value: string; searchTerms?: string }[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  formatDisplay?: (val: string) => string;
}

export function SearchableSelect({
  value,
  options,
  onChange,
  placeholder,
  className,
  label,
  formatDisplay = (v) => v
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return options
      .filter(o =>
        o.label.toLowerCase().includes(s) ||
        o.value.toLowerCase().includes(s) ||
        (o.searchTerms && o.searchTerms.toLowerCase().includes(s))
      )
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [options, search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Find the label for the current value
  const currentLabel = useMemo(() => {
    const opt = options.find(o => o.value === value);
    return opt ? opt.label : value;
  }, [options, value]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative group">
        <Input
          label={label}
          type="text"
          value={isOpen ? search : formatDisplay(currentLabel)}
          placeholder={placeholder}
          onFocus={() => { setIsOpen(true); setSearch(""); }}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
        <Search size={14} className="absolute right-3 bottom-3.5 text-slate-400 group-focus-within:text-brand-primary pointer-events-none" />
      </div>
      {isOpen && (
        <div className="absolute z-[70] mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-slate-900 border border-[#D8D6CF] dark:border-slate-800 rounded-lg shadow-2xl custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
          {filtered.length > 0 ? filtered.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setIsOpen(false); setSearch(""); }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-primary/10 hover:text-brand-primary transition-colors ${opt.value === value ? 'bg-brand-primary/5 text-brand-primary font-normal' : 'text-black dark:text-white'}`}
            >
              {formatDisplay(opt.label)}
            </button>
          )) : <div className="p-4 text-xs text-black dark:text-white text-center">No results found</div>}
        </div>
      )}
    </div>
  );
}
