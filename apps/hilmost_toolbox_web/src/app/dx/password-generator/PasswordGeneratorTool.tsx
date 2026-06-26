"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert, Lock, Sparkles } from "lucide-react";
import { CopyButton } from "@utilitiessite/ui";

type Strength = 'Weak' | 'Medium' | 'Strong' | 'Very Strong';

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<Strength>('Strong');

  const generatePassword = useCallback(() => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    let charSetCount = 0;

    if (includeUppercase) { charset += uppercaseChars; charSetCount++; }
    if (includeLowercase) { charset += lowercaseChars; charSetCount++; }
    if (includeNumbers) { charset += numberChars; charSetCount++; }
    if (includeSymbols) { charset += symbolChars; charSetCount++; }

    if (!charset) {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generatedPassword += charset[array[i] % charset.length];
    }

    setPassword(generatedPassword);

    // Strength Logic
    const strengthScore = charSetCount + (length >= 16 ? 1 : 0) + (length >= 24 ? 1 : 0);
    if (strengthScore <= 2) setStrength('Weak');
    else if (strengthScore === 3) setStrength('Medium');
    else if (strengthScore === 4) setStrength('Strong');
    else setStrength('Very Strong');
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const strengthColors = {
    'Weak': 'text-red-500 bg-red-500/10 border-red-500/20',
    'Medium': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    'Strong': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    'Very Strong': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
  };

  const StrengthIcon = () => {
    if (strength === 'Weak') return <ShieldAlert size={16} />;
    if (strength === 'Medium') return <Shield size={16} />;
    if (strength === 'Strong') return <ShieldCheck size={16} />;
    return <Sparkles size={16} />;
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">

        {/* Output Section */}
        <div className="mb-8" id="tour-password-output">
          <div className="flex items-center justify-between mb-3 px-1">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              Generated Password
            </label>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${strengthColors[strength]}`}>
              <StrengthIcon />
              {strength}
            </div>
          </div>

          <div className="relative group">
            <div className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 pr-16 font-mono text-xl md:text-2xl text-blue-400 break-all min-h-[80px] flex items-center shadow-inner">
              {password || <span className="text-slate-700 italic">Select options to generate...</span>}
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <CopyButton value={password} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
             <button
              onClick={generatePassword}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              <RefreshCw size={16} /> Regenerate
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800" id="tour-password-options">

          {/* Length Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900 dark:text-white">Password Length</label>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono text-blue-600 dark:text-blue-400 font-bold">{length}</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Short (8)</span>
              <span>Ultra Secure (64)</span>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
             {[
               { label: "Uppercase", state: includeUppercase, setState: setIncludeUppercase },
               { label: "Lowercase", state: includeLowercase, setState: setIncludeLowercase },
               { label: "Numbers", state: includeNumbers, setState: setIncludeNumbers },
               { label: "Symbols", state: includeSymbols, setState: setIncludeSymbols },
             ].map((opt) => (
               <label key={opt.label} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                 <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={opt.state}
                      onChange={(e) => opt.setState(e.target.checked)}
                      className="peer h-5 w-5 appearance-none rounded-md border-2 border-slate-300 dark:border-slate-700 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                    />
                    <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                 </div>
                 <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{opt.label}</span>
               </label>
             ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white shrink-0 shadow-lg shadow-blue-600/20">
            <Lock size={16} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300">Privacy First Architecture</h4>
            <p className="text-xs text-blue-800 dark:text-blue-400/80 leading-relaxed mt-1">
              Passwords are generated locally in your browser using the <strong>Web Crypto API</strong>. No data is ever sent to our servers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
