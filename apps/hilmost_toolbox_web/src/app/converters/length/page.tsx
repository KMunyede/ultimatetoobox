import { Metadata } from "next";
import { LengthPageUI } from "./LengthPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Length & Distance Converter — Metric to Imperial | Hilmost Toolbox",
    description: "Free online length converter. Instantly convert between meters, kilometers, feet, inches, miles, and centimeters with high precision.",
    alternates: {
      canonical: getCanonicalUrl("/converters/length"),
    },
  };
}

export default function LengthConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/length/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <LengthPageUI lastUpdated={lastUpdated} />;
}
