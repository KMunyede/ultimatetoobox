import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, HowToSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { JWTDecoderClient } from "./JWTDecoderClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "JWT Decoder & Inspector";
const TOOL_DESC = "Decode JSON Web Tokens (JWT) safely. Secure, browser-side JWT decoder to inspect headers, payloads, and signatures with 100% privacy.";
const PATH = "/dx/jwt-decoder";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

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

const faqs = [
  {
    question: "Is it safe to decode my JWT tokens here?",
    answer: "Yes. Our decoder works 100% client-side in your browser. Your token is never sent to our servers, making it significantly safer than other online decoders that might log your tokens.",
  },
  {
    question: "Can this tool verify the JWT signature?",
    answer: "This tool is a decoder and inspector. It shows you the contents of the header and payload. It does not verify the signature as that typically requires a private secret or public key which should remain on your backend.",
  },
  {
    question: "What is a JWT?",
    answer: "A JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.",
  },
];

const howToSteps = [
  { name: "Paste Token", text: "Paste your encoded JSON Web Token (JWT) into the input field." },
  { name: "Inspect Header", text: "Review the decoded header to see the algorithm (alg) and token type (typ)." },
  { name: "Analyze Payload", text: "Examine the claims in the payload, such as 'sub' (subject), 'iat' (issued at), and 'exp' (expiration)." },
  { name: "Verify Timestamps", text: "Check the human-readable versions of any Unix timestamps found in the token." },
];

export default function JWTDecoderPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "JWT Decoder", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/jwt-decoder/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-jwt-input', popover: { title: '1. Input Token', description: 'Paste your JWT here. We will instantly split it into Header, Payload, and Signature.' } },
    { element: '#tour-jwt-payload', popover: { title: '2. Payload Data', description: 'View the claims inside your token in a clean, formatted JSON view.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Decode JSON Web Tokens`}
        description="Follow these four simple steps to securely inspect the contents of your JWT tokens using our private decoding engine."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="JWT Security Inspector"
        subtitle="Peek inside the token. Securely decode headers and payloads instantly with banking-grade privacy and real-time visualization."
        lastUpdated={lastUpdated}
        tourId="jwt_decoder"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <JWTDecoderClient />

      <ToolArticle title="Security First: Why You Need a Private JWT Decoder">
        <p>
          JSON Web Tokens (JWT) are the backbone of modern web authentication. They carry sensitive information about users, their roles, and their permissions. When you are debugging an authentication flow, the ability to &quot;see inside&quot; a token is invaluable.
        </p>

        <h3>The Anatomy of a Token</h3>
        <p>
          Every JWT consists of three parts separated by dots (<code>.</code>):
        </p>
        <ul className="space-y-2 my-6">
          <li><strong className="text-red-500">Header:</strong> Contains metadata about the token, such as the signing algorithm.</li>
          <li><strong className="text-purple-500">Payload:</strong> Contains the actual &quot;claims&quot; or data about the user and the session.</li>
          <li><strong className="text-blue-500">Signature:</strong> Ensures the token hasn&apos;t been altered (used by your server for verification).</li>
        </ul>

        <h3>The Risk of Public Decoders</h3>
        <p>
          Many popular JWT decoders are &quot;cloud-based,&quot; meaning they transmit your token to their servers to be decoded. If your token represents a live session, anyone with access to those server logs could potentially hijack your user&apos;s account. This is a critical security vulnerability. At Hilmost Digital Labs, our <strong>JWT Inspector</strong> runs 100% locally in your browser. Your tokens never leave your device.
        </p>

        <h3>Human-Readable Time Tracking</h3>
        <p>
          One of the biggest pain points in JWT debugging is understanding expiration (<code>exp</code>) and issued-at (<code>iat</code>) times, which are stored as Unix timestamps. Our tool automatically detects these fields and provides a human-readable date next to them, saving you from manual time conversion.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}
