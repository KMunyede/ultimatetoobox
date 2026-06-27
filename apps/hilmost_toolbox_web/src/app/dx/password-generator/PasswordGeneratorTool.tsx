"use client";

import React, { useState, useMemo, useCallback } from "react";
import { RefreshCw, Download } from "lucide-react";
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

  // We use a seed to trigger regeneration manually
  const [seed, setSeed] = useState(0);

  const { passwords, strength } = useMemo(() => {
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

    if (!charset || typeof window === 'undefined') {
      return { passwords: [], strength: { label: 'Weak', color: 'bg-red-500', percent: 25, crackTime: 'Minutes' } };
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

        // Shuffle the result
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

    // Calculate Strength & Crack Time
    const poolSize = charset.length;
    const entropy = length * Math.log2(poolSize);

    let info: StrengthInfo;
    if (entropy < 40) info = { label: 'Weak', color: 'bg-red-500', percent: 25, crackTime: 'Minutes' };
    else if (entropy < 60) info = { label: 'Medium', color: 'bg-orange-500', percent: 50, crackTime: '3 months' };
    else if (entropy < 80) info = { label: 'Strong', color: 'bg-blue-500', percent: 75, crackTime: '3,000 years' };
    else info = { label: 'Very Strong', color: 'bg-emerald-500', percent: 100, crackTime: 'Trillions of centuries' };

    return { passwords: newPasswords, strength: info };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, length, count, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, guaranteeEachType]);

  const handleRegenerate = useCallback(() => {
    setSeed(s => s + 1);
  }, []);

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
              onClick={handleRegenerate}
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

          <p className="text-xs text-gray-400 text-center mt-2 mb-4">
            🔒 Generated in your browser. Never sent to any server.
          </p>
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

      <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Why Use a Password Generator?</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Weak and reused passwords are the leading cause of account breaches. A single compromised password can expose multiple accounts, leading to a domino effect that compromises your entire digital identity. Human-chosen passwords almost always follow predictable patterns—like using names, dates, or common keyboard sequences—that automated brute-force attacks exploit in mere seconds.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          This tool works by utilizing your browser&apos;s built-in <code>crypto.getRandomValues()</code> API. This is the same high-level cryptographic standard used in professional banking and enterprise security software to guarantee true randomness. Because the generation happens entirely on your device, no passwords are ever transmitted to any server, ensuring that your new credentials are never intercepted or logged.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          For maximum security, we recommend a minimum of 16 characters for standard accounts and 24+ characters for critical gateways like email, banking, and administrative portals. Always use a unique password per account and enable all character sets for maximum entropy. For the best defense, store your generated passwords in a reputable password manager rather than plain text, and rotate them regularly.
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Frequently Asked Questions</h3>
        <dl>
          <dt className="font-medium text-gray-900">Is it safe to use an online password generator?</dt>
          <dd className="text-sm text-gray-700 mb-4 ml-4">
            Yes, when generation happens client-side. This tool never transmits your password across the internet. You can verify this by checking the &quot;Network&quot; tab in your browser&apos;s Developer Tools; you will see zero traffic leaving your device when a password is forged.
          </dd>

          <dt className="font-medium text-gray-900">How long should my password be?</dt>
          <dd className="text-sm text-gray-700 mb-4 ml-4">
            We recommend a minimum of 16 characters for standard social or entertainment accounts. For critical services like your primary email, banking, or admin accounts, you should use 24 to 64 characters to ensure your credentials remain uncrackable for centuries.
          </dd>

          <dt className="font-medium text-gray-900">Can I use the generated password immediately?</dt>
          <dd className="text-sm text-gray-700 mb-4 ml-4">
            Absolutely. Once generated, you can copy the password directly into your application or password manager. We recommend securing it in a manager before closing this tab, as the forged password exists only in your browser&apos;s temporary memory.
          </dd>
        </dl>
      </section>
    </div>
  );
}
