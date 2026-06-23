import { Metadata } from "next";
import { Breadcrumbs, KnowledgeCard } from "@utilitiessite/ui";
import { KNOWLEDGE_BASE } from "@utilitiessite/config";
import { Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Knowledge Base — Utility Engineering Insights | Hilmost Labs",
  description: "Explore the theory behind the tools. In-depth articles on financial modeling, health metrics, data science, and physics from the Hilmost Digital Labs research team.",
};

export default function KnowledgeBasePage() {
  const breadcrumbItems = [
    { label: "Knowledge Base", href: "/knowledge-base" },
  ];

  return (
    <div className="container mx-auto px-4 py-2 max-w-6xl">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
          <Lightbulb size={12} />
          Informational Depth
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
          Laboratory <span className="text-blue-600">Insights</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The Hilmost Digital Labs Knowledge Base provides technical deep-dives into the mathematical models and logic that power our utility engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {KNOWLEDGE_BASE.map((article) => (
          <KnowledgeCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="mt-20 p-12 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase">More Insights Coming Soon</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Our engineering team is currently documenting over 100+ technical topics covering everything from relativistic mechanics to tax arbitrage algorithms.
        </p>
      </div>
    </div>
  );
}
