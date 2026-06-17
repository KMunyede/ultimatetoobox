"use client";

import React, { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";

export interface QuoteData {
  id: string;
  text: string;
  philosopher: string;
}

interface QuoteCardProps {
  quote: QuoteData;
  className?: string;
  showFavorite?: boolean;
}

export function QuoteCard({ quote, className = "", showFavorite = true }: QuoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check local storage on mount
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        const favorites: QuoteData[] = JSON.parse(stored);
        setIsFavorite(favorites.some((f) => f.id === quote.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [quote.id]);

  const toggleFavorite = () => {
    try {
      const stored = localStorage.getItem("favorites");
      let favorites: QuoteData[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter((f) => f.id !== quote.id);
      } else {
        favorites.push(quote);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`@container group relative flex min-h-[250px] flex-col justify-between rounded-3xl border border-base bg-canvas-card p-6 transition-all shadow-lg shadow-emerald-900/5 @md:p-10 ${className}`}>
      <div className="pointer-events-none absolute top-0 right-0 -mt-8 -mr-8 text-brand-primary opacity-5 transition-transform duration-700 group-hover:scale-110">
        <Quote size={200} />
      </div>
      
      {showFavorite && (
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-20 rounded-full p-2 transition-colors hover:bg-canvas-muted"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            className={`h-6 w-6 transition-colors ${isFavorite ? "fill-amber-400 text-amber-400" : "text-text-muted"}`}
          />
        </button>
      )}
      
      <div className="relative z-10 flex flex-1 flex-col justify-center space-y-6 text-center">
        <Quote className="mx-auto mb-2 h-8 w-8 text-brand-primary opacity-50 @md:h-12 @md:w-12" />
        <h2 className="font-serif text-base italic font-medium leading-relaxed text-text-primary break-words whitespace-pre-wrap @sm:text-lg @md:text-2xl @lg:text-3xl">
          "{quote.text}"
        </h2>
      </div>
        
      <div className="relative z-10 pt-6 text-center @md:pt-10">
        <div className="mx-auto mb-4 h-px w-12 bg-emerald-200 dark:bg-emerald-800/50"></div>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary @md:text-base">
          {quote.philosopher}
        </p>
      </div>
    </div>
  );
}
