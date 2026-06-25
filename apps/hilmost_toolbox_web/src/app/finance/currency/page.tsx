import { Metadata } from "next";
import { CurrencyPageUI } from "./CurrencyPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { formatTitle } from "@/lib/metadata";

const PATH = "/finance/currency";

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Currency Converter | Real-Time Exchange Rates");
  return {
    title,
    description: "Convert global currencies instantly with real-time exchange rates. Free, accurate, and bidirectional.",
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      images: ["/og/finance.png"],
    },
  };
}

export default function CurrencyPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/currency/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <CurrencyPageUI lastUpdated={lastUpdated} canonicalUrl={getCanonicalUrl(PATH)} />;
}
