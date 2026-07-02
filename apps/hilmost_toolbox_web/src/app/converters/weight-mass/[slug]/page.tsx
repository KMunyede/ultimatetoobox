import { Metadata } from "next";
import { notFound } from "next/navigation";
import { WeightMassPageUI } from "../WeightMassPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const WEIGHT_UNITS = ["kilograms", "grams", "milligrams", "metric tons", "pounds", "ounces", "stones"];

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of WEIGHT_UNITS) {
    for (const to of WEIGHT_UNITS) {
      if (from !== to) {
        params.push({ slug: `${from.replace(" ", "-")}-to-${to.replace(" ", "-")}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return { title: "Weight Converter" };

  const fromUnit = match[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const toUnit = match[2].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const canonical = getCanonicalUrl(`/converters/weight-mass/${slug}`);

  return {
    title: `Convert ${fromUnit} to ${toUnit} | Weight Calculator — Free Online Converter`,
    description: `Free online weight converter. Instantly convert ${fromUnit} to ${toUnit} using our free mass calculator. Precise for kitchen, laboratory, and shipping — no signup required.`,
    alternates: { canonical },
    openGraph: {
      title: `Convert ${fromUnit} to ${toUnit} | Weight Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free weight calculator.`,
      url: canonical,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: `Convert ${fromUnit} to ${toUnit}` }],
    },
    twitter: {
      title: `Convert ${fromUnit} to ${toUnit} | Weight Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free weight calculator.`,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default async function WeightDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return notFound();

  const fromUnitStr = match[1].replace("-", " ");
  const toUnitStr = match[2].replace("-", " ");

  if (!WEIGHT_UNITS.includes(fromUnitStr) || !WEIGHT_UNITS.includes(toUnitStr)) {
    return notFound();
  }

  const fromUnit = fromUnitStr.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const toUnit = toUnitStr.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const displayTitle = `Convert ${fromUnit} to ${toUnit} | Weight Calculator`;

  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Weight & Mass", href: "/converters/weight-mass" },
    { label: `${fromUnit} to ${toUnit}`, href: `/converters/weight-mass/${slug}` },
  ];

  const filePath = path.join(process.cwd(), "src/app/converters/weight-mass/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <WeightMassPageUI 
      defaultUnit1={fromUnitStr}
      defaultUnit2={toUnitStr}
      title={displayTitle}
      description={`Instantly convert ${fromUnitStr} to ${toUnitStr} using our free mass calculator.`}
      canonicalUrl={getCanonicalUrl(`/converters/weight-mass/${slug}`)}
      lastUpdated={lastUpdated}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
