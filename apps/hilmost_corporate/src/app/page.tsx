import Link from "next/link";
import { Building2, Code2, HeartPulse, ShieldCheck, Wrench } from "lucide-react";

export default function Home() {
  const activeSubsidiaries = [
    { name: "Hilmost Software Corporation", icon: Code2, desc: "Digital platforms and SaaS solutions.", href: "/softwarehub" },
    { name: "Hilmost Health", icon: HeartPulse, desc: "Digital and physical health services. Home of Daily Wisdom.", href: "/healthhub" },
  ];

  const futureSubsidiaries = [
    { name: "Hilmost Engineering", icon: Wrench, desc: "Robust infrastructural solutions." },
    { name: "Hilmost Foods", icon: Building2, desc: "Food processing and distribution." },
    { name: "Hilmost Insurance", icon: ShieldCheck, desc: "Comprehensive risk management." },
  ];

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Welcome to Hilmost Enterprises
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          The operating entity of a diverse holdings company. We leverage technology to drive innovation across multiple sectors.
        </p>
      </div>

      <div className="mb-20 space-y-8">
        {/* Active Subsidiaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {activeSubsidiaries.map((sub) => (
            <Link 
              href={sub.href} 
              key={sub.name} 
              className="group block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/50 transition-all"
            >
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <sub.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sub.name}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{sub.desc}</p>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Future Subsidiaries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureSubsidiaries.map((sub) => (
            <div 
              key={sub.name} 
              className="relative block bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800/50 rounded-2xl p-6 opacity-80"
            >
              <div className="absolute top-4 right-4 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                Future Division 🚧
              </div>
              <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-center mb-4">
                <sub.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">{sub.name}</h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm">{sub.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/about" className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          Contact
        </Link>
      </div>
    </div>
  );
}
