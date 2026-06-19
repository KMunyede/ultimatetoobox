import { Metadata } from "next";
import { LengthPageUI } from "../LengthPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

const UNITS = ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"];

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of UNITS) {
    for (const to of UNITS) {
      if (from !== to) {
        params.push({ slug: `${from}-to-${to}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const [from, to] = resolvedParams.slug.split("-to-");
  if (!from || !to || !UNITS.includes(from) || !UNITS.includes(to)) {
    return { title: "Length Converter" };
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return {
    title: `Convert ${capitalize(from)} to ${capitalize(to)} — Fast Online Calculator`,
    description: `Instantly convert ${from} to ${to}. Accurate, free online distance and length converter for ${from} to ${to} transformations.`,
    alternates: {
      canonical: getCanonicalUrl(`/converters/length/${resolvedParams.slug}`),
    },
  };
}

export default async function LengthProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const [from, to] = resolvedParams.slug.split("-to-");
  
  if (!from || !to || !UNITS.includes(from) || !UNITS.includes(to)) {
    // Fallback if somehow accessed directly with invalid slug
    return <LengthPageUI />;
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const filePath = path.join(process.cwd(), "src/app/converters/length/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <LengthPageUI 
      defaultUnit1={from}
      defaultUnit2={to}
      title={`${capitalize(from)} to ${capitalize(to)} Converter`}
      description={`Easily convert ${from} to ${to} using our fast, free calculator. Perfect for both metric and imperial measurements.`}
      canonicalUrl={getCanonicalUrl(`/converters/length/${resolvedParams.slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
