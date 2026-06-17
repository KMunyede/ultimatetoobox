"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Hash, Star } from "lucide-react";

export function WordUnscramblerClient() {
  const [state, setState] = useUrlState({
    letters: "",
    language: "en",
  });

  const { letters, language } = state;
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWords = async () => {
    if (!letters || (letters as string).length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/dictionaries/${language}.json`);
      const dictionary: string[] = await res.json();
      
      const target = (letters as string).toLowerCase().split('').sort().join('');
      const matches = dictionary.filter(word => {
        if (word.length !== target.length) return false;
        return word.toLowerCase().split('').sort().join('') === target;
      });

      setResults(matches);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchWords(), 300);
    return () => clearTimeout(timer);
  }, [letters, language]);

  const tourSteps = [
    { element: '#tour-unscramble-input', popover: { title: '1. Scrambled Letters', description: 'Enter the jumbled letters you want to solve (e.g. "tac").' } },
    { element: '#tour-unscramble-results', popover: { title: '2. Found Words', description: 'Any valid words found in the dictionary will appear here instantly.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-6"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="word_unscrambler" steps={tourSteps} buttonText="How to use" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Control Panel */}
        <div id="tour-unscramble-input" className="bg-canvas-card border border-base rounded-3xl p-6 md:p-8 space-y-6 shadow-sm h-fit">
            <div className="space-y-2">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Jumbled Letters</label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full h-14 px-4 pl-12 border border-base rounded-xl bg-canvas-muted text-text-primary text-xl font-black focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all uppercase placeholder:normal-case"
                        value={letters}
                        onChange={e => setState({ letters: e.target.value.replace(/[^a-zA-Z]/g, '') })}
                        placeholder="e.g. oten"
                    />
                    <Search size={20} className="absolute left-4 top-4 text-text-muted" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Dictionary</label>
                <select
                    className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-card text-text-primary font-bold outline-none cursor-pointer hover:bg-canvas-muted transition-all"
                    value={language}
                    onChange={e => setState({ language: e.target.value })}
                >
                    <option value="en">English (US/UK)</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italian</option>
                </select>
            </div>
        </div>

        {/* Results Display */}
        <div id="tour-unscramble-results" className="md:col-span-3 min-h-[400px]">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-full flex flex-col items-center justify-center space-y-4 opacity-50">
                        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                        <p className="font-bold text-text-muted uppercase tracking-widest text-xs">Consulting Lexicon...</p>
                    </motion.div>
                ) : results.length > 0 ? (
                    <motion.div key="results" initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {results.map((word) => (
                            <div key={word} className="bg-canvas-card border border-base p-6 rounded-2xl flex flex-col items-center justify-center group hover:border-brand-primary hover:shadow-lg transition-all active:scale-95 cursor-default">
                                <span className="text-2xl font-black text-text-primary group-hover:text-brand-primary transition-colors">{word}</span>
                                <div className="mt-2 h-1 w-8 bg-brand-primary/10 rounded-full group-hover:w-12 transition-all" />
                            </div>
                        ))}
                    </motion.div>
                ) : letters ? (
                    <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="h-full flex flex-col items-center justify-center text-center p-12 bg-canvas-card border border-dashed border-base rounded-3xl">
                        <Hash size={48} className="text-text-muted opacity-20 mb-4" />
                        <p className="text-text-primary font-bold">No valid anagrams found</p>
                        <p className="text-sm text-text-muted mt-1">Try adding more letters or changing the dictionary.</p>
                    </motion.div>
                ) : (
                    <motion.div key="start" initial={{opacity:0}} animate={{opacity:1}} className="h-full flex flex-col items-center justify-center text-center p-12">
                        <Star size={48} className="text-brand-primary opacity-10 mb-4" />
                        <p className="text-text-muted font-medium italic">Enter some letters to begin unscrambling</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
