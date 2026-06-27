import Link from "next/link";
import { ArrowRight, HeartPulse, Sparkles } from "lucide-react";

export const metadata = {
  title: "Hilmost Health Hub | Daily Wisdom & Wellness",
  description: "Explore health and wellness applications developed by Hilmost Health.",
};

export default function HealthHub() {
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-950">
        <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 py-24 sm:py-32 lg:px-8 text-center max-w-4xl">
            <div className="mx-auto h-20 w-20 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-3xl flex items-center justify-center mb-8">
              <HeartPulse size={40} />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl mb-6">
              Hilmost Health Hub
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-8">
              Discover digital wellness platforms and health applications designed to inspire and improve your daily life.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 sm:py-24 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              href="https://hilmost-wisdom.web.app"
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-rose-500/50"
            >
              <div className="h-14 w-14 bg-gradient-to-br from-rose-500 to-orange-400 rounded-2xl flex items-center justify-center mb-6 text-white shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Daily Wisdom & Wellness</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                Your daily companion for inspiration, mental clarity, and well-being. Start your day with purpose.
              </p>
              <div className="flex items-center text-rose-600 dark:text-rose-400 font-semibold gap-2 group-hover:gap-3 transition-all">
                Open Application <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
