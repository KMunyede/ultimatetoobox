"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Activity,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Flame,
  Scale,
  Settings2,
  Info,
  Apple
} from "lucide-react";
import { FAQAccordion } from "@utilitiessite/ui";

type Units = "metric" | "imperial";
type Gender = "male" | "female";
type Goal = "lose" | "maintain" | "gain";

interface MacroSplit {
  protein: number;
  carbs: number;
  fat: number;
}

const ACTIVITY_LEVELS = [
  { label: "Sedentary", multiplier: 1.2, description: "Little or no exercise" },
  { label: "Lightly Active", multiplier: 1.375, description: "Exercise 1-3 times/week" },
  { label: "Moderately Active", multiplier: 1.55, description: "Exercise 4-5 times/week" },
  { label: "Very Active", multiplier: 1.725, description: "Daily exercise or intense exercise 3-4 times/week" },
  { label: "Extra Active", multiplier: 1.9, description: "Intense exercise 6-7 times/week or physical job" },
];

const GOALS = [
  { id: "lose", label: "Lose Weight", offset: -500, description: "Mild caloric deficit" },
  { id: "maintain", label: "Maintain", offset: 0, description: "Current weight stability" },
  { id: "gain", label: "Gain Weight", offset: 500, description: "Muscle building surplus" },
];

