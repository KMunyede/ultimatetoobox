import Link from "next/link";
import { Metadata } from "next";
import { getAllApps } from "@/content/apps";
import { StoreBadge } from "@/components/apps/StoreBadge";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta("/apps", "Games & Apps | Hilmost", "Explore immersive mobile games and applications built by Hilmost Software Corporation."),
  alternates: {
    canonical: "https://hilmost.net/apps",
  },
};

export default function AppsHubPage() {
  const apps = getAllApps();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
          Games & Apps
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed">
          Discover our standalone games and mobile applications designed for high performance, privacy, and delightful user experiences.
        </p>
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
              <span className="text-xs text-text-muted font-mono">{app.packageId}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
