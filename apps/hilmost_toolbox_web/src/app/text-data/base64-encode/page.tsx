import { Metadata } from "next";
import { Base64PageUI } from "./Base64PageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";

const TOOL_NAME = "Base64 Text Encoder & Decoder";
const TOOL_TYPE = "Base64 Converter";
const TOOL_DESC = "Safely transform your text strings into URL-friendly ASCII format — no signup required.";
const PATH = "/text-data/base64-encode";

export async function generateMetadata(): Promise<Metadata> {
  const title = `Base64 Encoder & Decoder | Online Developer Tool | Hilmost`;
  const description = `Safely encode and decode text strings to Base64 format instantly. Free online developer tool for URL-safe data transformation.`;
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

export default function Base64Page() {
  const filePath = path.join(process.cwd(), "src/app/text-data/base64-encode/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <Base64PageUI lastUpdated={lastUpdated} />;
}
