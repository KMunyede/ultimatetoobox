import Link from "next/link";
import { ArrowRight, Code2, HeartPulse, ShieldCheck, Utensils, Wrench, Sparkles, Zap, Binary, Microchip, Banknote, FileText, Replace } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hilmost | Engineering the Everyday Utility",
  description: "A specialized software R&D unit building high-precision digital tools. Fast, secure, and privacy-focused utilities for your daily workflow.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hilmost | Engineering the Everyday Utility",
    description: "High-precision digital tools and utilities for your daily workflow.",
    url: "https://hilmost.net",
    images: [
      {
        url: "https://hilmost.net/og-home.png",
        width: 1200,
        height: 630,
        alt: "Hilmost | Engineering the Everyday Utility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilmost | Engineering the Everyday Utility",
    description: "A specialized software R&D unit building high-precision digital tools. Fast, secure, and privacy-focused utilities for your daily workflow.",
    images: ["https://hilmost.net/og-home.png"],
  },
};

export default function Home() {
  return (
    <main className="flex-1 bg-canvas-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Hilmost Software Corporation",
          "alternateName": "HSC",
          "url": "https://hilmost.net",
          "logo": "https://hilmost.net/logo.png",
          "description": "A specialized software R&D unit building high-precision digital tools for finance, health, and data science.",
          "sameAs": ["https://github.com/KMunyede"],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "support@hilmost.net"
          }
        })}}
      />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-6 md:mb-8">
            <div className="text-center md:text-left mb-4 md:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs md:text-sm font-bold uppercase tracking-widest font-mono">
                  <Sparkles size={14} className="animate-pulse" />
                  HILMOST DIGITAL LABS
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <h1 className="font-black tracking-tighter text-text-primary text-3xl sm:text-4xl lg:text-5xl leading-[1] text-left">
                Engineering the <br />
                <span className="text-brand-primary">Everyday Utility.</span>
              </h1>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed font-medium text-left">
                A specialized software research and development unit building high-precision digital tools. We bridge the gap between complex enterprise logic and secure, browser-first solutions.
              </p>
            </div>
          </div>

          {/* Our Products Section */}
          <div className="max-w-6xl mx-auto mt-16 mb-20">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Our Products</h2>
                <div className="h-px flex-1 bg-base" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Hilmost Toolbox",
                  description: "30+ free browser tools",
                  href: "https://hilmost-toolbox.hilmost.net",
                  cta: "Open Toolbox"
                },
                {
                  name: "Hilmost Apparel",
                  description: "Wear your story",
                  href: "https://shop.hilmost.net",
                  cta: "Shop Now"
                },
                {
                  name: "Hilmost Apps",
                  description: "Daily Stoic, MindOS",
                  href: null,
                  cta: "Coming soon"
                }
              ].map((product) => {
                const CardContent = (
                  <>
                    <h3 className="text-2xl font-black text-text-primary tracking-tight mb-2">{product.name}</h3>
                    <p className="text-text-secondary font-medium leading-relaxed mb-8">{product.description}</p>
                    {product.href ? (
                      <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all">
                        {product.cta} <ArrowRight size={16} />
                      </span>
                    ) : (
                      <span className="inline-flex text-[10px] font-black uppercase tracking-widest text-text-muted bg-canvas-muted px-4 py-2 rounded-full">
                        {product.cta}
                      </span>
                    )}
                  </>
                );

                const cardClasses = "group flex flex-col bg-canvas-card border border-base rounded-[2rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand-primary/30 h-full text-left focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 outline-none";

                return product.href ? (
                  <Link key={product.name} href={product.href} className={cardClasses}>
                    {CardContent}
                  </Link>
                ) : (
                  <div key={product.name} className={cardClasses}>
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>


          {/* Core Tool Categories Teaser */}
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Free Digital Utilities</h2>
                <div className="h-px flex-1 bg-base" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Money & Tax",
                  description: "Professional calculators for currency, loans, and taxes.",
                  href: "https://hilmost-toolbox.hilmost.net/finance",
                  icon: <Banknote size={24} />,
                  color: "blue",
                  count: 12
                },
                {
                  name: "PDF Tools",
                  description: "Securely merge and manage PDF files in your browser.",
                  href: "https://hilmost-toolbox.hilmost.net/pdf-tools",
                  icon: <FileText size={24} />,
                  color: "red",
                  count: 4
                },
                {
                  name: "Developer Experience",
                  description: "JSON, Regex, and JWT utilities for engineers.",
                  href: "https://hilmost-toolbox.hilmost.net/dx",
                  icon: <Code2 size={24} />,
                  color: "slate",
                  count: 5
                }
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative flex flex-col bg-canvas-card border border-base rounded-3xl p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand-primary/30 overflow-hidden focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 outline-none"
                >
                  <div className="relative z-10">
                      <div className={`h-12 w-12 flex items-center justify-center rounded-xl bg-${cat.color}-500/10 text-${cat.color}-600 mb-6`}>
                          {cat.icon}
                      </div>
                      <h3 className="text-xl font-black text-text-primary tracking-tight mb-2">{cat.name}</h3>
                      <p className="text-sm text-text-secondary font-medium leading-relaxed mb-6">
                          {cat.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-canvas-muted px-3 py-1 rounded-full">
                          {cat.count} Tools
                        </span>
                      </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="https://hilmost-toolbox.hilmost.net"
                className="inline-flex items-center gap-3 px-8 py-4 bg-canvas-card border border-brand-primary/20 text-brand-primary font-black uppercase tracking-widest rounded-2xl hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-lg text-sm"
              >
                Explore All 30+ Tools <ArrowRight size={18} />
              </Link>
            </div>
          </div>


          {/* Core Web Vitals Banner */}
          <div className="mt-32 p-8 md:p-12 bg-text-primary dark:bg-canvas-card rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Code2 size={16} className="text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary font-mono">Architecture Status: Stable</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-canvas-card dark:text-text-primary tracking-tighter leading-tight mb-4">
                            Banking-grade <span className="text-brand-primary">Precision.</span>
                        </h2>
                        <p className="text-text-muted font-medium text-lg leading-relaxed">
                            Every Hilmost tool is engineered by architectural experts to ensure mathematical accuracy and 100% client-side data privacy.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <Link href="https://hilmost-toolbox.hilmost.net" className="px-8 py-4 bg-brand-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all text-sm">
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
