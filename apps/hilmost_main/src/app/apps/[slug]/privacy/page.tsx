import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllApps, getApp } from "@/content/apps";
import { AppLegalNav } from "@/components/apps/AppLegalNav";
import { SectionList } from "@/components/apps/SectionList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const apps = getAllApps();
  return apps.map((app) => ({ slug: app.slug }));
}

import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    ...pageMeta(`/apps/${app.slug}/privacy`, `Privacy Policy - ${app.name} | Hilmost`, `Privacy policy and data handling practices for ${app.name}.`),
    alternates: {
      canonical: `https://hilmost.net/apps/${app.slug}/privacy`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function AppPrivacyPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
          Privacy Policy
        </h1>
        <p className="text-text-secondary font-medium">
          {app.name} · Developed by {app.developer}
        </p>
        <p className="text-xs text-text-muted font-mono">
          Effective date: {app.effectiveDate}
        </p>
      </div>

      <SectionList sections={app.privacy} />

      <AppLegalNav slug={app.slug} currentPage="privacy" contactEmail={app.contactEmail} />
    </div>
  );
}
