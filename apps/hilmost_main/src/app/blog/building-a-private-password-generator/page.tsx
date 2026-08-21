import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Building an Actually Private Password Generator | Hilmost",
  description: "Why we built our Password Generator around crypto.getRandomValues() instead of Math.random(), and what zero-server architecture actually means in practice.",
};

export default function BlogPost3() {
  return (
    <AdLayout publisherId="ca-pub-5650522247882745">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-brand-primary transition-colors mb-8 uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-16">
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">July 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            Building an Actually <span className="text-brand-primary">Private Password Generator</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            In an era where personal data is often treated as a commodity, we believe the tools you use to secure your life should be above suspicion. When we sat down to build the Hilmost <Link href="https://hilmost-toolbox.hilmost.net/dx/password-generator">Password Generator</Link>, we made two non-negotiable decisions: no servers, and no weak math.
          </p>

          <h2>The Fallacy of Math.random()</h2>
          <p>
            Many developers reach for the standard <code>Math.random()</code> function in JavaScript when they need a random number. While convenient, it is fundamentally unsuitable for security. <code>Math.random()</code> is a pseudo-random number generator (PRNG) that is deterministic; if an attacker knows the seed and the algorithm, they can predict every character that will follow.
          </p>
          <p>
            To ensure your passwords are truly unbreakable, we utilize the <strong>Web Crypto API</strong> and its <code>crypto.getRandomValues()</code> method. This approach harvests hardware-level entropy from your device, creating high-entropy sequences that are mathematically unpredictable. If you want to dive deeper into the mathematics of bits and character pools, check out <Link href="https://hilmost-toolbox.hilmost.net/guides/password-entropy-and-crack-time-explained">our guide on password entropy</Link>.
          </p>

          <h2>What Zero-Server Architecture Really Means</h2>
          <p>
            The term &quot;Online Password Generator&quot; is usually a misnomer. For most sites, it means you send your data to their server, and they send a password back. This creates a massive trust gap. Who is logging those passwords? Are they being stored in a database for &quot;analytics&quot;?
          </p>
          <p>
            Our generator is built on a <strong>Zero-Server Architecture</strong>. The code is delivered to your browser, but the actual work of forging the password happens 100% locally in your device&apos;s memory. Your new credentials never travel across the internet. You can even disable your Wi-Fi after the page loads, and the tool will continue to function perfectly.
          </p>

          <h2>Security as a Right, Not a Feature</h2>
          <p>
            We didn&apos;t build this tool to collect emails or show you pop-up ads. We built it because we needed a trusted place to generate our own keys. By combining industrial-strength randomness with total local privacy, we&apos;ve created a laboratory where you can forge your digital armor with confidence.
          </p>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 not-prose">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Hilmost Network</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-brand-primary hover:underline font-medium">Hilmost Homepage</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net" className="text-brand-primary hover:underline font-medium">Hilmost Toolbox (Live Tools)</Link></li>
                  <li><Link href="https://hilmost-toolbox.hilmost.net/guides/password-entropy-and-crack-time-explained" className="text-brand-primary hover:underline font-medium">Guide: Password Entropy and Crack Time Explained</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">Latest Notes</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/blog/why-our-currency-converter-has-50-currencies" className="text-brand-primary hover:underline font-medium">Why Our Currency Converter Has 50 Currencies</Link></li>
                  <li><Link href="/blog/the-real-cost-of-a-bad-password" className="text-brand-primary hover:underline font-medium">The Real Cost of a Bad Password</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by the engineering team at Hilmost. We focus on building privacy-first utilities for the modern web.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
