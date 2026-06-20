import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemperaturePageUI } from "../TemperaturePageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

const TEMP_UNITS = ["celsius", "fahrenheit", "kelvin"];

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of TEMP_UNITS) {
    for (const to of TEMP_UNITS) {
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
  
  if (!match) return { title: "Temperature Converter" };

  const fromUnit = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const toUnit = match[2].charAt(0).toUpperCase() + match[2].slice(1);
  const canonical = getCanonicalUrl(`/converters/temperature/${slug}`);

  return {
    title: `Convert ${fromUnit} to ${toUnit} | Temperature Calculator — Free Online Converter | Hilmost Toolbox`,
    description: `Free online temperature converter. Instantly convert ${fromUnit} to ${toUnit} using our free thermal calculator. Accurate for science, cooking, and weather — no signup required.`,
    alternates: { canonical },
    openGraph: {
      title: `Convert ${fromUnit} to ${toUnit} | Temperature Calculator`,
      description: `Instantly convert ${fromUnit} to ${toUnit} using our free temperature calculator.`,
      url: canonical,
      images: ["/og/converters.png"],
    },
  };
}

export default async function TemperatureDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const match = slug.match(/^([a-z-]+)-to-([a-z-]+)$/);
  
  if (!match) return notFound();

  const fromUnitStr = match[1];
  const toUnitStr = match[2];

  if (!TEMP_UNITS.includes(fromUnitStr) || !TEMP_UNITS.includes(toUnitStr)) {
    return notFound();
  }

  const filePath = path.join(process.cwd(), "src/app/converters/temperature/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <TemperaturePageUI 
      defaultUnit1={fromUnitStr}
      defaultUnit2={toUnitStr}
      title={`Convert ${fromUnitStr.charAt(0).toUpperCase() + fromUnitStr.slice(1)} to ${toUnitStr.charAt(0).toUpperCase() + toUnitStr.slice(1)} | Temperature Calculator`}
      description={`Instantly convert ${fromUnitStr} to ${toUnitStr} using our free thermal calculator.`}
      canonicalUrl={getCanonicalUrl(`/converters/temperature/${slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
