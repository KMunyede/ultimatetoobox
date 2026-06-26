"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert, Lock, Sparkles, Download, Check, AlertCircle } from "lucide-react";
import { CopyButton } from "@utilitiessite/ui";

type StrengthInfo = {
  label: string;
  color: string;
  percent: number;
  crackTime: string;
};

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [guaranteeEachType, setGuaranteeEachType] = useState(true);

  const [passwords, setPasswords] = useState<string[]>([]);
  const [strength, setStrength] = useState<StrengthInfo>({ label: 'Strong', color: 'bg-blue-500', percent: 75, crackTime: '3 trillion years' });

  const generatePassword = useCallback(() => {
    const sets = [
      { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", active: includeUppercase },
      { chars: "abcdefghijklmnopqrstuvwxyz", active: includeLowercase },
      { chars: "0123456789", active: includeNumbers },
      { chars: "!@#$%^&*()_+-=[]{}|;:,.<>?", active: includeSymbols },
    ];

    const ambiguousChars = "0OIl1|";

    const activeSets = sets.filter(s => s.active).map(s => {
      let filtered = s.chars;
      if (excludeAmbiguous) {
        filtered = s.chars.split('').filter(c => !ambiguousChars.includes(c)).join('');
      }
      return filtered;
    });

    const charset = activeSets.join('');

    if (!charset) {
      setPasswords([]);
      return;
    }

    const newPasswords: string[] = [];

    for (let c = 0; c < count; c++) {
      let generated = "";

      if (guaranteeEachType) {
        // First, pick one from each active set
        activeSets.forEach(set => {
          const randomByte = new Uint32Array(1);
          window.crypto.getRandomValues(randomByte);
          generated += set[randomByte[0] % set.length];
        });

        // Fill the rest
        const remainingLength = length - generated.length;
        if (remainingLength > 0) {
          const remainingArray = new Uint32Array(remainingLength);
          window.crypto.getRandomValues(remainingArray);
          for (let i = 0; i < remainingLength; i++) {
            generated += charset[remainingArray[i] % charset.length];
          }
        }

        // Shuffle the result using Fisher-Yates and Web Crypto
        const shuffleArray = generated.split('');
        for (let i = shuffleArray.length - 1; i > 0; i--) {
          const jByte = new Uint32Array(1);
          window.crypto.getRandomValues(jByte);
          const j = jByte[0] % (i + 1);
          [shuffleArray[i], shuffleArray[j]] = [shuffleArray[j], shuffleArray[i]];
        }
        generated = shuffleArray.join('');
      } else {
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < length; i++) {
          generated += charset[array[i] % charset.length];
        }
      }
      newPasswords.push(generated);
    }

    setPasswords(newPasswords);

    // Calculate Strength & Crack Time
    const poolSize = charset.length;
    const entropy = length * Math.log2(poolSize);

    let info: StrengthInfo;
    if (entropy < 40) info = { label: 'Weak', color: 'bg-red-500', percent: 25, crackTime: 'Minutes' };
    else if (entropy < 60) info = { label: 'Medium', color: 'bg-orange-500', percent: 50, crackTime: '3 months' };
    else if (entropy < 80) info = { label: 'Strong', color: 'bg-blue-500', percent: 75, crackTime: '3,000 years' };
    else info = { label: 'Very Strong', color: 'bg-emerald-500', percent: 100, crackTime: 'Trillions of centuries' };

    setStrength(info);
  }, [length, count, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, guaranteeEachType]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([passwords.join('\n')], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "hilmost-passwords.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

        {/* Output Section */}
        <div className="mb-8" id="tour-password-output">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                Security Analysis
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{strength.label}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Crack Time: {strength.crackTime}</span>
              </div>
            </div>
            <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-base">
              <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: `${strength.percent}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {passwords.map((pw, idx) => (
              <div key={idx} className="relative group">
                <div className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 pr-14 font-mono text-lg md:text-xl text-emerald-400 break-all min-h-[64px] flex items-center shadow-inner selection:bg-emerald-500/30">
                  {pw}
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CopyButton value={pw} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
             <button
              onClick={generatePassword}
              className="flex items-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-hover text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20 transition-all active:scale-95"
            >
              <RefreshCw size={18} /> Regenerate
            </button>
            {count > 1 && (
              <button
                onClick={downloadTxt}
                className="flex items-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <Download size={18} /> Download .txt
              </button>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-8 border-t border-slate-100 dark:border-slate-800" id="tour-password-options">

          {/* Controls Left */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Password Length</label>
                <span className="px-3 py-1 bg-brand-primary/10 rounded-lg font-mono text-brand-primary font-black">{length}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Short (8)</span>
                <span>Ultra Secure (64)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Quantity (Bulk)</label>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Up to 10 passwords</span>
              </div>
              <div className="flex gap-2">
                {[1, 5, 10].map(n => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`flex-1 py-3 rounded-xl border-2 font-black transition-all ${count === n ? 'border-brand-primary bg-brand-primary/5 text-brand-primary shadow-inner' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Right - Toggles */}
          <div className="grid grid-cols-1 gap-3">
             {[
               { label: "Include Uppercase", state: includeUppercase, setState: setIncludeUppercase },
               { label: "Include Lowercase", state: includeLowercase, setState: setIncludeLowercase },
               { label: "Include Numbers", state: includeNumbers, setState: setIncludeNumbers },
               { label: "Include Symbols", state: includeSymbols, setState: setIncludeSymbols },
               { label: "Exclude Ambiguous", sub: "(0, O, l, 1, |)", state: excludeAmbiguous, setState: setExcludeAmbiguous },
               { label: "Guarantee All Types", state: guaranteeEachType, setState: setGuaranteeEachType },
             ].map((opt) => (
               <label key={opt.label} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all group">
                 <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-tight text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{opt.label}</span>
                    {opt.sub && <span className="text-[10px] text-slate-400 font-medium">{opt.sub}</span>}
                 </div>
                 <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={opt.state}
                      onChange={(e) => opt.setState(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                 </div>
               </label>
             ))}
          </div>
        </div>

      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none">
        <Lock size={12} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">🔒 Generated in your browser. Never sent to any server.</span>
      </div>
    </div>
  );
}
