import { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta(
  "/contact",
  "Contact Us | Hilmost Software Corporation",
  "Get in touch with Hilmost Software Corporation. Contact our team for support, partnership inquiries, or feedback regarding the Hilmost Toolbox and our suite of digital applications."
);

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Contact Hilmost Software Corporation (Not yet Incorporated)
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Hilmost Software Corporation is a small software studio based in Harare, Zimbabwe. We build free web tools on{" "}
          <a href="https://hilmost-toolbox.hilmost.net" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Hilmost Toolbox
          </a>
          , and mobile apps and games such as{" "}
          <Link href="/apps/ultimate-tic-tac-toe" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Ultimate Tic Tac Toe
          </Link>{" "}
          and{" "}
          <Link href="/apps/ultimate-3d-checkers" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Ultimate 3D Checkers
          </Link>
          . A real person reads every message.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How to reach us</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Email{" "}
          <a href="mailto:support@hilmost.net" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            support@hilmost.net
          </a>
          . We aim to reply within 2 working days.
        </p>
        <div>
          <a
            href="mailto:support@hilmost.net"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            Email us
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What to include</h2>
        <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          <li>
            <strong className="text-slate-900 dark:text-white">Help with a tool or app:</strong> the page link or app name, your device, and what happened.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Bug reports:</strong> the steps to make it happen again, plus a screenshot if you can.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Partnerships and business enquiries:</strong> who you are and what you have in mind.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Feedback and ideas:</strong> tell us which tool you&apos;d like us to build next.
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your account and data</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          To remove an app account and its data, see{" "}
          <Link href="/delete-account" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Delete your account
          </Link>
          . To see how we handle data, read our{" "}
          <Link href="/privacy-policy" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/cookie-policy" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-of-service" className="text-emerald-800 dark:text-emerald-400 underline font-medium">
            Terms of Service
          </Link>
          .
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Where we are</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Harare, Zimbabwe. We work online only, so we can&apos;t take walk-in visits.
        </p>
      </div>
    </div>
  );
}
