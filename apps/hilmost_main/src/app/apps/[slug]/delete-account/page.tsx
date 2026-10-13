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
    title: `Delete Account & Data - ${app.name} | Hilmost`,
    description: `Instructions for deleting your account and data for ${app.name}.`,
    alternates: {
      canonical: `https://hilmost.net/apps/${app.slug}/delete-account`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function AppDeleteAccountPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-primary">
          Delete Account and Data
        </h1>
        <p className="text-text-secondary font-medium">
          {app.name} · Developed by {app.developer}
        </p>
      </div>

      <SectionList sections={app.deletion} />

      <AppLegalNav slug={app.slug} currentPage="delete-account" contactEmail={app.contactEmail} />
    </div>
  );
}
