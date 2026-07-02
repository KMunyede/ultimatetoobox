"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { NumberInput } from "../../../components/ui/NumberInput";
import { PillSelector } from "../../../components/ui/PillSelector";

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
  lose_fast: { label: "Lose Weight Fast", offset: -500, p: 40, c: 30, f: 30 },
  lose: { label: "Lose Weight", offset: -250, p: 35, c: 35, f: 30 },
  maintain: { label: "Maintain Weight", offset: 0, p: 30, c: 40, f: 30 },
  gain: { label: "Gain Muscle", offset: 250, p: 30, c: 45, f: 25 },
  gain_fast: { label: "Gain Fast", offset: 500, p: 25, c: 50, f: 25 },
};

export function CalorieMacroCalculatorTool() {
  // --- State ---
  const [unit, setUnit] = useState<Unit>('metric');
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState<string>("75");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [goal, setGoal] = useState<Goal>('maintain');

  const [useCustomMacros, setUseCustomMacros] = useState(false);
  const [customProtein, setCustomProtein] = useState(30);
  const [customCarbs, setCustomCarbs] = useState(40);
  const [customFat, setCustomFat] = useState(30);

  const [results, setResults] = useState<Results | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // --- Logic ---
  const calculate = useCallback(() => {
    const a = age === '' ? 0 : parseInt(age);
    const w = weight === '' ? 0 : parseFloat(weight);
    const hCm = heightCm === '' ? 0 : parseFloat(heightCm);
    const hFt = heightFt === '' ? 0 : parseFloat(heightFt);
    const hIn = heightIn === '' ? 0 : parseFloat(heightIn);

    if (isNaN(a) || a < 15 || a > 100) return;
    if (w <= 0) return;

    let h = hCm;
    if (unit === 'imperial') {
      h = (hFt * 12 + hIn) * 2.54;
    }
    if (h <= 0) return;

    let weightKg = w;
    if (unit === 'imperial') {
      weightKg = w * 0.453592;
    }

    let bmr = (10 * weightKg) + (6.25 * h) - (5 * a);
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
  }, [age, weight, unit, heightCm, heightFt, heightIn, gender, activityLevel, goal, useCustomMacros, customProtein, customCarbs, customFat]);

  useEffect(() => {
    calculate();
  }, [calculate]);

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
    <div className="max-w-6xl mx-auto my-8 space-y-10">

      <div className="flex justify-center" id="unit-toggle">
        <PillSelector
          value={unit}
          onChange={setUnit}
          options={[
            { label: 'Metric (kg/cm)', value: 'metric' },
            { label: 'Imperial (lbs/ft)', value: 'imperial' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PERSONAL DETAILS */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-8" id="body-details">
          <div className="flex items-center gap-2 mb-2">
            <Settings2 size={18} className="text-brand-primary" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Personal Details</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Age (15-100)"
              value={age}
              onChange={setAge}
              min={15}
              max={100}
            />
            <PillSelector
              label="Gender"
              value={gender}
              onChange={setGender}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              pillClassName="!px-4"
            />
          </div>

          <NumberInput
            label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`}
            value={weight}
            onChange={setWeight}
            min={10}
            max={500}
            step={0.1}
          />

          <div className="space-y-1.5 w-full">
            <label className="block text-[10px] font-medium uppercase tracking-widest text-[#57544C] ml-1 mb-1.5">Height</label>
            {unit === 'metric' ? (
              <div className="relative">
                <NumberInput
                  value={heightCm}
                  onChange={setHeightCm}
                  min={50}
                  max={250}
                />
                <span className="absolute right-4 bottom-3 text-xs font-bold text-slate-400">cm</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <NumberInput
                    value={heightFt}
                    onChange={setHeightFt}
                    min={2}
                    max={8}
                  />
                  <span className="absolute right-4 bottom-3 text-xs font-bold text-slate-400">ft</span>
                </div>
                <div className="relative">
                  <NumberInput
                    value={heightIn}
                    onChange={setHeightIn}
                    min={0}
                    max={11}
                  />
                  <span className="absolute right-4 bottom-3 text-xs font-bold text-slate-400">in</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ACTIVITY LEVEL */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm" id="activity-level">
          <div className="flex items-center gap-2 mb-6">
            <Activity size={18} className="text-brand-primary" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Activity Level</h2>
          </div>
          <div className="space-y-2">
            {(Object.keys(ACTIVITY_CONFIG) as ActivityLevel[]).map((key) => (
              <button
                key={key}
                onClick={() => setActivityLevel(key)}
                className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${activityLevel === key ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10' : 'border-slate-50 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 hover:border-slate-200'}`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold ${activityLevel === key ? 'text-brand-primary' : 'text-slate-600'}`}>{ACTIVITY_CONFIG[key].label}</span>
                  <span className="text-[10px] opacity-40 font-black uppercase tracking-widest">{ACTIVITY_CONFIG[key].desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GOAL SELECTOR */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm" id="goal-selector">
        <div className="flex items-center gap-2 mb-6">
          <Apple size={18} className="text-brand-primary" />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Your Fitness Goal</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(GOAL_CONFIG) as Goal[]).map((key) => (
            <button
              key={key}
              onClick={() => setGoal(key)}
              className={`flex-1 min-w-[140px] p-3 rounded-2xl border-2 transition-all text-center ${goal === key ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 text-brand-primary font-bold' : 'border-slate-50 dark:border-slate-950 bg-slate-50 dark:bg-slate-950 hover:border-slate-200 text-slate-400'}`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest">{GOAL_CONFIG[key].label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={calculate}
          variant="secondary"
          className="!px-12 !py-4 rounded-full"
        >
          <Calculator size={18} /> Recalculate
        </Button>
      </div>

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-primary/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
              <Flame size={180} />
            </div>
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">BMR</p>
                <p className="text-3xl font-black">{results.bmr}</p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">kcal/day</p>
              </div>
              <div className="bg-white/10 py-6 rounded-[2rem] border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Target Calories</p>
                <p className="text-6xl font-black">{results.targetCalories}</p>
                <p className="text-[10px] font-bold mt-2 opacity-80 uppercase tracking-widest">{GOAL_CONFIG[goal].label} mode</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">TDEE</p>
                <p className="text-3xl font-black">{results.tdee}</p>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">kcal/day</p>
              </div>
            </div>

            <div className="mt-10 space-y-4 max-w-2xl mx-auto">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                  <span>Protein</span>
                  <span>Carbs</span>
                  <span>Fat</span>
               </div>
               <div className="h-4 w-full flex rounded-full overflow-hidden border-2 border-white/20">
                  <div style={{ width: `${useCustomMacros ? customProtein : GOAL_CONFIG[goal].p}%` }} className="bg-sky-400" />
                  <div style={{ width: `${useCustomMacros ? customCarbs : GOAL_CONFIG[goal].c}%` }} className="bg-emerald-400" />
                  <div style={{ width: `${useCustomMacros ? customFat : GOAL_CONFIG[goal].f}%` }} className="bg-amber-400" />
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.protein}g</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase">{useCustomMacros ? customProtein : GOAL_CONFIG[goal].p}%</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.carbs}g</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase">{useCustomMacros ? customCarbs : GOAL_CONFIG[goal].c}%</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <p className="text-xl font-black">{results.fat}g</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase">{useCustomMacros ? customFat : GOAL_CONFIG[goal].f}%</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Settings2 size={18} className="text-brand-primary" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Custom Macro Split</h2>
              </div>
              <button
                onClick={() => setUseCustomMacros(!useCustomMacros)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${useCustomMacros ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
              >
                {useCustomMacros ? 'Enabled' : 'Enable Custom'}
              </button>
            </div>

            {useCustomMacros ? (
              <div className="space-y-8">
                {[
                  { label: "Protein", val: customProtein, set: (v: number) => handleCustomMacroChange('p', v), color: "accent-sky-500" },
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

                <div className={`p-4 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest border-2 ${totalCustom === 100 ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-emerald-100 dark:border-emerald-800/50' : 'bg-rose-50 dark:bg-rose-900/10 text-rose-600 border-rose-100 dark:border-rose-800/50'}`}>
                   Total: {totalCustom}% {totalCustom !== 100 && "(Must equal 100%)"}
                </div>

                <Button onClick={calculate} disabled={totalCustom !== 100} className="w-full !py-4">
                  Apply Custom Ratios
                </Button>
              </div>
            ) : (
              <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Custom sliders are disabled. Using {GOAL_CONFIG[goal].label} presets.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleCopy}
              className="flex-1 sm:flex-none !py-5 rounded-full"
              variant={copyStatus ? 'primary' : 'pill'}
            >
              {copyStatus ? <Check size={18} /> : <Copy size={18} />}
              {copyStatus ? "Copied!" : "Copy Full Report"}
            </Button>
            <Button
              onClick={() => { setResults(null); setUseCustomMacros(false); }}
              variant="secondary"
              className="flex-1 sm:flex-none !py-5 rounded-full"
            >
              <RotateCcw size={18} /> Reset
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-slate-400 select-none mt-12">
        <Zap size={14} />
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">Privacy First. Pure Browser Math. No Data Collection.</span>
      </div>
    </div>
  );
}
