import { Metadata } from "next";
import { AreaPageUI } from "./AreaPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Area Converter — Square Feet, Meters, Acres & More`,
    description: "Free, high-precision area converter. Instantly convert between square feet, square meters, acres, hectares, and more for real estate, farming, and construction.",
    alternates: {
      canonical: getCanonicalUrl("/converters/area"),
    },
  };
}

export default function AreaPage() {
  const filePath = path.join(process.cwd(), "src/app/converters/area/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <AreaPageUI lastUpdated={lastUpdated} />;
}
