"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Moon,
  Sun,
  Clock,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Info,
  BedDouble,
  AlarmClock
} from "lucide-react";
import { FAQAccordion } from "@utilitiessite/ui";

type Mode = "wakeup" | "bedtime";

interface SleepResult {
  cycles: number;
  time: Date;
  label: string;
  hours: number;
  minutes: number;
}

export function SleepCycleCalculatorTool() {
  const [mode, setMode] = useState<Mode>("wakeup");
  const [inputTime, setInputTime] = useState("07:00");
  const [fallAsleepMins, setFallAsleepMins] = useState(14);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [results, setResults] = useState<SleepResult[] | null>(null);
  const [copyStatus, setCopyStatus] = useState(false);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculate = () => {
    const [hours, minutes] = inputTime.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const newResults: SleepResult[] = [];
    const cycleCounts = [6, 5, 4, 3];

    cycleCounts.forEach((cycles) => {
      const totalMinutes = cycles * 90;
      const resultTime = new Date(baseDate);

      if (mode === "wakeup") {
        // Calculate when to go to bed
        // Bedtime = WakeupTime - CycleTime - FallAsleepTime
        resultTime.setMinutes(resultTime.getMinutes() - totalMinutes - fallAsleepMins);
      } else {
        // Calculate when to wake up
        // WakeupTime = Bedtime + CycleTime + FallAsleepTime
        resultTime.setMinutes(resultTime.getMinutes() + totalMinutes + fallAsleepMins);
      }

      let label = "Minimum";
      if (cycles >= 6) label = "Optimal";
      else if (cycles >= 5) label = "Great";
      else if (cycles >= 4) label = "Good";

      newResults.push({
        cycles,
        time: resultTime,
        label,
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
      });
    });

    setResults(newResults);
  };

  const handleCopy = () => {
    if (!results) return;
    const modeText = mode === "wakeup" ? "Best Bedtimes for Wakeup at" : "Best Wakeup Times for Bedtime at";
    const times = results.map(r =>
      `${r.cycles} Cycles (${r.hours}h ${r.minutes}m): ${r.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${r.label}`
    ).join("\n");

    const text = `Sleep Cycle Report (Hilmost Toolbox)\n-------------------------------------------\n${modeText} ${inputTime}\nFall asleep time: ${fallAsleepMins} mins\n\n${times}`;

    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const useCurrentTime = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    setInputTime(`${h}:${m}`);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-10">

      {/* 1. LIVE CLOCK & MODE */}
      <div className="flex flex-col items-center gap-6">
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-2 rounded-full border border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Clock size={14} className="text-rose-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">
            Local Time: {currentTime.toLocaleTimeString()}
          </span>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl" id="mode-toggle">
          {(["wakeup", "bedtime"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                mode === m
                  ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {m === "wakeup" ? "I want to wake up at" : "I'm going to bed at"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. TIME INPUT */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6" id="time-input-section">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {mode === "wakeup" ? <AlarmClock size={18} className="text-rose-500" /> : <BedDouble size={18} className="text-rose-500" />}
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">
                {mode === "wakeup" ? "Wakeup Time" : "Bedtime"}
              </h2>
            </div>
            <button
              onClick={useCurrentTime}
              className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:underline"
            >
              Use Current
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-3xl font-black text-center focus:border-rose-500 outline-none transition-all"
            />
            <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">
              Set your target {mode === "wakeup" ? "morning alarm" : "sleep time"}
            </p>
          </div>
        </div>

        {/* 3. FALL ASLEEP DURATION */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between" id="fall-asleep-section">
          <div className="flex items-center gap-2 mb-6">
            <Moon size={18} className="text-rose-500" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-100">Time to Fall Asleep</h2>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration</span>
              <span className="text-2xl font-black text-rose-600">{fallAsleepMins} <small className="text-xs text-slate-400">mins</small></span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={fallAsleepMins}
              onChange={(e) => setFallAsleepMins(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
              <Info size={14} className="text-rose-500 shrink-0" />
              <p className="text-[9px] font-bold text-slate-500 leading-tight uppercase tracking-tight">
                The average person takes 14 minutes to fall asleep. Adjust this to match your habits.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CALCULATE BUTTON */}
      <div className="flex justify-center">
        <button
          id="calculate-btn"
          onClick={calculate}
          className="flex items-center gap-2 px-12 py-4 bg-rose-600 text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 hover:scale-105 transition-all active:scale-95"
        >
          <Zap size={18} /> Calculate Cycles
        </button>
      </div>

      {/* 5. RESULTS */}
      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((res, i) => (
              <div
                key={i}
                className={`p-6 rounded-[2rem] border-2 transition-all relative overflow-hidden group ${
                  res.label === "Optimal"
                    ? "bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-500/20"
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800"
                }`}
              >
                <div className={`absolute -right-2 -top-2 opacity-5 group-hover:scale-110 transition-transform ${res.label === "Optimal" ? "text-white" : "text-rose-500"}`}>
                  {mode === "wakeup" ? <Moon size={80} /> : <Sun size={80} />}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${res.label === "Optimal" ? "text-white/70" : "text-slate-400"}`}>
                      {res.cycles} Cycles
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      res.label === "Optimal" ? "bg-white text-rose-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      {res.label}
                    </span>
                  </div>

                  <div>
                    <p className={`text-3xl font-black ${res.label === "Optimal" ? "text-white" : "text-slate-900 dark:text-white"}`}>
                      {res.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${res.label === "Optimal" ? "text-white/60" : "text-slate-400"}`}>
                      {res.hours}h {res.minutes}m of sleep
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={handleCopy} className="flex-1 sm:flex-none flex items-center gap-2 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
              {copyStatus ? <Check size={18} /> : <Copy size={18} />}
              {copyStatus ? "Copied!" : "Copy Schedule"}
            </button>
            <button onClick={() => setResults(null)} className="flex items-center gap-2 px-10 py-5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all">
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      )}

      {/* SEO & CONTENT */}
      <div className="mt-20 space-y-20">
        <div className="flex items-center justify-center gap-2 text-slate-300 select-none">
          <Zap size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Optimized for Human Biology. Zero Data Collection.</span>
        </div>

        <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 border-t border-slate-100 dark:border-slate-800">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter">Master Your Sleep Cycles</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <p>
              Ever wake up feeling groggy even after a long night of sleep? This is often caused by <strong>sleep inertia</strong>—the result of being woken up in the middle of a deep sleep cycle. Our <strong>Sleep Cycle Calculator</strong> helps you time your wake-up or bedtimes to align with your body&apos;s natural 90-minute rhythms.
            </p>
            <p>
              A typical human sleep cycle lasts about 90 minutes. During this time, you move through various stages of sleep, from light sleep to deep sleep and REM (Rapid Eye Movement). Waking up at the end of a cycle, when you are in the lightest stage of sleep, allows you to feel refreshed and alert immediately.
            </p>
            <p>
              Most adults need <strong>7 to 9 hours of sleep</strong> (5 to 6 cycles) to function optimally. However, even getting 6 hours (4 cycles) can feel better than 7 hours if you wake up at the right time. Our tool also accounts for <strong>Sleep Latency</strong>—the time it takes for you to actually fall asleep once your head hits the pillow.
            </p>
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 mt-12 uppercase tracking-tight">Sleep Hygiene Tips</h2>
          <FAQAccordion items={[
            { question: "What is the 90-minute rule?", answer: "The 90-minute rule suggests that human sleep consists of roughly 90-minute cycles. By timing your sleep to end at the completion of a cycle, you avoid waking up during deep sleep, which significantly reduces morning grogginess." },
            { question: "How many cycles do I really need?", answer: "While 5 or 6 cycles (7.5 to 9 hours) are considered optimal for most adults, consistency is key. Getting 4 cycles (6 hours) at the same time every day is often better than erratic sleep patterns." },
            { question: "What is sleep inertia?", answer: "Sleep inertia is the feeling of grogginess and disorientation experienced upon waking. It is most severe when you wake up during a stage of deep (slow-wave) sleep." },
            { question: "How can I fall asleep faster?", answer: "Improve your sleep latency by cooling down your room, avoiding blue light (screens) 60 minutes before bed, and maintaining a consistent 'wind-down' routine." }
          ]} />
        </section>
      </div>

    </div>
  );
}
