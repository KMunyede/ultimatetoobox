import { Metadata } from "next";
import { SalaryConverterPageUI } from "./SalaryConverterPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { formatTitle } from "@/lib/metadata";

const PATH = "/finance/salary-converter";

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Salary Converter | Hourly to Annual Wage Tool");
  return {
    title,
    description: "Compare your wages instantly. Free online salary converter to translate hourly rates into daily, weekly, monthly, and annual earnings.",
    alternates: {
      canonical: PATH,
    },
  };
}

export default function SalaryConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/salary-converter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <SalaryConverterPageUI lastUpdated={lastUpdated} canonicalUrl={getCanonicalUrl(PATH)} />;
}
