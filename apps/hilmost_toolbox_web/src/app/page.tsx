import Link from "next/link";
import { Calculator, ArrowRight, Activity, FileText, Banknote, Replace, Sparkles, Code2, GraduationCap } from "lucide-react";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";
import { WebApplicationSchema, OrganizationSchema, BreadcrumbSchema } from "@utilitiessite/ui";
import { getCanonicalUrl, TOOL_CATEGORIES } from "@utilitiessite/config";
import { Metadata } from "next";

const TITLE = "Free Online Calculators & Converters";
const DESC = "Free online calculators and converters — fast, accurate, and private. No sign-up, no data collection.";
const PATH = "/";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TITLE);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/main.png", width: 1200, height: 630, alt: "Hilmost Ultimate Toolbox" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/main.png"],
    }
  };
}

export default function Home() {
  const breadcrumbItems = [{ label: "Home", href: PATH }];

  const iconMap: Record<string, React.ReactNode> = {
    Banknote: <Banknote className="w-6 h-6 text-amber-500" />,
    FileText: <FileText className="w-6 h-6 text-red-500" />,
    Replace: <Replace className="w-6 h-6 text-blue-500" />,
    Binary: <FileText className="w-6 h-6 text-brand-primary" />,
    Calculator: <Calculator className="w-6 h-6 text-indigo-500" />,
    Activity: <Activity className="w-6 h-6 text-rose-500" />,
    HeartPulse: <Activity className="w-6 h-6 text-rose-500" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-orange-500" />,
    Code2: <Code2 className="w-6 h-6 text-slate-500" />,
  };

  const colorClassMap: Record<string, string> = {
    amber: "bg-amber-500/10",
    red: "bg-red-500/10",
    blue: "bg-blue-500/10",
    "brand-primary": "bg-brand-primary/10",
    indigo: "bg-indigo-500/10",
    rose: "bg-rose-500/10",
    orange: "bg-orange-500/10",
    slate: "bg-slate-500/10",
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
      <WebApplicationSchema
        name={`${TITLE} | Hilmost Ultimate Toolbox`}
        description={DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} className="animate-pulse" />
            The fastest, versatile toolbox
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-text-primary mb-3">
          Free Tools & <span className="text-brand-primary">Calculators</span>
        </h1>
        <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium">
          Fast, accurate, and secure tools for your daily workflow. <br className="hidden md:block" /> Built to run entirely in your browser.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {TOOL_CATEGORIES.map((category) => (
          <div key={category.name} className="group flex flex-col bg-canvas-card border border-base rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 outline-none">
            <div className="flex items-center gap-x-4 mb-3">
              <div className={`h-12 w-12 flex items-center justify-center rounded-2xl shrink-0 transition-transform group-hover:scale-110 duration-500 ${colorClassMap[category.color] || 'bg-slate-500/10'}`}>
                {iconMap[category.icon] || <Calculator className="w-6 h-6 text-slate-500" />}
              </div>
              <h2 className="text-lg font-extrabold text-text-primary tracking-tight">{category.name}</h2>
            </div>
            <p className="text-text-secondary mb-5 text-sm leading-relaxed font-medium line-clamp-2">{category.description}</p>

            <div className="flex-1 overflow-hidden">
              <div className={`pr-1 ${category.tools.length > 5 ? 'max-h-[280px] overflow-y-auto custom-scrollbar' : ''}`}>
                <ul className="space-y-0.5">
                  {category.tools.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group/link flex items-center justify-between py-2 border-b border-base/50 hover:border-brand-primary/50 transition-all">
                        <span className="text-sm font-bold text-text-secondary group-hover/link:text-brand-primary group-hover/link:translate-x-1 transition-all">{link.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover/link:opacity-100 group-hover/link:text-brand-primary transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-base">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted opacity-60">
                    {category.tools.length} Tools Available
                </p>
            </div>
          </div>
        ))}
      </div>



      {/* Trust Footer Section */}
      <div className="mt-16 py-8 border-t border-base text-center">
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Secured by</span>
                <span className="text-lg font-bold text-text-primary mt-1">Firebase</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Optimized for</span>
                <span className="text-lg font-bold text-text-primary mt-1">Core Web Vitals</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Global Edge</span>
                <span className="text-lg font-bold text-text-primary mt-1">Cloudflare</span>
            </div>
          </div>
      </div>
    </div>
  );
}
