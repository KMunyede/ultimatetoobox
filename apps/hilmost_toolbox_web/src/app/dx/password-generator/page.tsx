import { WebApplicationSchema, ToolArticle, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { PasswordGeneratorTool } from "./PasswordGeneratorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Strong Password Generator";
const TOOL_DESC = "Generate secure random passwords instantly. Customize length and character sets. Banking-grade security with 100% browser-side generation.";
const PATH = "/dx/password-generator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Password Generator – Free Strong Password Tool");
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: "Generate secure random passwords. Choose length, uppercase, lowercase, numbers, symbols. Free online tool.",
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/dx.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/dx.png"],
    }
  };
}

export default function PasswordGeneratorPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "Password Generator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/password-generator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-password-output', popover: { title: '1. Secure Output', description: 'Your cryptographically secure password appears here instantly.' } },
    { element: '#tour-password-options', popover: { title: '2. Custom Rules', description: 'Adjust length and character sets to meet your specific security requirements.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/main.png"
      />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Secure Password Laboratory"
        subtitle="Forge unbreakable passwords with cryptographic precision. 100% private, browser-side generation with zero data exposure."
        lastUpdated={lastUpdated}
        tourId="password_generator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <PasswordGeneratorTool />

      <ToolArticle title="The Anatomy of a Strong Password">
        <p>
          In an era of sophisticated brute-force attacks and credential stuffing, a strong password is your first line of defense. But what exactly makes a password secure? At Hilmost Digital Labs, we follow industry standards to help you create credentials that are mathematically difficult to crack.
        </p>

        <h3>Entropy: The Secret to Security</h3>
        <p>
          Entropy is a measure of randomness. The more characters and the wider the variety of character sets (uppercase, lowercase, numbers, and symbols) you use, the higher the entropy. For instance, a 16-character password using all four sets has significantly more combinations than an 8-character one, making it exponentially harder for attackers to guess.
        </p>

        <h3>Cryptographically Secure Randomness</h3>
        <p>
          Most online generators use <code>Math.random()</code>, which is not truly random and can be predicted. Our tool utilizes the <strong>Web Crypto API</strong> (<code>crypto.getRandomValues</code>), which provides hardware-based, cryptographically secure random numbers. This ensures that every password generated is unique and unpredictable.
        </p>

        <h3>Why Browser-Side Generation Matters</h3>
        <p>
          Your security is our priority. Most password generators send your generated password over the internet to a server. Even with HTTPS, this creates a point of failure. Our <strong>Zero-Server Architecture</strong> ensures the generation happens entirely within your browser&apos;s memory. Your password never touches our servers, never enters a log file, and is never visible to anyone but you.
        </p>
      </ToolArticle>
    </div>
  );
}
