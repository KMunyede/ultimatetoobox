import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllApps, getApp } from "@/content/apps";
import { AppLegalNav } from "@/components/apps/AppLegalNav";
import { StoreBadge } from "@/components/apps/StoreBadge";

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
    title: `${app.name} | Hilmost`,
    description: app.tagline,
    alternates: {
      canonical: `https://hilmost.net/apps/${app.slug}`,
    },
  };
}

export default async function AppAboutPage({ params }: PageProps) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              {app.name}
            </h1>
            <p className="text-lg text-text-secondary font-medium mt-1">{app.tagline}</p>
          </div>
          <StoreBadge status={app.status} storeUrl={app.storeUrl} />
        </div>
        {app.videoUrl && (
          <div>
            <a
              href={app.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-sm"
            >
              Watch gameplay video
            </a>
          </div>
        )}
        <p className="text-xs text-text-muted font-mono">Package ID: {app.packageId} · Developer: {app.developer}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Overview</h2>
        {app.summary.map((para, idx) => (
          <p key={idx} className="text-text-secondary leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-text-primary">Key Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          {app.features.map((feature, idx) => (
            <li key={idx} className="leading-relaxed">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {app.howToPlay && app.howToPlay.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">How to Play</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-secondary">
            {app.howToPlay.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {app.faq && app.faq.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {app.faq.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="font-semibold text-text-primary">{item.q}</h3>
                <p className="text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <AppLegalNav slug={app.slug} currentPage="about" contactEmail={app.contactEmail} />
    </div>
  );
}
