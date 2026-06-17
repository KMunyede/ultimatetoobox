"use client";
import { ToolTutorial } from "@utilitiessite/ui";
import { useUrlState } from "@/hooks/useUrlState";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Hash, Star, Settings2, X, ChevronDown, ChevronUp, Copy, Check, Sparkles } from "lucide-react";
import { findMatches, groupWordsByLength, calculateScrabblePoints } from "@/lib/wordLogic";

export function WordUnscramblerClient() {
  const [state, setState] = useUrlState({
    letters: "",
    language: "en",
    startsWith: "",
    endsWith: "",
    contains: "",
  });

  const { letters, language, startsWith, endsWith, contains } = state;
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchWords = async () => {
    if (!letters || (letters as string).length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/dictionaries/${language}.json`);
      if (!res.ok) throw new Error("Dictionary not found");
      const dictionary: string[] = await res.json();
      
      const matches = findMatches(letters as string, dictionary, {
        startsWith: startsWith as string,
        endsWith: endsWith as string,
        contains: contains as string,
      });

      setResults(matches);
    } catch (e) {
      console.error(e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const groupedResults = useMemo(() => groupWordsByLength(results), [results]);
  const sortedLengths = useMemo(() => Object.keys(groupedResults).map(Number).sort((a, b) => b - a), [groupedResults]);

  const copyToClipboard = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  const tourSteps = [
    { element: '#tour-unscramble-input', popover: { title: '1. Scrambled Letters', description: 'Enter jumbled letters. Use ? or * for blank tiles (wildcards).' } },
    { element: '#tour-unscramble-button', popover: { title: '2. Unscramble Now', description: 'Click this button to trigger the search through our dictionaries.' } },
    { element: '#tour-unscramble-options', popover: { title: '3. Advanced Filters', description: 'Narrow down results by defining how the word should start, end, or what it must contain.' } },
    { element: '#tour-unscramble-results', popover: { title: '4. Found Words', description: 'Words are grouped by length. Click a word to copy it instantly.' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="@container space-y-12"
    >
      <div className="flex justify-end gap-4">
        <ShareButton />
        <ToolTutorial tourId="word_unscrambler" steps={tourSteps} buttonText="How to use" />
      </div>

      {/* Centered Search Hero */}
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div id="tour-unscramble-input" className="bg-canvas-card border border-base rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-shadow/5 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

          <div className="relative space-y-6">
            <div className="space-y-3">
                <div className="flex justify-between items-end px-2">
                  <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">Jumbled Letters</label>
                  <button
                    onClick={() => {
                      setState({ letters: "", startsWith: "", endsWith: "", contains: "" });
                      setResults([]);
                      setHasSearched(false);
                    }}
                    className={`text-xs font-bold text-brand-primary hover:text-brand-hover transition-opacity px-2 py-1 rounded-lg hover:bg-brand-primary/5 ${letters ? 'opacity-100' : 'opacity-0'}`}
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative group flex-1">
                      <input
                          type="text"
                          inputMode="text"
                          spellCheck={false}
                          autoComplete="off"
                          className="w-full h-16 md:h-20 px-6 pl-14 md:pl-16 border border-base rounded-2xl md:rounded-3xl bg-canvas-muted text-text-primary text-2xl md:text-4xl font-black focus:ring-8 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all uppercase placeholder:normal-case shadow-inner"
                          value={letters}
                          onChange={e => setState({ letters: e.target.value.replace(/[^a-zA-Z?*]/g, '') })}
                          onKeyDown={e => e.key === 'Enter' && fetchWords()}
                          placeholder="e.g. oten"
                      />
                      <Search size={28} className="absolute left-5 md:left-6 top-5 md:top-6.5 text-text-muted group-focus-within:text-brand-primary transition-colors" />
                  </div>
                  <button
                    id="tour-unscramble-button"
                    onClick={fetchWords}
                    disabled={loading || (letters as string).length < 2}
                    className="h-16 md:h-20 px-8 md:px-12 bg-brand-primary text-text-inverse font-black text-xl rounded-2xl md:rounded-3xl hover:bg-brand-hover transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles size={24} />
                        Unscramble It
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-text-muted font-medium ml-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                  Use <code className="bg-canvas-muted px-1 rounded text-text-primary">?</code> or <code className="bg-canvas-muted px-1 rounded text-text-primary">*</code> for blank tiles
                </p>
            </div>

            {/* Desktop Action Row / Mobile Stack */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                  <label className="block text-[11px] font-black text-text-muted uppercase tracking-[0.2em] ml-2">Dictionary</label>
                  <div className="relative">
                    <select
                        className="w-full h-14 px-5 pr-12 border border-base rounded-2xl bg-canvas-muted text-text-primary font-extrabold outline-none cursor-pointer hover:bg-canvas-card hover:border-brand-primary/30 transition-all appearance-none shadow-sm"
                        value={language}
                        onChange={e => setState({ language: e.target.value })}
                    >
                        <option value="en">English (US/UK Scrabble)</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-5 top-4.5 text-text-muted pointer-events-none" />
                  </div>
              </div>

              <div className="flex-1 md:flex-[0.6] flex items-end">
                <button
                  id="tour-unscramble-options"
                  onClick={() => setShowOptions(!showOptions)}
                  className={`w-full h-14 flex items-center justify-between px-6 rounded-2xl border transition-all font-black text-sm tracking-tight ${showOptions ? 'bg-brand-primary text-text-inverse border-brand-primary shadow-lg shadow-brand-primary/20' : 'bg-canvas-card border-base text-text-secondary hover:border-brand-primary hover:text-brand-primary hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings2 size={18} />
                    {showOptions ? 'Hide Filters' : 'Advanced Filters'}
                  </div>
                  {showOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showOptions && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-base mt-2">
                    {[
                      { label: "Starts with", key: "startsWith", placeholder: "Prefix" },
                      { label: "Ends with", key: "endsWith", placeholder: "Suffix" },
                      { label: "Must contain", key: "contains", placeholder: "Included" }
                    ].map(filter => (
                      <div key={filter.key} className="space-y-2">
                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-wider ml-1">{filter.label}</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full h-12 px-4 border border-base rounded-xl bg-canvas-muted text-text-primary text-sm font-black focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all uppercase shadow-inner"
                            value={state[filter.key as keyof typeof state]}
                            onChange={e => setState({ [filter.key]: e.target.value.replace(/[^a-zA-Z]/g, '') })}
                            placeholder={filter.placeholder}
                          />
                          {state[filter.key as keyof typeof state] && (
                            <button
                              onClick={() => setState({ [filter.key]: "" })}
                              className="absolute right-3 top-3.5 text-text-muted hover:text-red-500 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Results Section - Full Width Expansion */}
      <div id="tour-unscramble-results" className="min-h-[500px]">
          <AnimatePresence mode="wait">
              {loading ? (
                  <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="h-96 flex flex-col items-center justify-center space-y-6">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-brand-primary/10 rounded-full" />
                        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
                      </div>
                      <div className="text-center">
                        <p className="font-black text-text-primary uppercase tracking-[0.2em] text-sm mb-1">Scanning Dictionary</p>
                        <p className="text-xs text-text-muted font-medium">Matching your letters across thousands of words...</p>
                      </div>
                  </motion.div>
              ) : results.length > 0 ? (
                  <motion.div key="results" initial={{opacity:0, y: 20}} animate={{opacity:1, y: 0}} className="space-y-12">
                      {sortedLengths.map((len) => (
                        <div key={len} className="space-y-6">
                          <div className="flex items-center gap-6">
                            <h3 className="text-2xl font-black text-text-primary tracking-tighter whitespace-nowrap">
                              {len} <span className="text-text-muted">Letter Words</span>
                            </h3>
                            <div className="h-px w-full bg-gradient-to-r from-border-base to-transparent" />
                            <div className="flex items-center gap-2 bg-canvas-card border border-base px-3 py-1.5 rounded-full shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-brand-primary" />
                              <span className="text-xs font-black text-text-secondary uppercase tracking-widest whitespace-nowrap">
                                {groupedResults[len].length}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                              {groupedResults[len].map((word) => {
                                const score = calculateScrabblePoints(word);
                                return (
                                  <button
                                    key={word}
                                    onClick={() => copyToClipboard(word)}
                                    className="group relative bg-canvas-card border border-base p-5 rounded-[1.25rem] flex items-center justify-between hover:border-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                                  >
                                    <div className="flex flex-col items-start">
                                      <span className="text-xl font-black text-text-primary group-hover:text-brand-primary transition-colors uppercase tracking-tight">
                                        {word}
                                      </span>
                                      <div className="flex items-center gap-1 mt-0.5">
                                        <span className="text-[10px] font-black text-text-muted group-hover:text-brand-primary/70 uppercase tracking-tighter transition-colors">
                                          {score} Points
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-text-muted group-hover:text-brand-primary transition-all">
                                      {copiedWord === word ? (
                                        <Check size={20} className="text-brand-primary" />
                                      ) : (
                                        <Copy size={18} className="opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                          </div>
                        </div>
                      ))}
                  </motion.div>
              ) : hasSearched ? (
                  <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} className="max-w-xl mx-auto flex flex-col items-center justify-center text-center p-16 bg-canvas-card border border-base rounded-[3rem] shadow-sm">
                      <div className="w-24 h-24 bg-canvas-muted rounded-full flex items-center justify-center mb-8 border border-base shadow-inner">
                        <Hash size={40} className="text-text-muted opacity-30" />
                      </div>
                      <h3 className="text-2xl font-black text-text-primary tracking-tight mb-3">No anagrams found</h3>
                      <p className="text-text-secondary leading-relaxed font-medium">
                        We couldn&apos;t find any valid words using those exact letters and filters. Try adding wildcards (<code className="bg-canvas-muted px-1 rounded">?</code>) to unlock more possibilities.
                      </p>
                  </motion.div>
              ) : (
                  <motion.div key="start" initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto h-80 flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-base rounded-[3.5rem] opacity-40">
                      <Star size={64} className="text-brand-primary opacity-20 mb-6 animate-pulse" />
                      <h3 className="text-xl font-extrabold text-text-primary tracking-tight">Lexicon Ready</h3>
                      <p className="text-sm text-text-muted mt-2 font-bold max-w-xs">
                        Enter your letters above and click <span className="text-brand-primary">Unscramble It</span> to scan through the dictionary.
                      </p>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>
    </motion.div>
  );
}
