import Link from "next/link";
import { Sparkles, ArrowRight, Code2 } from "lucide-react";
import { Metadata } from "next";
import { TOOL_CATEGORIES } from "@utilitiessite/config";

export const metadata: Metadata = {
  title: "Hilmost | Free Browser-Based Tools",
  description: "Free browser-based tools and utilities for everyday tasks — fast, private, no sign-up required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hilmost | Free Browser-Based Tools",
    description: "Free browser-based tools and utilities for everyday tasks — fast, private, no sign-up required.",
    url: "https://hilmost.net",
    images: [
      {
        url: "https://hilmost.net/og-home.png",
        width: 1200,
        height: 630,
        alt: "Hilmost | Free Browser-Based Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilmost | Free Browser-Based Tools",
    description: "Free browser-based tools and utilities for everyday tasks — fast, private, no sign-up required.",
    images: ["https://hilmost.net/og-home.png"],
  },
};

export default function Home() {
  const totalTools = TOOL_CATEGORIES.reduce((acc, cat) => acc + cat.count, 0);
  const displayCount = Math.floor(totalTools / 10) * 10;

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hilmost Software Corporation",
          "alternateName": "HSC",
          "url": "https://hilmost.net",
          "logo": "https://hilmost.net/logo.png",
          "description": "Hilmost builds free browser-based tools and everyday software for finance, health, and data science.",
          "sameAs": ["https://github.com/KMunyede"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@hilmost.net"
          }
        })}}
      />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
          
          {/* Hero Section */}
          <div className="mb-12 border-b border-base pb-8">
            <h1 className="font-black tracking-tighter text-text-primary text-4xl sm:text-5xl lg:text-6xl leading-[0.9] mb-4">
              Everyday tools. <span className="text-brand-primary">Built to just work.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium max-w-3xl">
              Hilmost builds free browser-based tools and everyday software — simple, fast, and private by design. All calculations run locally on your device.
            </p>
          </div>

          {/* Our Products Section */}
          <div className="mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-6">Product Ecosystem</h2>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <Link href="https://hilmost-toolbox.hilmost.net" className="group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 outline-none rounded-lg">
                <span className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">Hilmost Toolbox</span>
                <span className="ml-2 text-xs font-bold text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">→ Open</span>
              </Link>
              <Link href="https://shop.hilmost.net" className="group focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 outline-none rounded-lg">
                <span className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">Hilmost Apparel</span>
                <span className="ml-2 text-xs font-bold text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">→ Shop</span>
              </Link>
              <div className="flex items-center">
                <span className="text-xl font-bold text-text-muted cursor-not-allowed">Hilmost Apps</span>
                <span className="ml-3 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-canvas-muted rounded text-text-muted border border-base">Soon</span>
              </div>
            </div>
          </div>

          {/* Dense Directory Section - Curated Top Categories */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Free Digital Utilities</h2>
                <div className="h-px flex-1 bg-brand-primary/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-16">
              {TOOL_CATEGORIES.slice(0, 4).map((cat) => (
                <div key={cat.name} className="flex flex-col">
                  <h3 className="text-xs font-black uppercase tracking-widest text-text-primary mb-6 flex items-center justify-between group cursor-default">
                    {cat.name}
                    <span className="h-px flex-1 bg-base ml-4 opacity-50" />
                  </h3>
                  <ul className="flex flex-col space-y-3">
                    {cat.tools.map((tool) => (
                      <li key={tool.href}>
                        <Link
                          href={`https://hilmost-toolbox.hilmost.net${tool.href}`}
                          className="text-sm font-bold text-text-secondary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-sm transition-colors block"
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`https://hilmost-toolbox.hilmost.net/${cat.slug}`}
                        className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-sm pt-2 inline-block"
                      >
                        View all {cat.name} →
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <Link
                href="https://hilmost-toolbox.hilmost.net"
                className="inline-flex items-center gap-3 px-8 py-4 bg-canvas-card border border-brand-primary/20 text-brand-primary font-black uppercase tracking-widest rounded-2xl hover:bg-brand-primary hover:text-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none transition-all text-sm"
              >
                Open Full Directory ({displayCount}+ Tools) <ArrowRight size={18} />
              </Link>
            </div>
          </div>


          {/* Core Web Vitals Banner */}
          <div className="mt-10 p-6 md:p-8 bg-text-primary dark:bg-canvas-card rounded-2xl border border-base relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Code2 size={16} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary font-mono">Architecture Status: Stable</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-canvas-card dark:text-text-primary tracking-tighter leading-tight mb-4">
                            Every tool runs entirely in your browser.
                        </h2>
                        <p className="text-text-muted font-medium text-base leading-relaxed max-w-xl">
                            No sign-up. No data leaves your device. Just fast, accurate tools — free, forever. Hilmost utilizes the latest Web APIs to ensure total privacy and maximum performance.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Link
                          href="https://hilmost-toolbox.hilmost.net"
                          className="px-8 py-4 bg-canvas-card border border-brand-primary/20 text-brand-primary font-black uppercase tracking-widest rounded-2xl hover:bg-brand-primary hover:text-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none transition-all text-sm"
                        >
                            Open All Tools
                        </Link>
                        <span className="text-[10px] font-mono font-bold text-text-muted uppercase">SYSTEMS OPERATIONAL v2.4.0</span>
                    </div>
                </div>
          </div>
        </div>
    </main>
  );
}
