import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@utilitiessite/config";

const FEATURED_SLUGS = [
  "calculate-monthly-loan-repayments",
  "compound-interest-explained",
  "bmi-calculator-score-meaning",
  "password-entropy-and-crack-time-explained",
  "how-qr-codes-work",
  "unit-conversion-made-simple"
];

export function FeaturedGuides() {
  const featuredGuides = FEATURED_SLUGS
    .map((slug) => GUIDES.find((g) => g.slug === slug))
    .filter((guide): guide is NonNullable<typeof guide> => guide !== undefined);

  if (featuredGuides.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-normal mb-6 uppercase tracking-tight text-black dark:text-white">
        Popular Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-indigo-500/50"
          >
            <h3 className="text-xl font-normal text-black dark:text-white mb-2">
              {guide.title}
            </h3>
            <p className="text-sm text-black dark:text-white mb-4 line-clamp-3">
              {guide.excerpt}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-normal text-indigo-600 dark:text-indigo-400">
              Read Guide <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/guides"
          className="inline-flex items-center text-sm font-normal text-indigo-600 dark:text-indigo-400 hover:underline group"
        >
          View all guides <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
