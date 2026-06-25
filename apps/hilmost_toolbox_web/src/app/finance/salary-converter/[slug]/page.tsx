import { Metadata } from "next";
import { SalaryConverterPageUI } from "../SalaryConverterPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const SLUGS = [
  { slug: "hourly-to-salary", type: "hourly", title: "Hourly to Salary Converter", desc: "Convert your hourly wage to an annual salary instantly. See how much you make per year." },
  { slug: "salary-to-hourly", type: "annually", title: "Salary to Hourly Converter", desc: "Convert your annual salary to an hourly wage instantly. Find out exactly how much you make per hour." },
  { slug: "monthly-to-hourly", type: "monthly", title: "Monthly to Hourly Converter", desc: "Convert your monthly pay to an hourly wage instantly. Calculate your true hourly rate." },
  { slug: "weekly-to-salary", type: "weekly", title: "Weekly to Salary Converter", desc: "Convert your weekly pay to an annual salary instantly. Project your yearly earnings." },
  { slug: "daily-rate-calculator", type: "daily", title: "Daily Rate to Salary Calculator", desc: "Convert your daily freelance rate into an annual salary equivalent." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Salary Converter" };

  const canonical = getCanonicalUrl(`/finance/salary-converter/${resolvedParams.slug}`);

  return {
    title: `${config.title} — Free Online Calculator`,
    description: `Free online ${config.title.toLowerCase()}. ${config.desc} No signup required — secure, browser-based financial calculations.`,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.desc,
      url: canonical,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: config.title }],
    },
    twitter: {
      title: config.title,
      description: config.desc,
      images: ["https://hilmost-toolbox.hilmost.net/og/finance.png"],
    }
  };
}

export default async function SalaryProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return <SalaryConverterPageUI />;

  const filePath = path.join(process.cwd(), "src/app/finance/salary-converter/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <SalaryConverterPageUI 
      defaultPeriod={config.type as "hourly" | "daily" | "weekly" | "monthly" | "annually"}
      title={`${config.title}`}
      description={config.desc}
      canonicalUrl={getCanonicalUrl(`/finance/salary-converter/${resolvedParams.slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
