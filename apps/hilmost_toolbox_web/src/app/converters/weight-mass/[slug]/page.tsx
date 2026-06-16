import { Metadata } from "next";
import { WeightMassPageUI } from "../WeightMassPageUI";

const UNITS = ["kilograms", "grams", "milligrams", "metric tons", "pounds", "ounces", "stones"];

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const from of UNITS) {
    for (const to of UNITS) {
      if (from !== to) {
        // Handle space in metric tons
        const slugFrom = from.replace(" ", "-");
        const slugTo = to.replace(" ", "-");
        params.push({ slug: `${slugFrom}-to-${slugTo}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const parts = resolvedParams.slug.split("-to-");
  if (parts.length !== 2) return { title: "Weight Converter" };

  const from = parts[0].replace("-", " ");
  const to = parts[1].replace("-", " ");
  
  if (!UNITS.includes(from) || !UNITS.includes(to)) {
    return { title: "Weight Converter" };
  }

  const capitalize = (s: string) => s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `Convert ${capitalize(from)} to ${capitalize(to)} | Free Calculator`,
    description: `Instantly convert ${from} to ${to}. Free online weight and mass converter.`,
  };
}

export default async function WeightProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const parts = resolvedParams.slug.split("-to-");
  if (parts.length !== 2) return <WeightMassPageUI />;

  const from = parts[0].replace("-", " ");
  const to = parts[1].replace("-", " ");
  
  if (!UNITS.includes(from) || !UNITS.includes(to)) {
    return <WeightMassPageUI />;
  }

  const capitalize = (s: string) => s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <WeightMassPageUI 
      defaultUnit1={from}
      defaultUnit2={to}
      title={`${capitalize(from)} to ${capitalize(to)} Converter`}
      description={`Easily convert ${from} to ${to} using our fast, free calculator.`}
      canonicalUrl={`https://hilmost-toolbox.hilmost.net/converters/weight-mass/${resolvedParams.slug}`}
    />
  );
}
