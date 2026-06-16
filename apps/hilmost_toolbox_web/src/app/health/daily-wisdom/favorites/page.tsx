"use client";

import React, { useEffect, useState } from "react";
import { QuoteCard, QuoteData } from "@utilitiessite/ui";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<QuoteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        setTimeout(() => setFavorites(JSON.parse(stored)), 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setLoading(false), 0);
    }
    
    // We can also set up a storage event listener if we want it to react to changes across tabs
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem("favorites");
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Your <span className="text-amber-500">Favorites</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The wisdom that resonates with you the most. Kept safe for whenever you need a reminder.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <Star className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" />
          <h3 className="text-2xl font-medium text-slate-800 dark:text-slate-200 mb-2">
            No favorites yet
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            When you find a quote that speaks to you, tap the star icon to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} showFavorite={true} />
          ))}
        </div>
      )}
    </div>
  );
}

