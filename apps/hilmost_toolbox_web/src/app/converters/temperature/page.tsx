import { Metadata } from "next";
import { TemperaturePageUI } from "./TemperaturePageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Temperature Converter";
const TOOL_TYPE = "Temperature Converter";
const TOOL_DESC = "Convert seamlessly between Celsius, Fahrenheit, and Kelvin in real-time — no signup required.";
const PATH = "/converters/temperature";
const CANONICAL_URL = getCanonicalUrl(PATH);

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle(TOOL_NAME);
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: TOOL_DESC,
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/converters.png", width: 1200, height: 630, alt: "Hilmost Temperature Converter" }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/converters.png"],
    }
  };
}

export default function TemperatureConverterPage() {
  return <TemperaturePageUI />;
}
