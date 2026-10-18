import Link from "next/link";
import { Metadata } from "next";
import { getAllApps } from "@/content/apps";
import {
  getInDevelopmentGames,
  getInDevelopmentApps,
} from "@/content/apps/in-development";
import { StoreBadge } from "@/components/apps/StoreBadge";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta(
    "/apps",
    "Games & Apps | Hilmost",
    "Free games and apps from Hilmost Software Corporation: Ultimate 3D Checkers, Ultimate TicTacToe and more in development, each with its own privacy, terms and delete-account pages."
  ),
  alternates: {
    canonical: "https://hilmost.net/apps",
  },
};

export default function AppsHubPage() {
  const apps = getAllApps();
  const devGames = getInDevelopmentGames().join(" · ");
  const devApps = getInDevelopmentApps().join(" · ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Games & Apps
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Games and apps from Hilmost Software Corporation, a small software studio based in Harare, Zimbabwe. We build puzzle and strategy games that take classic ideas somewhere new, plus everyday apps that do one job well.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">How we build</h2>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
          <li>
            <strong className="text-text-primary">Free to play:</strong> our games and apps are free, supported by small, non-intrusive ads.
          </li>
          <li>
            <strong className="text-text-primary">Android first:</strong> new titles launch on Google Play first.
          </li>
          <li>
            <strong className="text-text-primary">Your data, your choice:</strong> every app has its own privacy policy, terms and a delete-account page, so you can see what&apos;s stored and remove it at any time.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">Available now on the web</h2>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary leading-relaxed">
          <li>
            <strong className="text-text-primary">Daily Wisdom:</strong> a daily quote, private journal and reflection library, free in your browser on Hilmost Toolbox.{" "}
            <a
              href="https://hilmost-toolbox.hilmost.net/health/daily-wisdom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 dark:text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Open Daily Wisdom &rarr;
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => (
          <div
            key={app.slug}
            className="flex flex-col justify-between bg-canvas-card border border-base rounded-3xl p-6 md:p-8 shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-text-primary">
                  <Link href={`/apps/${app.slug}`} className="hover:underline">
                    {app.name}
                  </Link>
                </h2>
                <StoreBadge status={app.status} storeUrl={app.storeUrl} />
              </div>
              <p className="text-text-secondary font-medium">{app.tagline}</p>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                {app.summary[0]}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-base flex items-center justify-between">
              <Link
                href={`/apps/${app.slug}`}
                className="text-sm font-bold text-text-primary hover:text-brand-primary transition-colors inline-flex items-center gap-1"
              >
                Learn more &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">In development</h2>
        <div className="space-y-2 text-text-secondary">
          <p>
            <strong className="text-text-primary">Games:</strong> {devGames}
          </p>
          <p>
            <strong className="text-text-primary">Apps:</strong> {devApps}
          </p>
        </div>
        <p className="text-text-secondary leading-relaxed">
          Each title gets its own page here when it&apos;s ready to play.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">Questions or ideas?</h2>
        <p className="text-text-secondary leading-relaxed">
          Email{" "}
          <a
            href="mailto:support@hilmost.net"
            className="text-emerald-800 dark:text-emerald-400 font-semibold hover:underline"
          >
            support@hilmost.net
          </a>
          , or see the{" "}
          <Link
            href="/contact"
            className="text-emerald-800 dark:text-emerald-400 font-semibold hover:underline"
          >
            Contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
