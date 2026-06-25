import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPageUI } from "../AreaPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const AREA_UNITS = ["Square Meter", "Square Kilometer", "Square Centimeter", "Square Millimeter", "Hectare", "Acre", "Square Foot", "Square Inch", "Square Yard", "Square Mile"];

// Pre-generate popular routes at build time
export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  for (let i = 0; i < AREA_UNITS.length; i++) {
    for (let j = 0; j < AREA_UNITS.length; j++) {
      if (i !== j) {
        const fromSlug = AREA_UNITS[i].toLowerCase().replace(/ /g, "-");
        const toSlug = AREA_UNITS[j].toLowerCase().replace(/ /g, "-");
        // Limit to most popular ones to save build time, e.g. acres to hectares, sq feet to sq meters
        if (
          ["acre", "hectare", "square-foot", "square-meter"].includes(fromSlug) ||
          ["acre", "hectare", "square-foot", "square-meter"].includes(toSlug)
        ) {
          params.push({ slug: `${fromSlug}-to-${toSlug}` });
        }
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return { title: "Area Converter" };
  
  const fromUnit = match[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const toUnit = match[2].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const canonical = getCanonicalUrl(`/converters/area/${slug}`);

  return {
    title: `Convert ${fromUnit} to ${toUnit} | Area Calculator — Free Online Converter`,
    description: `Free online area converter. Instantly convert ${fromUnit} to ${toUnit} using our free area calculator. Perfect for real estate, landscaping, and construction — no signup required.`,
    alternates: { canonical },
    openGraph: {
      title: `Convert ${fromUnit} to ${toUnit} | Area Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free area calculator.`,
      url: canonical,
      images: ["/og/converters.png"],
    },
  };
}

export default async function AreaDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return notFound();

  const fromUnitStr = match[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const toUnitStr = match[2].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Validate units exist in our dictionary
  if (!AREA_UNITS.includes(fromUnitStr) || !AREA_UNITS.includes(toUnitStr)) {
    return notFound();
  }

  const filePath = path.join(process.cwd(), "src/app/converters/area/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <AreaPageUI 
      defaultFrom={fromUnitStr} 
      defaultTo={toUnitStr}
      title={`Convert ${fromUnitStr} to ${toUnitStr} | Area Calculator`}
      description={`Instantly convert ${fromUnitStr} to ${toUnitStr} using our free area calculator. Perfect for real estate, landscaping, and construction.`}
      canonicalUrl={getCanonicalUrl(`/converters/area/${slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
