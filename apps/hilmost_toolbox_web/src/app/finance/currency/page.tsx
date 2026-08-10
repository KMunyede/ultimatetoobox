import { Metadata } from "next";
import { CurrencyPageUI } from "./CurrencyPageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated, getFileLastUpdatedISO } from "@utilitiessite/config/server";
import path from "path";
import { formatTitle } from "@/lib/metadata";

const PATH = "/finance/currency";

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Currency Converter | Real-Time Exchange Rates");
  return {
    title,
    description: "Convert global currencies instantly with real-time exchange rates. Free, accurate converter for 50+ currencies with live market updates and precision.",
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      url: getCanonicalUrl(PATH),
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/finance.png", width: 1200, height: 630, alt: "Hilmost Currency Converter" }],
    },
    twitter: {
      title,
      images: ["https://hilmost-toolbox.hilmost.net/og/finance.png"],
    }
  };
}

export default function CurrencyPage() {
  const filePath = path.join(process.cwd(), "src/app/finance/currency/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);
  const dateModified = getFileLastUpdatedISO(filePath);

  return <CurrencyPageUI lastUpdated={lastUpdated} dateModified={dateModified} canonicalUrl={getCanonicalUrl(PATH)} />;
}
