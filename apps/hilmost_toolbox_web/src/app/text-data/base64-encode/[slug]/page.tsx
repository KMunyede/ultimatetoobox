import { Metadata } from "next";
import { Base64PageUI } from "../Base64PageUI";

const SLUGS = [
  { slug: "base64-encode", type: "encode", title: "Base64 Text Encoder", desc: "Encode text strings into Base64 format securely and instantly within your browser." },
  { slug: "base64-decode", type: "decode", title: "Base64 Text Decoder", desc: "Decode Base64 strings back into human-readable text securely and instantly within your browser." }
] as const;

export function generateStaticParams() {
  return SLUGS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return { title: "Base64 Converter" };

  return {
    title: `${config.title} | Developer-Grade Tool`,
    description: `Free online ${config.title.toLowerCase()}. ${config.desc}`,
  };
}

export default async function Base64ProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const config = SLUGS.find(s => s.slug === resolvedParams.slug);
  if (!config) return <Base64PageUI />;

  return (
    <Base64PageUI 
      defaultMode={config.type as "encode" | "decode"}
      title={`${config.title} | Developer-Grade Tool`}
      description={config.desc}
      canonicalUrl={`https://hilmost-toolbox.hilmost.net/text-data/base64-encode/${resolvedParams.slug}`}
    />
  );
}
