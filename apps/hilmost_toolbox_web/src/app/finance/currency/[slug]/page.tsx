import { Metadata } from "next";
import { CurrencyPageUI } from "../CurrencyPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "ZAR", "NZD"];

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from !== to) {
        params.push({ slug: `${from.toLowerCase()}-to-${to.toLowerCase()}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
  
  if (!match) return { title: "Currency Converter" };
  
  const from = match[1].toUpperCase();
  const to = match[2].toUpperCase();
  const canonical = getCanonicalUrl(`/finance/currency/${slug}`);

  return {
    title: `Convert ${from} to ${to} | Live Exchange Rate — Free Online Converter`,
    description: `Free online currency converter. Instantly convert ${from} to ${to} using live mid-market exchange rates. Perfect for travelers, freelancers, and global businesses — no signup required.`,
    alternates: { canonical },
    openGraph: {
      title: `Convert ${from} to ${to} | Live Exchange Rate`,
      description: `Instantly convert ${from} to ${to} using live mid-market exchange rates.`,
      url: canonical,
      images: ["/og/finance.png"],
    },
  };
}

export default async function CurrencyProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
  
  if (!match) return <CurrencyPageUI />;

  const from = match[1].toUpperCase();
  const to = match[2].toUpperCase();

  const filePath = path.join(process.cwd(), "src/app/finance/currency/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <CurrencyPageUI 
      defaultFrom={from}
      defaultTo={to}
      title={`Convert ${from} to ${to} | Live Exchange Rate`}
      description={`Instantly convert ${from} to ${to} using live mid-market exchange rates. Perfect for travelers, freelancers, and global businesses.`}
      canonicalUrl={getCanonicalUrl(`/finance/currency/${slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
