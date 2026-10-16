import { Metadata } from "next";
import { getAllApps } from "@/content/apps";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta("/delete-account", "Delete your Hilmost account and data | Hilmost", "Instructions for deleting your Hilmost account and associated game data across our apps."),
  alternates: { canonical: "https://hilmost.net/delete-account" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DeleteAccountPage() {
  const apps = getAllApps();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
        Delete your account: choose your game
      </h1>

      <p className="text-text-secondary leading-relaxed">
        Each Hilmost game has its own account and data deletion page.
      </p>

      <ul className="list-disc pl-5 space-y-2 text-text-secondary">
        {apps.map((app) => (
          <li key={app.slug}>
            <a
              href={`/apps/${app.slug}/delete-account`}
              className="text-emerald-800 underline font-semibold hover:underline"
            >
              {app.name}
            </a>
          </li>
        ))}
      </ul>

      <p className="text-text-secondary leading-relaxed pt-4">
        Questions:{" "}
        <a href="mailto:support@hilmost.net" className="text-emerald-800 underline">
          support@hilmost.net
        </a>
      </p>
    </div>
  );
}
