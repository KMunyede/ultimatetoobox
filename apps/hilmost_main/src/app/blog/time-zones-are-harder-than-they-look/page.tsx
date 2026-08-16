import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Time Zones Are Harder Than They Look | Hilmost Blog",
  description: "Why we rebuilt our Time Zone Converter on boring, correct fundamentals instead of a fragile custom component — and what that taught us about invisible correctness.",
};

export default function BlogPostTimeZones() {
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
          <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">August 2026</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase mb-6 leading-tight">
            Time Zones Are <span className="text-brand-primary">Harder Than They Look</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            Time zones look simple until you actually have to compute with them. Most people assume every zone is offset from UTC by a whole number of hours. It isn&apos;t.
          </p>

          <h2>The Offsets Nobody Expects</h2>

          <p>
            India runs at UTC+5:30. Nepal runs at UTC+5:45. Some zones observe Daylight Saving Time and shift twice a year; others, like ours here in Harare (UTC+2, year-round, no DST), never move at all.
          </p>

          <p>
            A naive time zone converter treats every zone as a fixed offset and gets this wrong constantly — silently, which is worse than getting it wrong loudly. A meeting time that&apos;s off by 45 minutes because a converter assumed a round-hour offset doesn&apos;t throw an error. It just makes someone late, or makes someone miss a call, and they usually don&apos;t find out why until afterward.
          </p>

          <h2>Retiring What Didn&apos;t Hold</h2>

          <p>
            Building this properly meant treating each time zone as its own real, sometimes-irregular data source, not a simple math formula. It also meant retiring an earlier custom date/time component that kept failing in ways that were hard to predict — race conditions in the seconds field, state quietly leaking between fields that were supposed to be independent. After the third rebuild attempt didn&apos;t hold, we made the call to stop patching a clever-but-fragile component and replace it with something boring on purpose: six plain dropdowns for month, day, year, hours, minutes, seconds, with correct leap-year handling and a 12/24-hour toggle built in from the start.
          </p>

          <h2>Boring Was the Right Call</h2>

          <p>
            Boring, in this case, was the right call. A time zone converter&apos;s entire job is to be quietly, invisibly correct. Nobody notices a good one. Everyone notices a bad one, usually at the worst possible moment.
          </p>
        </div>

        <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
           <ToolArticle title="About the Author">
             <p>
               Written by Keepy Munyede, Technical Founder of Hilmost Software Corporation.
             </p>
           </ToolArticle>
        </section>
      </div>
    </AdLayout>
  );
}
