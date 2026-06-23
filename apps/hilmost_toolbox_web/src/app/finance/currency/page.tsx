import { Metadata } from "next";
import { CurrencyPageUI } from "./CurrencyPageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Currency Converter | Real-Time Exchange Rates | Hilmost`,
    description: "Convert global currencies instantly with real-time exchange rates.",
    alternates: {
      canonical: getCanonicalUrl("/finance/currency"),
    },
    openGraph: {
      images: ["/og/finance.png"],
    },
  };
}

export default function CurrencyPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/currency/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <CurrencyPageUI lastUpdated={lastUpdated} />;
}
