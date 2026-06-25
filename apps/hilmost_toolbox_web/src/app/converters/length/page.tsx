import { Metadata } from "next";
import { LengthPageUI } from "./LengthPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

import { formatTitle } from "@/lib/metadata";

const TITLE = "Length & Distance Converter — Metric to Imperial";
const DESC = "Free online length converter. Instantly convert between meters, kilometers, feet, inches, miles, and centimeters with high precision.";
const PATH = "/converters/length";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Length Converter" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default function LengthConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/length/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <LengthPageUI lastUpdated={lastUpdated} canonicalUrl={CANONICAL_URL} />;
}
