import Link from "next/link";
import { KBArticle } from "@utilitiessite/config";
import { BookOpen, ArrowRight } from "lucide-react";

export function KnowledgeCard({ article }: { article: KBArticle }) {
  return (
    <Link
      href={`/knowledge-base/${article.slug}`}
      className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] hover:border-brand-primary transition-all shadow-sm hover:shadow-md flex flex-col h-full"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
          <BookOpen size={18} />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand-primary transition-colors">
          {article.category.replace("-", " ")}
        </span>
      </div>
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-brand-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest group-hover:gap-3 transition-all">
        Read Insight <ArrowRight size={14} />
      </div>
    </Link>
  );
}