export function CalorieMacroCalculatorTool() {
  // --- State ---
  const [units, setUnits] = useState<Units>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75); // kg or lbs
  const [heightCm, setHeightCm] = useState<number>(175);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<Goal>("maintain");

  const [isCustomMacros, setIsCustomMacros] = useState(false);
  const [macroSplit, setMacroSplit] = useState<MacroSplit>({ protein: 30, carbs: 40, fat: 30 });

  const [copyStatus, setCopyStatus] = useState(false);

  // --- Calculations ---
  const results = useMemo(() => {
    // Convert units to metric for standard formula
    let w = weight;
    let h = heightCm;

    if (units === "imperial") {
      w = weight * 0.453592; // lbs to kg
      h = (heightFt * 12 + heightIn) * 2.54; // ft/in to cm
    }

    // Mifflin-St Jeor Equation
    let bmr = 10 * w + 6.25 * h - 5 * age;
    if (gender === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activity;
    const goalOffset = GOALS.find(g => g.id === goal)?.offset || 0;
    const targetCalories = Math.max(1200, tdee + goalOffset);

    const split = isCustomMacros ? macroSplit : { protein: 30, carbs: 40, fat: 30 };

    const proteinGrams = (targetCalories * (split.protein / 100)) / 4;
    const carbsGrams = (targetCalories * (split.carbs / 100)) / 4;
    const fatGrams = (targetCalories * (split.fat / 100)) / 9;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros: {
        protein: Math.round(proteinGrams),
        carbs: Math.round(carbsGrams),
        fat: Math.round(fatGrams),
        split
      }
    };
  }, [units, gender, age, weight, heightCm, heightFt, heightIn, activity, goal, isCustomMacros, macroSplit]);

  // --- Handlers ---
  const handleMacroChange = (type: keyof MacroSplit, val: number) => {
    // Basic auto-balancer: Adjust others proportionally
    const otherTypes = (Object.keys(macroSplit) as Array<keyof MacroSplit>).filter(k => k !== type);
    const newVal = Math.min(100, Math.max(0, val));
    const remaining = 100 - newVal;

    const currentOtherSum = macroSplit[otherTypes[0]] + macroSplit[otherTypes[1]];

    let newSplit: MacroSplit;
    if (currentOtherSum === 0) {
      newSplit = {
        ...macroSplit,
        [type]: newVal,
        [otherTypes[0]]: remaining / 2,
        [otherTypes[1]]: remaining / 2
      };
    } else {
      newSplit = {
        ...macroSplit,
        [type]: newVal,
        [otherTypes[0]]: (macroSplit[otherTypes[0]] / currentOtherSum) * remaining,
        [otherTypes[1]]: (macroSplit[otherTypes[1]] / currentOtherSum) * remaining
      };
    }

    setMacroSplit(newSplit);
  };

  const handleReset = () => {
    setUnits("metric");
    setGender("male");
    setAge(30);
    setWeight(75);
    setHeightCm(175);
    setHeightFt(5);
    setHeightIn(9);
    setActivity(1.2);
    setGoal("maintain");
    setIsCustomMacros(false);
    setMacroSplit({ protein: 30, carbs: 40, fat: 30 });
  };

  const handleCopy = () => {
    const text = `Calorie & Macro Report (Hilmost Toolbox)
Target Calories: ${results.targetCalories} kcal/day
Goal: ${GOALS.find(g => g.id === goal)?.label}
Activity Level: ${ACTIVITY_LEVELS.find(a => a.multiplier === activity)?.label}

Daily Macros:
- Protein: ${results.macros.protein}g (${results.macros.split.protein.toFixed(0)}%)
- Carbs: ${results.macros.carbs}g (${results.macros.split.carbs.toFixed(0)}%)
- Fat: ${results.macros.fat}g (${results.macros.split.fat.toFixed(0)}%)

BMR: ${results.bmr} kcal | TDEE: ${results.tdee} kcal`;

    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const faqs = [
    {
      question: "What is BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the number of calories your body burns at rest to maintain basic life functions. TDEE (Total Daily Energy Expenditure) is the total calories you burn in a day, including BMR plus physical activity. Our calculator uses the Mifflin-St Jeor equation, widely considered the most accurate for general populations."
    },
    {
      question: "How should I set my macro split?",
      answer: "A common 'balanced' split is 40% Carbs, 30% Protein, and 30% Fat. However, athletes may prefer higher protein for muscle repair, while those on low-carb diets will shift more toward fats. The 'best' split is the one that fuels your activity level and feels sustainable for you."
    },
    {
      question: "Why is the minimum target 1,200 calories?",
      answer: "Medical professionals generally recommend that individuals do not consume fewer than 1,200 calories (for women) or 1,500 calories (for men) per day without medical supervision. Extremely low-calorie diets can lead to nutrient deficiencies and metabolic slowdown."
    },
    {
      question: "How accurate is the activity multiplier?",
      answer: "Activity levels are estimations. If you find you aren't losing weight at a 'Sedentary' setting, you may be overestimating your exercise intensity. It's often best to start with a lower multiplier and adjust based on actual progress over 2-3 weeks."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto my-8 space-y-10">

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto">
          {(['metric', 'imperial'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setUnits(u)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${units === u ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {u === 'metric' ? 'Metric (cm/kg)' : 'Imperial (ft/lb)'}
            </button>
          ))}
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full md:w-auto">
          {(['male', 'female'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${gender === g ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 size={18} className="text-rose-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Body Composition</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Weight ({units === 'metric' ? 'kg' : 'lbs'})</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                />
              </div>

              {/* Height */}
              <div className="sm:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Height</label>
                {units === 'metric' ? (
                  <div className="relative">
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                    />
                    <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">cm</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">ft</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:border-rose-500 outline-none"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">in</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={18} className="text-rose-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Activity Level</h2>
            </div>
            <div className="space-y-3">
              {ACTIVITY_LEVELS.map((level) => (
                <button
                  key={level.multiplier}
                  onClick={() => setActivity(level.multiplier)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all group ${activity === level.multiplier ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/10' : 'border-slate-50 dark:border-slate-950 bg-slate-50/50 dark:bg-slate-950 hover:border-slate-200 dark:hover:border-slate-800'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-bold ${activity === level.multiplier ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>{level.label}</span>
                    <span className="text-[10px] font-black opacity-40">{level.multiplier}x</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{level.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Calorie Result */}
          <div className="bg-rose-600 rounded-[2rem] p-8 text-white shadow-xl shadow-rose-500/20 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                <Flame size={140} />
             </div>
             <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-80">Daily Target Calories</p>
                <div className="text-7xl font-black mb-2">{results.targetCalories.toLocaleString()}</div>
                <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-widest">
                    kcal / day
                </div>
             </div>
          </div>

          {/* Goal Selector */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-full">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id as Goal)}
                  className={`flex-1 px-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${goal === g.id ? 'bg-white dark:bg-slate-700 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-center mt-3 text-slate-400 font-bold uppercase tracking-widest">
              {GOALS.find(g => g.id === goal)?.description}
            </p>
          </div>

          {/* Macro Breakdown */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Apple size={18} className="text-rose-500" />
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Macro Breakdown</h2>
              </div>
              <button
                onClick={() => setIsCustomMacros(!isCustomMacros)}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border-2 transition-all ${isCustomMacros ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-100 dark:border-slate-800 text-slate-400'}`}
              >
                Custom
              </button>
            </div>

            {/* Visual Bar */}
            <div className="h-6 w-full flex rounded-full overflow-hidden mb-8 border-2 border-slate-50 dark:border-slate-900 shadow-inner">
               <div style={{ width: `${results.macros.split.protein}%` }} className="h-full bg-blue-500 transition-all duration-500" />
               <div style={{ width: `${results.macros.split.carbs}%` }} className="h-full bg-emerald-500 transition-all duration-500" />
               <div style={{ width: `${results.macros.split.fat}%` }} className="h-full bg-amber-500 transition-all duration-500" />
            </div>

            <div className="space-y-6">
              {[
                { label: "Protein", color: "bg-blue-500", grams: results.macros.protein, pct: results.macros.split.protein, key: "protein" as const },
                { label: "Carbs", color: "bg-emerald-500", grams: results.macros.carbs, pct: results.macros.split.carbs, key: "carbs" as const },
                { label: "Fat", color: "bg-amber-500", grams: results.macros.fat, pct: results.macros.split.fat, key: "fat" as const },
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${m.color}`} />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{m.label}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-lg font-black text-slate-900 dark:text-white">{m.grams}g</span>
                        <span className="text-[10px] font-bold text-slate-400 ml-1">({m.pct.toFixed(0)}%)</span>
                    </div>
                  </div>
                  {isCustomMacros && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={m.pct}
                      onChange={(e) => handleMacroChange(m.key, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">BMR</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{results.bmr}</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">TDEE</p>
                <p className="text-xl font-black text-slate-900 dark:text-white">{results.tdee}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-center pt-6">
        <button
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
        >
          {copyStatus ? <Check size={18} /> : <Copy size={18} />}
          {copyStatus ? "Report Copied!" : "Copy Report"}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>

      {/* SEO Content Block */}
      <div className="mt-20 space-y-20">
        <div className="flex items-center justify-center gap-2 text-slate-400 select-none">
          <Zap size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Privacy First. All calculations happen in your browser.</span>
        </div>

        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Calorie & Macro Calculator Lab</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <p>
              Optimizing your nutrition starts with understanding your body&apos;s specific energy requirements. Our <strong>Calorie & Macro Calculator</strong> provides a scientific foundation for your fitness journey, whether you are looking to lose body fat, maintain your current physique, or build lean muscle mass.
            </p>
            <p>
              This tool utilizes the <strong>Mifflin-St Jeor Equation</strong>, recognized by health professionals as the most accurate formula for estimating Basal Metabolic Rate (BMR) in modern populations. By factoring in your age, gender, weight, and height, we establish your metabolic baseline—the energy your body requires simply to exist.
            </p>
            <p>
              Beyond the baseline, we incorporate your <strong>Total Daily Energy Expenditure (TDEE)</strong>. By selecting an activity level that matches your lifestyle, from sedentary office work to high-intensity athletic training, you get a clear picture of your actual daily burn. Our "Goal Offset" then applies a strategic caloric adjustment—typically 500 calories for sustainable weight management—to give you a precise daily target.
            </p>
            <p>
              The final piece of the puzzle is <strong>Macronutrient Balancing</strong>. While calories determine weight change, macros determine body composition. Use our default balanced split or activate <strong>Custom Macros</strong> to fine-tune your intake of Proteins (4 kcal/g), Carbohydrates (4 kcal/g), and Fats (9 kcal/g) to match your specific training protocol or dietary preferences.
            </p>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-6 mt-12 uppercase tracking-tight">Expert Guidance & FAQ</h2>
          <FAQAccordion items={faqs} />
        </section>
      </div>

    </div>
  );
}
