import { WebApplicationSchema, ToolArticle, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema } from "@utilitiessite/ui";
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

const faqs = [
  {
    question: "Is it safe to use an online password generator?",
    answer: "Yes, when generation happens client-side. This tool never transmits your password across the internet. You can verify this by checking the \"Network\" tab in your browser's Developer Tools; you will see zero traffic leaving your device when a password is forged."
  },
  {
    question: "How long should my password be?",
    answer: "We recommend a minimum of 16 characters for standard social or entertainment accounts. For critical services like your primary email, banking, or admin accounts, you should use 24 to 64 characters to ensure your credentials remain uncrackable for centuries."
  },
  {
    question: "Can I use the generated password immediately?",
    answer: "Absolutely. Once generated, you can copy the password directly into your application or password manager. We recommend securing it in a manager before closing this tab, as the forged password exists only in your browser's temporary memory."
  }
];

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
      <FAQSchema items={faqs} />

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

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Advanced Security Features">
          <p>
            Our Secure Password Laboratory offers advanced features designed for precision and usability. The <strong>&quot;Exclude Ambiguous Characters&quot;</strong> option removes confusing characters like <code>0</code> (zero) and <code>O</code> (uppercase o), preventing entry errors on sensitive logins.
          </p>

          <h3>Guaranteeing Complexity</h3>
          <p>
            Unlike basic generators that might randomly skip a character type even if selected, our <strong>&quot;Guarantee All Types&quot;</strong> logic ensures that at least one character from every enabled set (Uppercase, Lowercase, Numbers, Symbols) is present in your result. This guarantees that your password always meets the strict complexity requirements of modern enterprise systems.
          </p>

          <h3>Zero-Server Security</h3>
          <p>
            The most critical feature of our tool is what it <em>doesn&apos;t</em> do: it never sends your data to a server. Many online tools log generated passwords for telemetry or advertising. At Hilmost Digital Labs, we use a 100% browser-side architecture. Your secure keys are born and stay within your device&apos;s local memory, making this the safest place on the web to forge your digital armor.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
