import { Metadata } from "next";
import { WeightMassPageUI } from "./WeightMassPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

import { formatTitle } from "@/lib/metadata";

const TITLE = "Weight & Mass Converter — Grams, Pounds, Kilograms";
const DESC = "Convert between grams, kilograms, pounds, ounces, and metric tons instantly. Accurate weight and mass conversion for kitchen, lab, or shipping.";
const PATH = "/converters/weight-mass";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TITLE);
  return {
    title,
    description: DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Weight & Mass Converter" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default function WeightConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/weight-mass/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <WeightMassPageUI lastUpdated={lastUpdated} canonicalUrl={CANONICAL_URL} />;
}
