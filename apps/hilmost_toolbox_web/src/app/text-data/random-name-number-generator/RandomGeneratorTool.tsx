"use client";

import React, { useState, useCallback } from "react";
import { RefreshCw, Copy, Hash, User, Download } from "lucide-react";
import { CopyButton, Tooltip } from "@utilitiessite/ui";
import { Button } from "../../../components/ui/Button";
import { NumberInput } from "../../../components/ui/NumberInput";
import { PillSelector } from "../../../components/ui/PillSelector";
import { Select } from "../../../components/ui/Select";

// Mock Data for Names
const FIRST_NAMES_MALE = ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Christopher", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua"];
const FIRST_NAMES_FEMALE = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle"];
const FIRST_NAMES_NEUTRAL = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Cameron", "Skyler", "Quinn", "Avery", "Parker", "Sawyer", "Dakota", "Peyton", "Emerson", "Sage", "Rowan", "Finley", "Charlie", "Phoenix"];

const SURNAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzales", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

const USERNAME_ADJECTIVES = ["Swift", "Bright", "Cool", "Epic", "Neon", "Silent", "Active", "Bold", "Candid", "Dark", "Elite", "Fancy", "Global", "Hyper", "Iconic", "Just", "Kind", "Lucky", "Mega", "Noble"];
const USERNAME_NOUNS = ["Falcon", "Tiger", "Coder", "Gamer", "Runner", "Pixel", "Nova", "Apex", "Zenith", "Orbit", "Pulse", "Rogue", "Spark", "Titan", "Vortex", "Wave", "Xenon", "Yield", "Zebra", "Alpha"];

const TEAM_PREFIXES = ["The", "Golden", "Iron", "Red", "Blue", "Shadow", "Elite", "Alpha", "Global", "Dynamic", "Stellar", "Mighty", "Royal", "Savage", "Thunder", "Vortex", "Wild", "Zenith"];
const TEAM_NOUNS = ["Warriors", "Eagles", "Titans", "Legends", "Knights", "Spartans", "Wolves", "Panthers", "Dragons", "Giants", "Sharks", "Falcons", "Raptors", "Cobras", "Vipers", "Storm"];

type Mode = "number" | "name";

