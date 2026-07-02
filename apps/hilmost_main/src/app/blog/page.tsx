import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { AdLayout } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Blog | Hilmost Digital Labs",
  description: "Insights on software engineering, product design, and building the Hilmost Toolbox.",
};

const posts = [
  {
    title: "Why We Built the Hilmost Toolbox",
    slug: "why-we-built-the-toolbox",
    excerpt: "The Hilmost Toolbox started as a simple idea: what if a calculator, converter, or PDF tool just worked, instantly, without friction?",
    date: "July 2024"
  },
  {
    title: "Building Software for Self-Improvement in a Distracted World",
    slug: "self-improvement-distracted-world",
    excerpt: "At Hilmost, we're interested in how you build technology that helps people focus, reflect, and actually improve their lives.",
    date: "June 2024"
  }
];

export default function BlogIndex() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <BookOpen className="text-brand-primary" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            The <span className="text-brand-primary">Blog</span>
          </h1>
        </div>

        <p className="text-xl text-slate-600 dark:text-slate-400 mb-16 leading-relaxed max-w-2xl">
          Thoughts on engineering, focus, and building tools that respect the user.
        </p>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all"
            >
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                {post.date}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-brand-primary font-bold uppercase text-sm tracking-widest">
                Read Post <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdLayout>
  );
}
