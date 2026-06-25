import { Metadata } from "next";
import { Base64PageUI } from "./Base64PageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Base64 Text Encoder & Decoder";
const TOOL_TYPE = "Base64 Converter";
const TOOL_DESC = "Safely transform your text strings into URL-friendly ASCII format — no signup required.";
const PATH = "/text-data/base64-encode";
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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/text-data.png", width: 1200, height: 630, alt: "Hilmost Base64 Encoder" }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/text-data.png"],
    }
  };
}

export default function Base64Page() {
  const filePath = path.join(process.cwd(), "src/app/text-data/base64-encode/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <Base64PageUI lastUpdated={lastUpdated} />;
}
