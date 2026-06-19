import { Metadata } from "next";
import { TemperaturePageUI } from "./TemperaturePageUI";
import { getCanonicalUrl } from "@utilitiessite/config";

const TOOL_NAME = "Temperature Converter";
const TOOL_TYPE = "Temperature Converter";
const TOOL_DESC = "Convert seamlessly between Celsius, Fahrenheit, and Kelvin in real-time — no signup required.";
const PATH = "/converters/temperature";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${TOOL_NAME} — Free Online ${TOOL_TYPE} | Hilmost Toolbox`;
  const description = `Free online ${TOOL_NAME.toLowerCase()}. ${TOOL_DESC}`;
  const canonical = getCanonicalUrl(PATH);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
  };
}

export default function TemperatureConverterPage() {
  return <TemperaturePageUI />;
}
