import { Metadata } from "next";
import { CurrencyPageUI } from "./CurrencyPageUI";

export const metadata: Metadata = {
  title: "Live Currency Converter | Stop Overpaying Banks",
  description: "Free, real-time currency converter. Stop overpaying banks and instantly convert between global currencies using live foreign exchange market rates.",
  openGraph: {
    images: ["/og/finance.png"],
  },
};

export default function CurrencyPage() {
  return <CurrencyPageUI />;
}
