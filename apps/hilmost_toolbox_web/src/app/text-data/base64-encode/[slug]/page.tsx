import { Metadata } from "next";
import { Base64PageUI } from "../Base64PageUI";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";

const SLUGS = [
  { slug: "base64-encode", type: "encode", title: "Base64 Text Encoder", desc: "Encode text strings into Base64 format securely and instantly within your browser. Local processing for maximum privacy." },
  { slug: "base64-decode", type: "decode", title: "Base64 Text Decoder", desc: "Decode Base64 strings back into human-readable text securely and instantly within your browser. Fast, accurate, and secure." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Base64 Converter" };

  const canonical = getCanonicalUrl(`/text-data/base64-encode/${resolvedParams.slug}`);

  return {
    title: `${config.title} — Free Online Utility`,
    description: `Free online ${config.title.toLowerCase()}. ${config.desc} No signup required — secure, browser-based data transformation.`,
    alternates: { canonical },
    openGraph: {
      title: config.title,
      description: config.desc,
      url: canonical,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/text-data.png", width: 1200, height: 630, alt: config.title }],
    },
    twitter: {
      title: config.title,
      description: config.desc,
      images: ["https://hilmost-toolbox.hilmost.net/og/text-data.png"],
    }
  };
}

export default async function Base64ProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return <Base64PageUI />;

  const filePath = path.join(process.cwd(), "src/app/text-data/base64-encode/[slug]/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <Base64PageUI 
      defaultMode={config.type as "encode" | "decode"}
      title={`${config.title}`}
      description={config.desc}
      canonicalUrl={getCanonicalUrl(`/text-data/base64-encode/${resolvedParams.slug}`)}
      lastUpdated={lastUpdated}
    />
  );
}
