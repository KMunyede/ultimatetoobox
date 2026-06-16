"use client";
import { useState, useEffect } from "react";
import { ToolTutorial } from "@utilitiessite/ui";
import { Search } from "lucide-react";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";

const cachedDicts: Record<string, string[]> = {};

export function WordUnscramblerClient() {
  const [state, setState] = useUrlState({
    letters: "",
    language: "en"
  });

  const { letters, language } = state as { letters: string, language: string };
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (currentLetters: string, currentLanguage: string) => {
    const cleanLetters = currentLetters.trim().toLowerCase();
    if (!cleanLetters) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      if (!cachedDicts[currentLanguage]) {
        const url = currentLanguage === 'en' 
          ? "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json"
          : `/dictionaries/${currentLanguage}.json`;
          
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch dictionary for ${currentLanguage}`);
        const data = await response.json();
        
        cachedDicts[currentLanguage] = Array.isArray(data) ? data : Object.keys(data);
      }
      
      const currentDict = cachedDicts[currentLanguage];

      const inputCounts: Record<string, number> = {};
      for (const char of cleanLetters) {
        inputCounts[char] = (inputCounts[char] || 0) + 1;
      }

      const validWords = currentDict.filter(word => {
        if (word.length <= 1 || word.length > cleanLetters.length) return false;
        const wordCounts: Record<string, number> = {};
        for (const char of word) {
          wordCounts[char] = (wordCounts[char] || 0) + 1;
          if (wordCounts[char] > (inputCounts[char] || 0)) {
            return false;
          }
        }
        return true;
      });

      validWords.sort((a, b) => b.length - a.length || a.localeCompare(b));
      setResults(validWords);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load auto-search if state is present
    if (letters) {
      setTimeout(() => {
        performSearch(letters, language);
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnscramble = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    performSearch(letters, language);
  };

  const handleClear = () => {
    setState({ letters: "" });
    setResults([]);
    setHasSearched(false);
  };

  const tourSteps = [
    { element: '#tour-wu-input', popover: { title: '1. Enter Letters', description: 'Type the scrambled letters you want to make words from.' } },
    { element: '#tour-wu-lang', popover: { title: '2. Select Dictionary', description: 'Optionally choose a different language to search in.' } },
    { element: '#tour-wu-btn', popover: { title: '3. Unscramble', description: 'Click here to find all valid words that can be made.' } },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-end gap-2">
        <ShareButton />
        <ToolTutorial tourId="word_unscrambler" steps={tourSteps} buttonText="How to use" />
      </div>
      <form onSubmit={handleUnscramble} className="flex flex-col items-center gap-4 max-w-2xl mx-auto">
        <motion.input
          id="tour-wu-input"
          layout
          type="text"
          className="w-full h-16 px-6 text-2xl text-center font-semibold tracking-wider border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none uppercase shadow-sm"
          placeholder="ENTER LETTERS (e.g., ACT)"
          value={letters}
          onChange={(e) => setState({ letters: e.target.value.replace(/[^a-zA-Z]/g, '') })}
          maxLength={15}
        />
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="tour-wu-btn"
            type="submit"
            disabled={loading || !letters}
            className="h-14 px-8 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Unscrambling..." : <><Search size={20} /> Unscramble It</>}
          </motion.button>
          <select
            id="tour-wu-lang"
            value={language}
            onChange={(e) => {
              setState({ language: e.target.value });
              setResults([]);
              setHasSearched(false);
            }}
            className="h-14 px-4 text-base font-medium border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
          >
            <option value="en">English (Default)</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese (BR)</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleClear}
            disabled={loading || !letters}
            className="h-14 px-6 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Clear
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {hasSearched && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Found {results.length} words
            </h3>
            {results.length > 0 ? (
              <div className="space-y-8">
                {Array.from(new Set(results.map(w => w.length)))
                  .sort((a, b) => b - a)
                  .map(length => {
                    const wordsOfLength = results.filter(w => w.length === length);
                    return (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={length} 
                        className="space-y-3"
                      >
                        <h4 className="text-md font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 pb-2">
                          {length} Letter Words <span className="text-sm font-normal text-slate-400 ml-1">({wordsOfLength.length})</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {wordsOfLength.map((word, i) => (
                            <motion.span 
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.01 }}
                              key={i} 
                              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg font-medium text-lg uppercase shadow-sm"
                            >
                              {word}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No words found for these letters.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