export function RandomGeneratorTool() {
  const [mode, setMode] = useState<Mode>("number");

  // Number Mode State
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [numCount, setNumCount] = useState("1");
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false);
  const [precision, setPrecision] = useState("2");

  // Name Mode State
  const [nameCategory, setNameCategory] = useState("full");
  const [gender, setGender] = useState("neutral");
  const [nameCount, setNameCount] = useState("1");

  const [results, setResults] = useState<string[]>([]);

  const getRandomInt = (minVal: number, maxVal: number) => {
    const range = maxVal - minVal + 1;
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return minVal + (array[0] % range);
  };

  const getRandomFloat = (minVal: number, maxVal: number, prec: number) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randomFraction = array[0] / 0xFFFFFFFF;
    const val = minVal + randomFraction * (maxVal - minVal);
    return val.toFixed(prec);
  };

  const generateNumbers = useCallback(() => {
    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);
    const countVal = parseInt(numCount);
    const prec = parseInt(precision);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal) || minVal > maxVal) return;

    const newResults: string[] = [];
    if (!isDecimal && !allowDuplicates && (maxVal - minVal + 1) < countVal) {
        // Not enough unique numbers in range
        setResults(["Error: Range too small for unique values"]);
        return;
    }

    if (!isDecimal && !allowDuplicates) {
        const uniqueSet = new Set<number>();
        while (uniqueSet.size < countVal) {
            uniqueSet.add(getRandomInt(minVal, maxVal));
        }
        uniqueSet.forEach(n => newResults.push(n.toString()));
    } else {
        for (let i = 0; i < countVal; i++) {
            if (isDecimal) {
                newResults.push(getRandomFloat(minVal, maxVal, prec));
            } else {
                newResults.push(getRandomInt(minVal, maxVal).toString());
            }
        }
    }
    setResults(newResults);
  }, [min, max, numCount, allowDuplicates, isDecimal, precision]);

  const generateNames = useCallback(() => {
    const countVal = parseInt(nameCount);
    const newResults: string[] = [];

    for (let i = 0; i < countVal; i++) {
      let name = "";
      if (nameCategory === "first") {
        const pool = gender === "male" ? FIRST_NAMES_MALE : gender === "female" ? FIRST_NAMES_FEMALE : FIRST_NAMES_NEUTRAL;
        name = pool[getRandomInt(0, pool.length - 1)];
      } else if (nameCategory === "full") {
        const firstPool = gender === "male" ? FIRST_NAMES_MALE : gender === "female" ? FIRST_NAMES_FEMALE : FIRST_NAMES_NEUTRAL;
        const first = firstPool[getRandomInt(0, firstPool.length - 1)];
        const last = SURNAMES[getRandomInt(0, SURNAMES.length - 1)];
        name = `${first} ${last}`;
      } else if (nameCategory === "username") {
        const adj = USERNAME_ADJECTIVES[getRandomInt(0, USERNAME_ADJECTIVES.length - 1)];
        const noun = USERNAME_NOUNS[getRandomInt(0, USERNAME_NOUNS.length - 1)];
        const num = getRandomInt(10, 99);
        name = `${adj}${noun}${num}`;
      } else if (nameCategory === "team") {
        const pre = TEAM_PREFIXES[getRandomInt(0, TEAM_PREFIXES.length - 1)];
        const noun = TEAM_NOUNS[getRandomInt(0, TEAM_NOUNS.length - 1)];
        name = `${pre} ${noun}`;
      }
      newResults.push(name);
    }
    setResults(newResults);
  }, [nameCategory, gender, nameCount]);

  const handleGenerate = () => {
    if (mode === "number") generateNumbers();
    else generateNames();
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([results.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "hilmost-random-results.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8" id="tour-mode-toggle">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-base">
            <button
              onClick={() => { setMode("number"); setResults([]); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-normal transition-all ${mode === "number" ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Hash size={18} /> Random Number
            </button>
            <button
              onClick={() => { setMode("name"); setResults([]); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-normal transition-all ${mode === "name" ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <User size={18} /> Random Name
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Settings Section */}
          <div className="space-y-8">
            {mode === "number" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <NumberInput label="Min Value" value={min} onChange={setMin} />
                  <NumberInput label="Max Value" value={max} onChange={setMax} />
                </div>
                <PillSelector
                  label="Results Quantity"
                  value={numCount}
                  onChange={setNumCount}
                  options={[
                    { label: "1", value: "1" },
                    { label: "5", value: "5" },
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                  ]}
                />
                <div className="space-y-4">
                   <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                     <span className="text-xs font-normal uppercase tracking-tight text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Allow Duplicates</span>
                     <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                     </div>
                   </label>
                   <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                     <span className="text-xs font-normal uppercase tracking-tight text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Generate Decimals</span>
                     <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isDecimal} onChange={(e) => setIsDecimal(e.target.checked)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                     </div>
                   </label>
                   {isDecimal && (
                     <PillSelector
                       label="Decimal Precision"
                       value={precision}
                       onChange={setPrecision}
                       options={[
                         { label: "1", value: "1" },
                         { label: "2", value: "2" },
                         { label: "3", value: "3" },
                         { label: "4", value: "4" },
                       ]}
                     />
                   )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Select
                  label="Name Category"
                  value={nameCategory}
                  onChange={(e) => setNameCategory(e.target.value)}
                  options={[
                    { label: "Full Names", value: "full" },
                    { label: "First Names Only", value: "first" },
                    { label: "Usernames", value: "username" },
                    { label: "Team/Group Names", value: "team" },
                  ]}
                />
                {(nameCategory === "first" || nameCategory === "full") && (
                  <PillSelector
                    label="Gender Filter"
                    value={gender}
                    onChange={setGender}
                    options={[
                      { label: "Neutral", value: "neutral" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                    ]}
                  />
                )}
                <PillSelector
                  label="Quantity"
                  value={nameCount}
                  onChange={setNameCount}
                  options={[
                    { label: "1", value: "1" },
                    { label: "5", value: "5" },
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                  ]}
                />
              </div>
            )}

            <Button onClick={handleGenerate} className="w-full h-14 rounded-2xl text-lg font-normal uppercase tracking-widest shadow-lg shadow-brand-primary/20">
              <RefreshCw size={20} /> Generate {mode === "number" ? "Numbers" : "Names"}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-4 flex flex-col" id="tour-generator-output">
            <div className="flex items-center justify-between px-1">
               <label className="text-xs font-normal uppercase tracking-widest text-slate-500">
                 Results
               </label>
               {results.length > 0 && (
                 <div className="flex items-center gap-2">
                    <Tooltip content="Copy All Results" position="top">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(results.join('\n'));
                            }}
                            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-brand-primary transition-colors border border-base"
                        >
                            <Copy size={14} />
                        </button>
                    </Tooltip>
                    <Tooltip content="Download .txt" position="top">
                        <button
                            onClick={downloadTxt}
                            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-brand-primary transition-colors border border-base"
                        >
                            <Download size={14} />
                        </button>
                    </Tooltip>
                 </div>
               )}
            </div>

            <div className="flex-1 bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-4 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((res, idx) => (
                    <div key={idx} className="group flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-base rounded-xl hover:border-brand-primary/30 transition-all shadow-sm">
                      <span className="font-mono font-normal text-slate-700 dark:text-slate-300">{res}</span>
                      <CopyButton value={res} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 opacity-50">
                    {mode === "number" ? <Hash size={32} /> : <User size={32} />}
                  </div>
                  <p className="text-sm font-normal uppercase tracking-widest opacity-40">Ready to Generate</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] mt-1 opacity-40">Select options and click generate</p>
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-400 text-center font-normal uppercase tracking-widest mt-2">
               🔒 100% Secure & Private — No data leaves your browser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
