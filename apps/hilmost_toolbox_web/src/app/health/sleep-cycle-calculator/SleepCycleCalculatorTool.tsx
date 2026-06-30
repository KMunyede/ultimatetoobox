"use client";

import React, { useState, useEffect } from "react";

type Mode = "wake_up" | "bed_time";

interface SleepTime {
  time: string;
  cycles: number;
  duration: string;
  quality: "optimal" | "good" | "minimum";
}

export function SleepCycleCalculatorTool() {
  // --- State ---
  const [mode, setMode] = useState<Mode>("wake_up");
  const [inputTime, setInputTime] = useState("07:00");
  const [fallAsleepMins, setFallAsleepMins] = useState<string>("14");
  const [results, setResults] = useState<SleepTime[] | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copyStatus, setCopyStatus] = useState(false);

  // --- Live Clock ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Logic ---
  const calculate = () => {
    const [hours, minutes] = inputTime.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    const fMins = fallAsleepMins === '' ? 0 : parseInt(fallAsleepMins);

    const cycleCounts = [6, 5, 4, 3];
    const calculated: SleepTime[] = cycleCounts.map((cycles) => {
      const totalMinutes = cycles * 90;
      const resultDate = new Date(baseDate);

      if (mode === "wake_up") {
        // bedTime = wakeTime - (cycles * 90) - fallAsleepMins
        resultDate.setMinutes(resultDate.getMinutes() - totalMinutes - fMins);
      } else {
        // wakeTime = bedTime + fallAsleepMins + (cycles * 90)
        resultDate.setMinutes(resultDate.getMinutes() + totalMinutes + fMins);
      }

      const timeStr = resultDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      let quality: "optimal" | "good" | "minimum" = "minimum";
      if (cycles >= 5) quality = "optimal";
      else if (cycles === 4) quality = "good";

      return {
        time: timeStr,
        cycles,
        duration: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
        quality,
      };
    });

    setResults(calculated);
  };

  const useCurrentTime = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    setInputTime(`${h}:${m}`);
  };

  const handleCopy = () => {
    if (!results) return;
    const fMins = fallAsleepMins === '' ? 0 : parseInt(fallAsleepMins);
    const header = mode === "wake_up"
      ? `Optimal Bedtimes for waking at ${inputTime} (with ${fMins}m fall asleep):`
      : `Optimal Wakeup Times for sleeping at ${inputTime} (with ${fMins}m fall asleep):`;

    const body = results
      .map(r => `- ${r.time} (${r.cycles} cycles, ${r.duration}) [${r.quality.toUpperCase()}]`)
      .join("\n");

    const text = `${header}\n${body}\n\nCalculated via Hilmost Sleep Lab`;
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-12">

      {/* 1. Mode Toggle Pills */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button
            onClick={() => { setMode("wake_up"); setResults(null); }}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === "wake_up"
                ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Wake Up At
          </button>
          <button
            onClick={() => { setMode("bed_time"); setResults(null); }}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === "bed_time"
                ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Go To Bed At
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. Live Clock Section */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Clock</span>
            </div>
            <button
              onClick={useCurrentTime}
              className="text-[10px] font-black uppercase tracking-widest text-rose-600 hover:underline"
            >
              Use Current Time
            </button>
          </div>
          <div className="text-4xl font-black text-slate-800 dark:text-white tabular-nums">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        {/* 3. Time Input Section */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-4">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
            {mode === "wake_up" ? "I want to wake up at..." : "I'm going to bed at..."}
          </label>
          <input
            type="time"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-3xl font-black text-center focus:border-rose-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* 4. Fall Asleep Pills */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400">How long does it take you to fall asleep?</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[5, 10, 14, 20, 30].map((mins) => (
            <button
              key={mins}
              onClick={() => setFallAsleepMins(mins.toString())}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                fallAsleepMins === mins.toString()
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {mins} min{mins === 14 && " (Avg)"}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={calculate}
          className="px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          Calculate Results
        </button>
      </div>

      {/* 6. Results Section */}
      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((res, i) => (
              <div
                key={i}
                className={`p-8 rounded-[2.5rem] border-2 transition-all relative ${
                  res.quality === "optimal"
                    ? "border-rose-500 bg-rose-50/30 dark:bg-rose-900/10 shadow-xl"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{res.cycles} Cycles</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    res.quality === "optimal" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                    res.quality === "good" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {res.quality}
                  </span>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{res.time}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{res.duration} sleep</div>

                {res.quality === "optimal" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Optimal
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 8. Copy Results Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              <svg className={`w-4 h-4 ${copyStatus ? 'text-emerald-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {copyStatus ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                )}
              </svg>
              {copyStatus ? "Copied!" : "Copy Results"}
            </button>
          </div>
        </div>
      )}

      {/* 7. Sleep Tips Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Consistency", text: "Go to bed and wake up at the same time every day to stabilize your internal clock." },
          { title: "Dark Room", text: "Ensure your environment is pitch black to trigger melatonin production naturally." },
          { title: "Avoid Screens", text: "Blue light from phones blocks sleep hormones. Put devices away 60 mins before bed." },
          { title: "Caffeine Cutoff", text: "Stop caffeine intake 8-10 hours before sleep to ensure it doesn't block adenosine." },
        ].map((tip, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-600 mb-2">{tip.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>

      {/* 9. SEO Block */}
      <div className="mt-24 pt-12 border-t border-slate-100 dark:border-slate-800 space-y-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Free Sleep Cycle Calculator</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            Understanding your biological clock is the key to waking up refreshed. Most people operate on <strong>90-minute sleep cycles</strong>, moving from light sleep to deep sleep and finally REM. If you wake up in the middle of a deep sleep stage, you experience sleep inertia—that heavy, groggy feeling that can last for hours. Our <strong>Sleep Cycle Calculator</strong> predicts the best windows for you to wake up based on these natural rhythms.
          </p>
          <p>
            By timing your alarm to coincide with the end of a cycle, you allow your brain to transition smoothly into wakefulness. For most adults, getting 5 to 6 full cycles (7.5 to 9 hours) is optimal for cognitive function and physical recovery. However, even 4 cycles (6 hours) can feel better than 7 hours if you wake up at the right moment.
          </p>
          <p>
            Our tool also accounts for <strong>Sleep Latency</strong>—the time it takes for you to actually fall asleep. On average, this takes 14 minutes. By including this in the math, we ensure that your calculated bedtimes or wakeup times are realistic and actionable. Start optimizing your rest today with our privacy-first, browser-side sleep laboratory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {[
            { q: "What is a sleep cycle?", a: "A sleep cycle consists of four stages: three stages of Non-REM and one stage of REM. A complete cycle typically lasts about 90 minutes." },
            { q: "How many cycles do I need?", a: "For peak performance, aim for 5 or 6 cycles. Consistency is more important than total hours, so try to keep a regular schedule." },
            { q: "What is sleep inertia?", a: "Sleep inertia is the physiological state of grogginess and impaired cognitive performance immediately after waking from deep sleep." },
            { q: "How accurate is the calculator?", a: "The 90-minute cycle is a biological average. While most people fall within this range, personal variations exist based on age and health." },
          ].map((faq, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">{faq.q}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default SleepCycleCalculatorTool;
