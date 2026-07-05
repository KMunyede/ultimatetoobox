import React from "react";

export function ToolArticle({ children, title, className = "" }: { children: React.ReactNode, title?: string, className?: string }) {
  return (
    <article className={`mt-16 pt-12 border-t border-slate-200 dark:border-slate-800 prose prose-slate dark:prose-invert max-w-4xl mx-auto ${className}`}>
      {title && <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">{title}</h2>}
      {children}
    </article>
  );
}
