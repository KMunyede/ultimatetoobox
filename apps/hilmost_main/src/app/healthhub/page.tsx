import { Metadata } from "next";
import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta(
    "/healthhub",
    "Hilmost Health Hub | Daily Wisdom & Wellness",
    "Free health and well-being tools from Hilmost: Daily Wisdom for a clear mind, plus BMI and waist risk, calorie and macro, and sleep cycle calculators."
  ),
  robots: { index: false, follow: true },
};

interface HealthTool {
  group: "Mind" | "Body";
  name: string;
  href: string;
  description: string;
}

const HEALTH_TOOLS: HealthTool[] = [
  {
    group: "Mind",
    name: "Daily Wisdom",
    href: "https://hilmost-toolbox.hilmost.net/health/daily-wisdom",
    description: "A daily quote, a private journal and a library of reflections to help you start the day with a clear head.",
  },
  {
    group: "Body",
    name: "Health Risk Calculator",
    href: "https://hilmost-toolbox.hilmost.net/health/bmi-calculator",
    description: "BMI plus waist measurements (waist-to-height and waist-to-hip), which give a fuller picture than BMI alone.",
  },
  {
    group: "Body",
    name: "Calorie & Macro Calculator",
    href: "https://hilmost-toolbox.hilmost.net/health/calorie-macro-calculator",
    description: "Estimates the energy your body burns at rest (BMR), your total daily energy needs (TDEE), and a protein, carb and fat split for your goal.",
  },
  {
    group: "Body",
    name: "Sleep Cycle Calculator",
    href: "https://hilmost-toolbox.hilmost.net/health/sleep-cycle-calculator",
    description: "Finds bedtimes or wake-up times that line up with 90-minute sleep cycles, so you wake up between cycles rather than in the middle of one.",
  },
];

export default function HealthHub() {
  const mindTools = HEALTH_TOOLS.filter((t) => t.group === "Mind");
  const bodyTools = HEALTH_TOOLS.filter((t) => t.group === "Body");

  return (
    <main className="flex-1 bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8 sm:py-10 lg:px-8 text-center max-w-4xl">
          <div className="mx-auto h-16 w-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6">
            <HeartPulse size={32} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
            Hilmost Health Hub
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-8">
            Free tools for everyday health and mental well-being. Use them as a starting point for better habits, not as a diagnosis.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 sm:py-12 lg:px-8 max-w-7xl space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mind</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mindTools.map((tool) => (
              <div
                key={tool.href}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-rose-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6 text-white shadow-sm">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{tool.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                  {tool.description}
                </p>
                <div>
                  <a
                    href={tool.href}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                  >
                    Open {tool.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Body</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bodyTools.map((tool) => (
              <div
                key={tool.href}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800"
              >
                <div className="h-14 w-14 bg-gradient-to-br from-rose-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6 text-white shadow-sm">
                  <HeartPulse size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{tool.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed">
                  {tool.description}
                </p>
                <div>
                  <a
                    href={tool.href}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                  >
                    Open {tool.name} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Using these tools well</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Treat the numbers as a guide, not a verdict. Small, steady changes tracked over weeks tell you more than a single result on a single day.
            </p>
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Health note</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              These tools give general information only and are not medical advice. Speak to a doctor or qualified health professional before making big changes. That matters most if you have a medical condition, are pregnant, or take medication.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
