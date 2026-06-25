import { Metadata } from "next";
import { SalaryConverterPageUI } from "./SalaryConverterPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { formatTitle } from "@/lib/metadata";

const TITLE = "Salary Converter | Hourly to Annual Wage Tool";
const DESC = "Compare your wages instantly. Free online salary converter to translate hourly rates into daily, weekly, monthly, and annual earnings.";
const PATH = "/finance/salary-converter";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: "Hilmost Salary Converter" }],
    },
    twitter: {
      title,
      description: DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/finance.png"],
    }
  };
}

export default function SalaryConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/salary-converter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <SalaryConverterPageUI lastUpdated={lastUpdated} canonicalUrl={getCanonicalUrl(PATH)} />;
}
