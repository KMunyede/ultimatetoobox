import { Metadata } from "next";
import { CurrencyPageUI } from "../CurrencyPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
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
  const match = resolvedParams.slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
  
  if (!match) return { title: "Currency Converter" };
  
  const from = match[1].toUpperCase();
  const to = match[2].toUpperCase();

  return {
    title: `${from} to ${to} Exchange Rate — Live Converter | Hilmost Toolbox`,
    description: `Convert ${from} to ${to} instantly. Get real-time mid-market exchange rates and accurate ${from}/${to} foreign exchange values.`,
    alternates: {
      canonical: getCanonicalUrl(`/finance/currency/${resolvedParams.slug}`),
    },
  };
}

export default async function CurrencyProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const match = resolvedParams.slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
  
  if (!match) return <CurrencyPageUI />;

  const from = match[1].toUpperCase();
  const to = match[2].toUpperCase();

  const filePath = path.join(process.cwd(), "src/app/finance/currency/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <CurrencyPageUI 
      defaultFrom={from}
      defaultTo={to}
      title={`${from} to ${to} | Live Currency Converter`}
      description={`Convert ${from} to ${to} instantly using live mid-market exchange rates.`}
      canonicalUrl={getCanonicalUrl(`/finance/currency/${resolvedParams.slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
