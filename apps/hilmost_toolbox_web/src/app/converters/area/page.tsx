import { Metadata } from "next";
import { AreaPageUI } from "./AreaPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

import { formatTitle } from "@/lib/metadata";

const TITLE = "Area Converter — Square Feet, Meters, Acres & More";
const DESC = "Free, high-precision area converter. Instantly convert between square feet, square meters, acres, hectares, and more for real estate, farming, and construction.";
const PATH = "/converters/area";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Area Converter" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default function AreaPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/area/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <AreaPageUI lastUpdated={lastUpdated} canonicalUrl={CANONICAL_URL} />;
}
