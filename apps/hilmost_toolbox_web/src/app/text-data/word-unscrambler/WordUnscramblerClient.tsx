"use client";
import { useUrlState } from "@/hooks/useUrlState";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Hash, Star, Settings2, X, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { findMatches } from "@/lib/wordLogic";
import dynamic from "next/dynamic";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";

const WordResults = dynamic(() => import("./WordResults"), {
  loading: () => (
    <div className="h-64 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grouping Results...</p>
    </div>
  ),
  ssr: false,
});

export function WordUnscramblerClient() {
  const [state, setState] = useUrlState({
    letters: "",
    language: "en",
    startsWith: "",
    endsWith: "",
    contains: "",
  });

  const { letters, language, startsWith, endsWith, contains } = state as {
    letters: string;
    language: string;
    startsWith: string;
    endsWith: string;
    contains: string;
  };

  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchWords = async () => {
    if (!letters || letters.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const inputLen = letters.length;
      const fetchPromises = [];
      
      for (let i = 2; i <= Math.min(inputLen, 15); i++) {
        fetchPromises.push(
          fetch(`/dictionaries/${language}/${i}.json`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
        );
      }

      const dictionaryParts = await Promise.all(fetchPromises);
      const combinedDictionary = dictionaryParts.flat();

      const worker = new Worker(new URL('@/lib/wordWorker.ts', import.meta.url));

      worker.postMessage({
        letters: letters,
        dictionary: combinedDictionary,
        options: {
          startsWith: startsWith,
          endsWith: endsWith,
          contains: contains,
        }
      });

      worker.onmessage = (e) => {
        setResults(e.data);
        setLoading(false);
        worker.terminate();
      };

      worker.onerror = (err) => {
        console.error("Worker error:", err);
        const matches = findMatches(letters, combinedDictionary, {
          startsWith: startsWith,
          endsWith: endsWith,
          contains: contains,
        });
        setResults(matches);
        setLoading(false);
        worker.terminate();
      };

    } catch (e) {
      console.error("Unscramble error:", e);
      setResults([]);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-8 my-8"
    >
      <div className="max-w-4xl mx-auto w-full space-y-4">
        <div id="tour-unscramble-input" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />

          <div className="relative space-y-6">
            <div className="space-y-1.5">
                <div className="flex justify-between items-end px-1">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Jumbled Letters</label>
                  <button
                    onClick={() => {
                      setState({ letters: "", startsWith: "", endsWith: "", contains: "" });
                      setResults([]);
                      setHasSearched(false);
                    }}
                    className={`text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline transition-opacity ${letters ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-col @[600px]:flex-row gap-3">
                  <div className="relative group flex-1">
                      <Input
                          type="text"
                          inputMode="text"
                          spellCheck={false}
                          autoComplete="off"
                          className="pl-12 @[600px]:pl-14 text-xl @[600px]:text-2xl font-black uppercase placeholder:normal-case shadow-inner"
                          value={letters}
                          onChange={e => setState({ letters: e.target.value.replace(/[^a-zA-Z?*]/g, '') })}
                          onKeyDown={e => e.key === 'Enter' && fetchWords()}
                          placeholder="e.g. oten"
                      />
                      <Search size={22} className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-brand-primary transition-colors pointer-events-none" />
                  </div>
                  <Button
                    id="tour-unscramble-button"
                    onClick={fetchWords}
                    disabled={loading || letters.length < 2}
                    className="!py-3 !px-8 h-full"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Unscramble
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-primary/40" />
                  Use <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-slate-900 dark:text-white">?</code> or <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-slate-900 dark:text-white">*</code> for blank tiles
                </p>
            </div>

            <div className="flex flex-col @[600px]:flex-row gap-4">
              <div className="flex-1">
                <Select
                  label="Dictionary"
                  value={language}
                  onChange={e => setState({ language: e.target.value })}
                  options={[
                    { label: "English (Scrabble)", value: "en" },
                    { label: "French", value: "fr" },
                    { label: "German", value: "de" },
                    { label: "Spanish", value: "es" },
                    { label: "Italian", value: "it" },
                    { label: "Portuguese", value: "pt" },
                  ]}
                />
              </div>

              <div className="flex-1 @[600px]:md:flex-[0.6] flex items-end">
                <Button
                  id="tour-unscramble-options"
                  onClick={() => setShowOptions(!showOptions)}
                  variant="secondary"
                  className="w-full !py-3 h-[46px] !text-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <Settings2 size={16} />
                    {showOptions ? 'Hide Filters' : 'Advanced Filters'}
                  </div>
                  {showOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 @[600px]:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                    {[
                      { label: "Starts with", key: "startsWith", placeholder: "Prefix" },
                      { label: "Ends with", key: "endsWith", placeholder: "Suffix" },
                      { label: "Must contain", key: "contains", placeholder: "Included" }
                    ].map(filter => (
                      <div key={filter.key} className="relative">
                        <Input
                          label={filter.label}
                          type="text"
                          className="font-black uppercase shadow-inner"
                          value={state[filter.key as keyof typeof state]}
                          onChange={e => setState({ [filter.key]: e.target.value.replace(/[^a-zA-Z]/g, '') })}
                          placeholder={filter.placeholder}
                        />
                        {state[filter.key as keyof typeof state] && (
                          <button
                            onClick={() => setState({ [filter.key]: "" })}
                            className="absolute right-3 bottom-3 text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div id="tour-unscramble-results" className="min-h-[500px]">
          <AnimatePresence mode="wait">
              {loading ? (
                  <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-96 flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="w-16 h-14 border-4 border-brand-primary/10 rounded-full" />
                        <div className="w-16 h-14 border-4 border-brand-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] text-sm mb-1">Scanning Dictionary</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Matching your letters across thousands of words...</p>
                      </div>
                  </motion.div>
              ) : results.length > 0 ? (
                  <WordResults results={results} />
              ) : hasSearched ? (
                  <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="max-w-xl mx-auto flex flex-col items-center justify-center text-center p-16 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-sm">
                      <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 border border-[#D8D6CF] dark:border-slate-700 shadow-inner">
                        <Hash size={40} className="text-slate-300" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3 uppercase">No anagrams found</h3>
                      <p className="text-slate-500 text-sm leading-relaxed font-bold uppercase tracking-widest">
                        We couldn&apos;t find any valid words using those exact letters and filters. Try adding wildcards (<code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">?</code>) to unlock more possibilities.
                      </p>
                  </motion.div>
              ) : (
                  <motion.div key="start" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto h-80 flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3.5rem] opacity-40">
                      <Star size={64} className="text-brand-primary opacity-20 mb-6 animate-pulse" />
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Lexicon Ready</h3>
                      <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-[0.2em] max-w-xs">
                        Enter your letters above and click <span className="text-brand-primary underline">Unscramble</span> to scan through the dictionary.
                      </p>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>
    </motion.div>
  );
}
