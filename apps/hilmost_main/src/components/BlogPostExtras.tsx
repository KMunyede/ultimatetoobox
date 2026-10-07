import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@utilitiessite/config";

export default function BlogPostExtras({ slug }: { slug: string }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;

  const others = BLOG_POSTS.filter((p) => p.slug !== slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others
    .filter((p) => p.category !== post.category)
    .sort((a, b) => b.dateValue.localeCompare(a.dateValue));
  const related = [...same, ...rest].slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateValue,
    articleSection: post.category,
    mainEntityOfPage: `https://hilmost.net/blog/${post.slug}`,
    author: { "@type": "Person", name: "Keepy Munyede", jobTitle: "Technical Founder" },
    publisher: { "@type": "Organization", name: "Hilmost Software Corporation", url: "https://hilmost.net" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-normal mb-6 uppercase tracking-tight text-slate-900 dark:text-white">More from the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-slate-400 dark:hover:border-slate-600 transition-colors">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{p.category}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">{p.excerpt}</p>
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">Read post <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/blog" className="underline">All posts</Link>
          {" · "}
          <a href="https://hilmost-toolbox.hilmost.net" className="underline">Free Hilmost Toolbox</a>
          {" · "}
          <a href="https://hilmost-toolbox.hilmost.net/guides" className="underline">Toolbox guides</a>
        </p>
      </section>
    </>
  );
}
