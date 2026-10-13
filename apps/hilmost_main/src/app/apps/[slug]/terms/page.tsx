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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `Terms of Service - ${app.name} | Hilmost`,
    description: `Terms of service and usage conditions for ${app.name}.`,
    alternates: {
      canonical: `https://hilmost.net/apps/${app.slug}/terms`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function AppTermsPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
          Terms of Service
        </h1>
        <p className="text-text-secondary font-medium">
          {app.name} · Developed by {app.developer}
        </p>
        <p className="text-xs text-text-muted font-mono">
          Effective date: {app.effectiveDate}
        </p>
      </div>

      <SectionList sections={app.terms} />

      <AppLegalNav slug={app.slug} currentPage="terms" contactEmail={app.contactEmail} />
    </div>
  );
}
