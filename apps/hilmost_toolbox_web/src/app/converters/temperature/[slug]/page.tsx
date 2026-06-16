import { Metadata } from "next";
import { TemperaturePageUI } from "../TemperaturePageUI";

const UNITS = ["celsius", "fahrenheit", "kelvin"];

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
  const parts = resolvedParams.slug.split("-to-");
  if (parts.length !== 2) return { title: "Temperature Converter" };

  const from = parts[0];
  const to = parts[1];
  
  if (!UNITS.includes(from) || !UNITS.includes(to)) {
    return { title: "Temperature Converter" };
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return {
    title: `Convert ${capitalize(from)} to ${capitalize(to)} | Free Calculator`,
    description: `Instantly convert ${capitalize(from)} to ${capitalize(to)}. Free online temperature converter.`,
  };
}

export default async function TemperatureProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const parts = resolvedParams.slug.split("-to-");
  if (parts.length !== 2) return <TemperaturePageUI />;

  const from = parts[0];
  const to = parts[1];
  
  if (!UNITS.includes(from) || !UNITS.includes(to)) {
    return <TemperaturePageUI />;
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <TemperaturePageUI 
      defaultUnit1={from}
      defaultUnit2={to}
      title={`${capitalize(from)} to ${capitalize(to)} Converter`}
      description={`Easily convert ${capitalize(from)} to ${capitalize(to)} using our fast, free calculator.`}
      canonicalUrl={`https://hilmost-toolbox.hilmost.net/converters/temperature/${resolvedParams.slug}`}
    />
  );
}
