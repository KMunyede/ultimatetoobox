import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { AdLayout } from "@utilitiessite/ui";
import { BlogIndexClient } from "./BlogIndexClient";
import { BLOG_POSTS } from "@utilitiessite/config";

export const metadata: Metadata = {
  title: "Blog | Hilmost",
  description: "Insights on software engineering, product design, and building the Hilmost Toolbox. Read our latest articles on crafting professional-grade digital utilities and tools.",
};

export default function BlogIndex() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-brand-primary/10 rounded-lg">
            <BookOpen className="text-brand-primary" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            The <span className="text-brand-primary">Blog</span>
          </h1>
        </div>

        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl">
          Thoughts on engineering, focus, and building tools that respect the user.
        </p>

        <BlogIndexClient posts={BLOG_POSTS} />
      </div>
    </AdLayout>
  );
}
