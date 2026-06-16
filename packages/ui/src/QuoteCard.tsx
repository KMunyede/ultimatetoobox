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
    <div className={`relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-lg shadow-emerald-900/5 transition-all min-h-[250px] group flex flex-col justify-between ${className}`}>
      <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-5 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 duration-700 pointer-events-none">
        <Quote size={200} />
      </div>
      
      {showFavorite && (
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            className={`w-6 h-6 transition-colors ${isFavorite ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`} 
          />
        </button>
      )}
      
      <div className="relative z-10 text-center space-y-6 flex-1 flex flex-col justify-center">
        <Quote className="w-8 h-8 text-emerald-500 mx-auto opacity-50 mb-2" />
        <h2 className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 italic font-serif break-words whitespace-pre-wrap">
          "{quote.text}"
        </h2>
      </div>
        
      <div className="pt-6 relative z-10 text-center">
        <div className="h-px w-12 bg-emerald-200 dark:bg-emerald-800/50 mx-auto mb-4"></div>
        <p className="text-sm md:text-base font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          {quote.philosopher}
        </p>
      </div>
    </div>
  );
}
