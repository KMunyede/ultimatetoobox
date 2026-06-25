import { Metadata } from "next";
import { Base64PageUI } from "./Base64PageUI";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Base64 Text Encoder & Decoder";
const TOOL_TYPE = "Base64 Converter";
const TOOL_DESC = "Safely transform your text strings into URL-friendly ASCII format — no signup required.";
const PATH = "/text-data/base64-encode";

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
      url: PATH,
      type: "website",
      images: [{ url: "/og/main.png", width: 1200, height: 630 }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["/og/main.png"],
    }
  };
}

export default function Base64Page() {
  const filePath = path.join(process.cwd(), "src/app/text-data/base64-encode/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return <Base64PageUI lastUpdated={lastUpdated} />;
}
