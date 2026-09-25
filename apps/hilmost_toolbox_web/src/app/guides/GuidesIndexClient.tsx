"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search } from "lucide-react";

type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  lastUpdated?: string;
};

export function GuidesIndexClient({
  guides,
  lastUpdated,
}: {
  guides: Guide[];
  lastUpdated: string;
}) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(guides.map((g) => g.category)));
    return ["All", ...unique];
  }, [guides]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "az">("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleGuides = useMemo(() => {
    let filtered =
      activeCategory === "All"
        ? guides
        : guides.filter((g) => g.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (g) => g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q)
      );
    }

    return [...filtered].sort((a, b) => {
      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }
      const dateA = new Date(a.lastUpdated || lastUpdated).getTime();
      const dateB = new Date(b.lastUpdated || lastUpdated).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [guides, activeCategory, searchQuery, sortBy, lastUpdated]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search guides by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-canvas-card border border-base rounded-full text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-normal uppercase tracking-wider text-text-muted whitespace-nowrap">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "az")}
            className="px-4 py-2 bg-canvas-card border border-base rounded-full text-sm text-text-primary focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-normal uppercase tracking-wide transition-colors border ${
                activeCategory === cat
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-canvas-card text-text-secondary border-base hover:border-brand-primary/50"
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col bg-canvas-card border border-base rounded-2xl p-5 transition-all hover:shadow-lg hover:border-brand-primary/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-normal uppercase tracking-[0.15em] text-brand-primary">
                {guide.category.replace("-", " ")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-normal text-slate-400 uppercase bg-slate-50 dark:bg-slate-800/30 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                <Calendar size={9} />
                {guide.lastUpdated || lastUpdated}
              </span>
            </div>
            <h2 className="text-base font-normal text-text-primary mb-2 leading-snug group-hover:text-brand-primary transition-colors">
              {guide.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3 flex-1 font-medium">
              {guide.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-brand-primary group-hover:gap-3 transition-all mt-auto">
              Read Guide <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {visibleGuides.length === 0 && (
        <p className="text-text-secondary text-center py-16">
          No guides found matching your search or selected category.
        </p>
      )}
    </div>
  );
}
