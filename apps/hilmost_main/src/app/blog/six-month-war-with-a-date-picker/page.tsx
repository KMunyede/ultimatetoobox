import { Metadata } from "next";
import { AdLayout, ToolArticle } from "@utilitiessite/ui";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "The Six-Month War With a Date Picker | Hilmost Blog",
  description: "A honest dev-log on rebuilding Hilmost's date/time picker three times, a live production crash, and the decision to stop patching and start over.",
};

export default function BlogPost5() {
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
            The Six-Month War With a <span className="text-brand-primary">Date Picker</span>
          </h1>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead text-xl text-slate-600 dark:text-slate-400 mb-8 font-medium">
            There&apos;s a particular kind of tired that only comes from losing to something small.
          </p>

          <p>
            Not a hard problem. Not an ambitious feature. A date picker. The little widget you tap to choose a day, a time, an hour and a minute. The thing every website has, that nobody thinks about, that took me the better part of six months to actually get right.
          </p>

          <p>
            I want to write this down honestly, because the polished version of a &quot;we fixed it&quot; story always skips the part where you&apos;re staring at a stack trace at midnight wondering if you&apos;re just bad at this.
          </p>

          <h2>The First Version</h2>

          <p>
            The first date picker I shipped on Hilmost was a custom carousel — scrollable columns for month, day, year, hour, minute, second. It looked good. It felt good in a demo. Then real usage started finding the seams: edge cases around leap years, state that leaked between two fields that were supposed to be independent, small annoyances that added up into a genuinely bad experience.
          </p>

          <p>
            So I rebuilt it on top of a well-known library, react-datepicker. Mature, widely used, surely more solid ground than something I&apos;d built from scratch.
          </p>

          <p>It wasn&apos;t.</p>

          <h2>The Slow Bleed</h2>

          <p>
            What followed was a string of bugs that each felt small on their own and exhausting in sequence. A seconds field with a race condition. Two date fields — birth date and target date — that would occasionally bleed state into each other, so a change in one silently corrupted the other. Each one got found, diagnosed, patched. Each patch held for a while. Then the next one showed up.
          </p>

          <p>
            The one that actually hurt arrived in production. A live crash — <code>TypeError: e.includes is not a function</code> — triggered every time someone left the hours, minutes, or seconds field on the Age Calculator. Real users, hitting a real error, because a Date object was being handed to a function that expected a string. It was a five-line fix once I found it. Finding it took a while, and knowing it was already live and already breaking things for people was its own particular flavor of stomach-drop.
          </p>

          <p>
            I fixed it. I always fix it. But somewhere around that point I had to be honest with myself: this wasn&apos;t one bug. This was a pattern. Every fix bought a few weeks before the next one, and I was spending more energy defending a component than building the product.
          </p>

          <h2>The Decision</h2>

          <p>
            There&apos;s a rule I hold myself to now, one I didn&apos;t always have: if something survives multiple honest fix attempts and keeps failing anyway, stop patching it. Go find out how other people solved this exact problem, and be willing to throw out what you built to use what actually works.
          </p>

          <p>
            It&apos;s a small rule. It was hard to follow the first time, because it meant admitting that six months of incremental effort hadn&apos;t been the right six months.
          </p>

          <p>
            I explored the alternatives properly instead of grabbing the first one. Typed input boxes — too easy to mistype. Pure dropdowns — clean, but rigid. A dropdown-with-typeahead hybrid — interesting, but more complexity than the problem deserved. Native browser date/time inputs — appealing, until I found the seconds-precision support wasn&apos;t reliable everywhere I needed it.
          </p>

          <p>
            What I landed on was a plain, boring, six-dropdown component. Month, day, year, hours, minutes, seconds, each a select. Dynamic day counts. Leap-year handling built in properly this time. A 12/24-hour toggle. An optional &quot;jump to now&quot; button for the tools where that made sense.
          </p>

          <p>Nothing clever. Nothing impressive in a demo. It just works, every time, the same way, for everyone.</p>

          <h2>What It Actually Taught Me</h2>

          <p>
            I rolled it out tool by tool — Age Calculator first, then Sleep Cycle, then a mobile width fix, then Time Zone and Unix converters — verifying each one properly before moving to the next, instead of doing it all in one big risky sweep. Then I deleted the old component and its dependency entirely. Gone. No fallback, no &quot;just in case&quot; — because keeping it around is how you end up patching it again in six months out of habit.
          </p>

          <p>The tools work now. Nobody&apos;s hit that crash again. That&apos;s the whole, quiet, unglamorous payoff.</p>

          <p>
            What stayed with me wasn&apos;t the fix. It was the six months before it — the slow realization that clever isn&apos;t the same as solid, and that being willing to admit &quot;this isn&apos;t working, throw it out&quot; is a harder skill than writing the fix itself. Building alone, there&apos;s no one else to tell you when to stop patching and start over. You have to notice it yourself, and be honest enough to act on it.
          </p>

          <p>
            That&apos;s most of what building Hilmost actually is. Not the tools themselves — the tools are simple by design. It&apos;s building the judgment to know when simple is winning and when it&apos;s just hiding.
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
