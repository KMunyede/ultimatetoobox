import { Metadata } from "next";
import { Base64PageUI } from "./Base64PageUI";
import { getCanonicalUrl } from "@utilitiessite/config";

const TOOL_NAME = "Base64 Text Encoder & Decoder";
const TOOL_TYPE = "Base64 Converter";
const TOOL_DESC = "Safely transform your text strings into URL-friendly ASCII format — no signup required.";
const PATH = "/text-data/base64-encode";

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

export default function Base64Page() {
  return <Base64PageUI />;
}
