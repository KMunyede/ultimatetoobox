"use client";

import { useState, useEffect } from "react";

export interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: number;
}

export function useHistory(type: string) {
  const key = `hilmost_calc_history_${type}`;
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, [key]);

  const addEntry = (expression: string, result: string) => {
    const newEntry: HistoryEntry = {
      expression,
      result,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newEntry, ...prev.filter(e => e.expression !== expression || e.result !== result)];
      const limited = updated.slice(0, 50);
      localStorage.setItem(key, JSON.stringify(limited));
      return limited;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(key);
    setHistory([]);
  };

  return { history, addEntry, clearHistory };
}
