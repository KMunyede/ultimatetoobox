import { useState, useEffect } from "react";
import { Quote, fallbackQuotes } from "@/lib/wisdom/fallbackQuotes";

export function useRandomQuotes(count: number = 5) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try session storage first
    const stored = typeof window !== 'undefined' ? sessionStorage.getItem('daily_wisdom_quotes') : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Quote[];
        setQuotes(parsed);
        setLoading(false);
        return;
      } catch (e) { /* ignore and fallback */ }
    }
    // Fallback to random selection
    const shuffled = [...fallbackQuotes].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    setQuotes(selected);
    setLoading(false);
    // Save for this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('daily_wisdom_quotes', JSON.stringify(selected));
    }
  }, [count]);

  return { quotes, loading };
}
