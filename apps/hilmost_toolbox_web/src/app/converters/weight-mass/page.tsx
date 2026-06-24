import { Metadata } from "next";
import { WeightMassPageUI } from "./WeightMassPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Weight & Mass Converter — Grams, Pounds, Kilograms`,
    description: "Convert between grams, kilograms, pounds, ounces, and metric tons instantly. Accurate weight and mass conversion for kitchen, lab, or shipping.",
    alternates: {
      canonical: getCanonicalUrl("/converters/weight-mass"),
    },
  };
}

export default function WeightConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/weight-mass/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <WeightMassPageUI lastUpdated={lastUpdated} />;
}
