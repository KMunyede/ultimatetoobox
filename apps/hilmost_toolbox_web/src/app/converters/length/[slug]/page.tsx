import { Metadata } from "next";
import { notFound } from "next/navigation";
import { LengthPageUI } from "../LengthPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const LENGTH_UNITS = ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"];

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of LENGTH_UNITS) {
    for (const to of LENGTH_UNITS) {
      if (from !== to) {
        params.push({ slug: `${from}-to-${to}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);

  if (!match) return { title: "Length Converter" };

  const fromUnit = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const toUnit = match[2].charAt(0).toUpperCase() + match[2].slice(1);
  const canonical = getCanonicalUrl(`/converters/length/${slug}`);

  return {
    title: `Convert ${fromUnit} to ${toUnit} | Length Calculator — Free Online Converter`,
    description: `Free online length converter. Instantly convert ${fromUnit} to ${toUnit} using our free distance calculator. High precision for engineering, craft, and travel — no signup required.`,
    alternates: { canonical },
    openGraph: {
      title: `Convert ${fromUnit} to ${toUnit} | Length Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free length calculator.`,
      url: canonical,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: `Convert ${fromUnit} to ${toUnit}` }],
    },
    twitter: {
      title: `Convert ${fromUnit} to ${toUnit} | Length Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free length calculator.`,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default async function LengthDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return notFound();

  const fromUnitStr = match[1];
  const toUnitStr = match[2];

  if (!LENGTH_UNITS.includes(fromUnitStr) || !LENGTH_UNITS.includes(toUnitStr)) {
    return notFound();
  }

  const fromUnit = fromUnitStr.charAt(0).toUpperCase() + fromUnitStr.slice(1);
  const toUnit = toUnitStr.charAt(0).toUpperCase() + toUnitStr.slice(1);
  const displayTitle = `Convert ${fromUnit} to ${toUnit} | Length Calculator`;

  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Length", href: "/converters/length" },
    { label: `${fromUnit} to ${toUnit}`, href: `/converters/length/${slug}` },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/length/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <LengthPageUI 
      defaultUnit1={fromUnitStr}
      defaultUnit2={toUnitStr}
      title={displayTitle}
      description={`Instantly convert ${fromUnitStr} to ${toUnitStr} using our free distance calculator.`}
      canonicalUrl={getCanonicalUrl(`/converters/length/${slug}`)}
      lastUpdated={lastUpdated}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
