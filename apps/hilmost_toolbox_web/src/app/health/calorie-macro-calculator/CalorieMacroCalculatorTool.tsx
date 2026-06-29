"use client";

import React, { useState, useMemo } from "react";
import {
  Activity,
  RotateCcw,
  Copy,
  Check,
  Flame,
  Settings2,
  Apple,
  Calculator,
  Zap
} from "lucide-react";
import { FAQAccordion } from "@utilitiessite/ui";

// --- Types ---
type Unit = 'metric' | 'imperial';
type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'lose_fast' | 'lose' | 'maintain' | 'gain' | 'gain_fast';

interface Results {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const ACTIVITY_CONFIG: Record<ActivityLevel, { label: string, desc: string, mult: number }> = {
  sedentary: { label: "Sedentary", desc: "Little/no exercise", mult: 1.2 },
  light: { label: "Lightly Active", desc: "1-3 days/week", mult: 1.375 },
  moderate: { label: "Moderately Active", desc: "3-5 days/week", mult: 1.55 },
  active: { label: "Very Active", desc: "6-7 days/week", mult: 1.725 },
  very_active: { label: "Extremely Active", desc: "Physical job", mult: 1.9 },
};

const GOAL_CONFIG: Record<Goal, { label: string, offset: number, p: number, c: number, f: number }> = {
  lose_fast: { label: "Lose Weight Fast -500 kcal", offset: -500, p: 40, c: 30, f: 30 },
  lose: { label: "Lose Weight -250 kcal", offset: -250, p: 35, c: 35, f: 30 },
  maintain: { label: "Maintain Weight", offset: 0, p: 30, c: 40, f: 30 },
  gain: { label: "Gain Muscle +250 kcal", offset: 250, p: 30, c: 45, f: 25 },
  gain_fast: { label: "Gain Fast +500 kcal", offset: 500, p: 25, c: 50, f: 25 },
};

export function CalorieMacroCalculatorTool() {
  // --- State ---
  const [unit, setUnit] = useState<Unit>('metric');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [goal, setGoal] = useState<Goal>('maintain');

  const [useCustomMacros, setUseCustomMacros] = useState(false);
  const [customProtein, setCustomProtein] = useState(30);
  const [customCarbs, setCustomCarbs] = useState(40);
  const [customFat, setCustomFat] = useState(30);

  const [results, setResults] = useState<Results | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // --- Logic ---
  const calculate = () => {
    let w = weight;
    let h = heightCm;

    if (unit === 'imperial') {
      w = weight * 0.453592;
      h = (heightFt * 12 + heightIn) * 2.54;
    }

    // Mifflin-St Jeor
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = bmr * ACTIVITY_CONFIG[activityLevel].mult;
    const goalData = GOAL_CONFIG[goal];
    const targetCalories = Math.max(1200, tdee + goalData.offset);

    const pPct = useCustomMacros ? customProtein : goalData.p;
    const cPct = useCustomMacros ? customCarbs : goalData.c;
    const fPct = useCustomMacros ? customFat : goalData.f;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein: Math.round((targetCalories * (pPct / 100)) / 4),
      carbs: Math.round((targetCalories * (cPct / 100)) / 4),
      fat: Math.round((targetCalories * (fPct / 100)) / 9),
    });
  };

  const handleCustomMacroChange = (type: 'p' | 'c' | 'f', val: number) => {
    const newVal = Math.min(100, Math.max(0, val));
    if (type === 'p') setCustomProtein(newVal);
    if (type === 'c') setCustomCarbs(newVal);
    if (type === 'f') setCustomFat(newVal);
  };

  const totalCustom = customProtein + customCarbs + customFat;

  const handleCopy = () => {
    if (!results) return;
    const text = `Calorie & Macro Report (Hilmost Toolbox)
-------------------------------------------
Goal: ${GOAL_CONFIG[goal].label}
Daily Target: ${results.targetCalories} kcal
BMR: ${results.bmr} kcal | TDEE: ${results.tdee} kcal

Macros:
- Protein: ${results.protein}g (${useCustomMacros ? customProtein : GOAL_CONFIG[goal].p}%)
- Carbs: ${results.carbs}g (${useCustomMacros ? customCarbs : GOAL_CONFIG[goal].c}%)
- Fat: ${results.fat}g (${useCustomMacros ? customFat : GOAL_CONFIG[goal].f}%)`;

    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-10">

      {/* 1. UNIT TOGGLE */}
      <div className="flex justify-center">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${unit === u ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {u === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lbs/ft)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. PERSONAL DETAILS */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Settings2 size={18} className="text-rose-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Personal Details</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Age (15-100)</label>
              <input type="number" value={age} onChange={e => setAge(Math.min(100, Math.max(15, parseInt(e.target.value) || 0)))} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gender</label>
              <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {(['male', 'female'] as const).map(g => (
                  <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${gender === g ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-400'}`}>{g}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <input type="number" value={weight} onChange={e => setWeight(parseFloat(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Height</label>
            {unit === 'metric' ? (
              <div className="relative">
                <input type="number" value={heightCm} onChange={e => setHeightCm(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none" />
                <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">cm</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="number" value={heightFt} onChange={e => setHeightFt(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none" />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">ft</span>
                </div>
                <div className="relative">
                  <input type="number" value={heightIn} onChange={e => setHeightIn(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none" />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">in</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. ACTIVITY LEVEL */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={18} className="text-rose-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Activity Level</h2>
          </div>
          <div className="space-y-2">
            {(Object.keys(ACTIVITY_CONFIG) as ActivityLevel[]).map((key) => (
              <button
                key={key}
                onClick={() => setActivityLevel(key)}
                className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${activityLevel === key ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10' : 'border-slate-50 dark:border-slate-950 bg-slate-50/50 dark:bg-slate-950 hover:border-slate-200'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${activityLevel === key ? 'text-rose-600' : 'text-slate-600'}`}>{ACTIVITY_CONFIG[key].label}</span>
                  <span className="text-[9px] opacity-40 font-black">{ACTIVITY_CONFIG[key].desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. GOAL SELECTOR */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Apple size={18} className="text-rose-500" />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Your Fitness Goal</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GOAL_CONFIG) as Goal[]).map((key) => (
            <button
              key={key}
              onClick={() => setGoal(key)}
              className={`flex-1 min-w-[140px] p-3 rounded-2xl border-2 transition-all text-center ${goal === key ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10 text-rose-600' : 'border-slate-50 dark:border-slate-950 bg-slate-50/50 dark:bg-slate-950 hover:border-slate-200 text-slate-400'}`}
            >
              <div className="text-[10px] font-black uppercase tracking-tighter">{GOAL_CONFIG[key].label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 5. CALCULATE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={calculate}
          className="flex items-center gap-2 px-12 py-4 bg-rose-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 hover:scale-105 transition-all active:scale-95"
        >
          <Calculator size={18} /> Calculate Results
        </button>
      </div>

      {/* 6. RESULTS CARD */}
      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-rose-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-rose-500/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
              <Flame size={180} />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">BMR</p>
                <p className="text-3xl font-black">{results.bmr}</p>
                <p className="text-[10px] font-bold opacity-50">kcal/day</p>
              </div>
              <div className="bg-white/10 py-6 rounded-[2rem] border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Target Calories</p>
                <p className="text-6xl font-black">{results.targetCalories}</p>
                <p className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">{GOAL_CONFIG[goal].label.split(' ')[0]} mode</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">TDEE</p>
                <p className="text-3xl font-black">{results.tdee}</p>
                <p className="text-[10px] font-bold opacity-50">kcal/day</p>
              </div>
            </div>

            {/* Visual Macro Bar */}
            <div className="mt-10 space-y-4">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                  <span>Protein</span>
                  <span>Carbs</span>
                  <span>Fat</span>
               </div>
               <div className="h-4 w-full flex rounded-full overflow-hidden border-2 border-white/20">
                  <div style={{ width: `${useCustomMacros ? customProtein : GOAL_CONFIG[goal].p}%` }} className="bg-blue-400" />
                  <div style={{ width: `${useCustomMacros ? customCarbs : GOAL_CONFIG[goal].c}%` }} className="bg-emerald-400" />
                  <div style={{ width: `${useCustomMacros ? customFat : GOAL_CONFIG[goal].f}%` }} className="bg-amber-400" />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.protein}g</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">{useCustomMacros ? customProtein : GOAL_CONFIG[goal].p}%</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.carbs}g</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">{useCustomMacros ? customCarbs : GOAL_CONFIG[goal].c}%</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.fat}g</p>
                    <p className="text-[9px] font-bold opacity-60 uppercase">{useCustomMacros ? customFat : GOAL_CONFIG[goal].f}%</p>
                  </div>
               </div>
            </div>
          </div>

          {/* 7. CUSTOM MACRO SPLIT */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Settings2 size={18} className="text-rose-500" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Custom Macro Split</h2>
              </div>
              <button
                onClick={() => setUseCustomMacros(!useCustomMacros)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${useCustomMacros ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'}`}
              >
                {useCustomMacros ? 'Enabled' : 'Enable Custom'}
              </button>
            </div>

            {useCustomMacros ? (
              <div className="space-y-8">
                {[
                  { label: "Protein", val: customProtein, set: (v: number) => handleCustomMacroChange('p', v), color: "accent-blue-500" },
                  { label: "Carbs", val: customCarbs, set: (v: number) => handleCustomMacroChange('c', v), color: "accent-emerald-500" },
                  { label: "Fat", val: customFat, set: (v: number) => handleCustomMacroChange('f', v), color: "accent-amber-500" },
                ].map(m => (
                  <div key={m.label} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{m.label}</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">{m.val}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={m.val} onChange={e => m.set(parseInt(e.target.value))} className={`w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer ${m.color}`} />
                  </div>
                ))}

                <div className={`p-4 rounded-2xl text-center text-[11px] font-black uppercase tracking-widest ${totalCustom === 100 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                   Total: {totalCustom}% {totalCustom !== 100 && "(Must equal 100%)"}
                </div>

                <button onClick={calculate} disabled={totalCustom !== 100} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] disabled:opacity-30 transition-all">
                  Apply Custom Ratios
                </button>
              </div>
            ) : (
              <p className="text-center text-xs text-slate-400 font-medium italic">Custom sliders are disabled. Currently using {GOAL_CONFIG[goal].label} presets.</p>
            )}
          </div>

          {/* 8. COPY BUTTON & RESET */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={handleCopy} className="flex-1 sm:flex-none flex items-center gap-2 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
              {copyStatus ? <Check size={18} /> : <Copy size={18} />}
              {copyStatus ? "Copied!" : "Copy Full Report"}
            </button>
            <button onClick={() => { setResults(null); setUseCustomMacros(false); }} className="flex items-center gap-2 px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      )}

      {/* SEO CONTENT BLOCK */}
      <div className="mt-20 space-y-20">
        <div className="flex items-center justify-center gap-2 text-slate-300 select-none">
          <Zap size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Privacy First. Pure Browser Math. No Data Collection.</span>
        </div>

        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Free Calorie & Macro Calculator</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <p>
              Understanding your energy balance is the foundation of any successful fitness transformation. Our <strong>Calorie & Macro Calculator</strong> leverages the Mifflin-St Jeor equation to provide high-precision estimates of your metabolic needs. By analyzing your unique profile, we determine your <strong>Basal Metabolic Rate (BMR)</strong>—the minimum energy required for vital functions.
            </p>
            <p>
              Physical activity acts as a multiplier on your baseline. We calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong> to show you exactly how many calories you burn in a typical day. Whether you are an office worker or an elite athlete, our tool adjusts for five distinct activity levels to ensure your targets are realistic and sustainable.
            </p>
            <p>
              Nutrition is about more than just numbers; it is about the quality of those numbers. Once your caloric target is established, we provide a structured <strong>Macro Breakdown</strong>. Proteins, Carbohydrates, and Fats are balanced according to your specific goal—whether it&apos;s rapid fat loss or controlled muscle hypertrophy. For advanced users, our <strong>Custom Macro Split</strong> feature allows for granular control over your nutritional ratios.
            </p>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-6 mt-12 uppercase tracking-tight">Frequently Asked Questions</h2>
          <FAQAccordion items={[
            { question: "What is BMR?", answer: "Basal Metabolic Rate (BMR) is the total number of calories your body needs to perform basic life-sustaining functions, such as circulation, breathing, and cell production, while at rest." },
            { question: "What is TDEE?", answer: "Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise and physical activity are taken into account. It is the number you use to set your maintenance, deficit, or surplus targets." },
            { question: "How do I calculate my macros?", answer: "Macros are calculated based on your total caloric target. Generally, Protein and Carbs contain 4 calories per gram, while Fats contain 9 calories per gram. Our calculator automatically converts your percentage splits into daily gram targets." },
            { question: "How many calories should I eat to lose weight?", answer: "To lose weight, you generally need to consume fewer calories than your TDEE. A common starting point is a 250-500 calorie deficit per day, which leads to approximately 0.5 to 1lb of fat loss per week." }
          ]} />
        </section>
      </div>

    </div>
  );
}
