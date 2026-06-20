import { WebApplicationSchema, Breadcrumbs, BreadcrumbSchema } from "@utilitiessite/ui";
import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { getCanonicalUrl } from "@utilitiessite/config";

const TITLE = "Health & Fitness Tools";
const DESC = "Free online health and fitness tools including BMI calculators and metric trackers. Monitor your health metrics and maintain your well-being with precision.";
const PATH = "/health";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TITLE} — Free Online Wellness Calculators | Hilmost Toolbox`,
    description: "Monitor your fitness and wellness with precision. Free online tools including BMI calculators, body metrics, and daily wellness resources.",
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const links = [
  {
    name: "Daily Wisdom & Wellness",
    href: "/health/daily-wisdom",
    description: "A digital sanctuary for mental well-being. Access daily quotes, journaling tools, and library resources to elevate your mindset."
  },
  {
    name: "BMI Calculator",
    href: "/health/bmi-calculator",
    description: "Calculate your Body Mass Index (BMI) instantly. Understand your weight category and track your fitness trajectory with ease."
  },
];

export default function HealthHub() {
  const breadcrumbItems = [{ label: "Health", href: PATH }];

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/health.png"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-center gap-3 mb-4 mt-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
          <Activity className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Health & Wellness
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
        Precision tools for your physical and mental well-being. Track your body metrics, gain daily insights, and maintain a healthier lifestyle with our secure, privacy-focused utilities.
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all hover:shadow-md hover:ring-rose-500/50">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{link.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
              {link.description}
            </p>
            <div className="mt-auto pt-2 flex items-center text-sm font-semibold text-rose-600 dark:text-rose-400">
              Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
