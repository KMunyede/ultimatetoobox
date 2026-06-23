import { Metadata } from "next";
import { SalaryConverterPageUI } from "./SalaryConverterPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Salary Converter | Hourly to Annual Wage Tool | Hilmost`,
    description: "Compare your wages instantly. Free online salary converter to translate hourly rates into daily, weekly, monthly, and annual earnings.",
    alternates: {
      canonical: getCanonicalUrl("/finance/salary-converter"),
    },
  };
}

export default function SalaryConverterPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/salary-converter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <SalaryConverterPageUI lastUpdated={lastUpdated} />;
}
