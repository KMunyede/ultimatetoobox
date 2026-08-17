import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import { TOOL_CATEGORIES, getFeaturedTools, TOTAL_TOOL_COUNT } from "@utilitiessite/config";

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
  const displayCount = Math.floor(TOTAL_TOOL_COUNT / 10) * 10;
  const featuredTools = getFeaturedTools();

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-4 md:pb-6 max-w-7xl">
          
          {/* Hero Section */}
          <div className="mb-8 pb-4 md:mb-12 md:pb-8 border-b border-base">
            <h1 className="font-semibold tracking-tighter text-text-primary text-4xl sm:text-5xl lg:text-6xl leading-[0.9] mb-4">
              Everyday tools. <span className="text-brand-primary">Built to just work.</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-medium max-w-3xl">
              Hilmost builds free browser-based tools and everyday software — simple, fast, and private by design. All calculations run locally on your device.
            </p>
          </div>

          {/* Why Hilmost Exists */}
          <div className="mb-8 md:mb-16 max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary mb-4">Why Hilmost Exists</h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Hilmost started with a simple frustration: coordinating meetings across colleagues spread over five continents meant juggling time zones by hand, because the tools online were confusing or bloated. That became the Time Zone Converter — the first tool in what's grown into a toolbox of 50+ free utilities, all built on one principle: fast, private, and no unnecessary friction. No sign-up, no data collection — everything runs on your device.
            </p>
          </div>

          {/* Our Products Section */}
          <div className="mb-8 md:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary mb-6">Product Ecosystem</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <Link href="https://hilmost-toolbox.hilmost.net" className="group flex flex-col items-start px-6 py-4 rounded-xl border border-base hover:border-brand-primary hover:bg-brand-primary/5 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 outline-none transition-all">
                <span className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">Hilmost Toolbox</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">→ Open Product</span>
              </Link>
              <Link href="https://shop.hilmost.net" className="group flex flex-col items-start px-6 py-4 rounded-xl border border-base hover:border-brand-primary hover:bg-brand-primary/5 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 outline-none transition-all">
                <span className="text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">Hilmost Apparel</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">→ Shop Store</span>
              </Link>
              <div className="flex flex-col items-start px-6 py-4 rounded-xl border border-base text-text-muted cursor-not-allowed opacity-60">
                <span className="text-xl font-bold">Hilmost Apps</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Dense Directory Section - Featured Tools */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">Featured Free Utilities</h2>
                <div className="h-px flex-1 bg-brand-primary/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 md:gap-y-8">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={`https://hilmost-toolbox.hilmost.net${tool.href}`}
                  className="text-base font-medium text-text-secondary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none rounded-md transition-colors block"
                >
                  {tool.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 md:mt-10 text-center">
              <Link
                href="https://hilmost-toolbox.hilmost.net"
                className="inline-flex items-center gap-3 px-8 py-4 bg-canvas-card border border-brand-primary/20 text-brand-primary font-bold uppercase tracking-widest rounded-2xl hover:bg-brand-primary hover:text-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 outline-none transition-all text-sm"
              >
                Open Full Directory ({displayCount}+ Tools) <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* From the Blog */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-4 mb-6 md:mb-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">From the Blog</h2>
              <div className="h-px flex-1 bg-brand-primary/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              <Link href="/blog/why-we-built-the-toolbox" className="text-base font-medium text-text-secondary hover:text-brand-primary transition-colors block">Why We Built the Hilmost Toolbox</Link>
              <Link href="/blog/building-a-private-password-generator" className="text-base font-medium text-text-secondary hover:text-brand-primary transition-colors block">Building an Actually Private Password Generator</Link>
              <Link href="/blog/self-improvement-distracted-world" className="text-base font-medium text-text-secondary hover:text-brand-primary transition-colors block">Building Software for Self-Improvement</Link>
              <Link href="/blog/six-week-indexing-stall" className="text-base font-medium text-text-secondary hover:text-brand-primary transition-colors block">What a Six-Week Indexing Stall Taught Me</Link>
            </div>
          </div>
        </div>
    </main>
  );
}
