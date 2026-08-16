"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  dateValue: string;
  category: string;
};

export function BlogIndexClient({ posts }: { posts: Post[] }) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["All", ...unique];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const visiblePosts = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? posts
        : posts.filter((p) => p.category === activeCategory);

    return [...filtered].sort((a, b) => {
      const cmp = a.dateValue.localeCompare(b.dateValue);
      return sortOrder === "newest" ? -cmp : cmp;
    });
  }, [posts, activeCategory, sortOrder]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors border ${
                activeCategory === cat
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-brand-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
          }
          className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-primary/50 transition-colors whitespace-nowrap"
        >
          {sortOrder === "newest" ? "Newest First" : "Oldest First"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visiblePosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
                {post.date}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-brand-primary font-bold uppercase text-xs tracking-widest mt-auto">
              Read Post{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>

      {visiblePosts.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400 text-center py-16">
          No posts in this category yet.
        </p>
      )}
    </div>
  );
}
