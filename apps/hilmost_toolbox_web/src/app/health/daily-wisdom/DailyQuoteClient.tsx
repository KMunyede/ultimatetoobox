"use client";

import { useRandomQuotes } from "@/hooks/wisdom/useRandomQuotes";
import { QuoteCard, Tooltip } from "@utilitiessite/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function DailyQuoteClient() {
  const { quotes, loading } = useRandomQuotes(5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevScrollRef = useRef<number>(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const containerWidth = scrollContainerRef.current.clientWidth;

      // Calculate index based on scroll position
      const index = Math.round(scrollLeft / containerWidth);
      if (index !== activeIndex && index >= 0 && index < quotes.length) {
        setActiveIndex(index);
      }
      prevScrollRef.current = scrollLeft;
    }
  };

  const scrollToQuote = (index: number) => {
    if (!scrollContainerRef.current || !quotes || quotes.length === 0) return;

    // Simple wrap-around logic
    const targetIndex = (index + quotes.length) % quotes.length;
    const container = scrollContainerRef.current;
    const targetScrollLeft = targetIndex * container.clientWidth;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth"
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm animate-pulse w-full max-w-xl mx-auto">
        <div className="space-y-4 w-3/4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto pt-8"></div>
        </div>
      </div>
    );
  }

  if (!quotes || quotes.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="relative flex items-center w-full px-4 md:px-12">
        {/* Desktop Arrows - Positioned absolutely to be clearly "detached" */}
        <Tooltip content="Previous philosophical insight" position="top">
          <button
            onClick={() => scrollToQuote(activeIndex - 1)}
            className="absolute left-0 z-30 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:border-emerald-500 transition-all text-2xl font-mono font-bold hidden sm:flex -ml-2 md:-ml-7"
            aria-label="Previous quote"
            title="Previous Quote"
          >
            {"<"}
          </button>
        </Tooltip>
        
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-6 pt-2 px-2 items-stretch flex-1 no-scrollbar"
        >
          <style dangerouslySetInnerHTML={{__html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}} />
          {quotes.map((quote) => (
            <div key={quote.id} className="w-full snap-center shrink-0 flex py-2 px-1">
              <QuoteCard quote={quote} showFavorite={true} className="w-full h-full flex-1" />
            </div>
          ))}
        </div>

        <Tooltip content="Next philosophical insight" position="top">
          <button
            onClick={() => scrollToQuote(activeIndex + 1)}
            className="absolute right-0 z-30 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:border-emerald-500 transition-all text-2xl font-mono font-bold hidden sm:flex -mr-2 md:-mr-7"
            aria-label="Next quote"
            title="Next Quote"
          >
            {">"}
          </button>
        </Tooltip>
      </div>
      
      {/* Mobile Navigation */}
      <div className="flex flex-col items-center gap-4 mt-4 w-full">
        <div className="flex items-center justify-between w-full max-w-[280px] sm:hidden">
          <button
            onClick={() => scrollToQuote(activeIndex - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 font-bold font-mono text-2xl"
          >
            {"<"}
          </button>

          <div className="flex justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToQuote(i)}
                aria-label={`Go to quote ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === activeIndex ? "bg-emerald-500 w-6" : "bg-slate-300 dark:bg-slate-700 w-2"}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToQuote(activeIndex + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-emerald-600 font-bold font-mono text-2xl"
          >
            {">"}
          </button>
        </div>
        
        {/* Desktop Indicator (Centered below card) */}
        <div className="hidden sm:flex justify-center gap-2 mt-2">
          {quotes.map((_, i) => (
            <button 
              key={i} 
              onClick={() => scrollToQuote(i)}
              aria-label={`Go to quote ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === activeIndex ? "bg-emerald-500 w-6" : "bg-slate-300 dark:bg-slate-700 w-2"}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

