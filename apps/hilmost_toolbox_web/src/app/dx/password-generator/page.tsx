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

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-black tracking-tight uppercase text-slate-900 dark:text-white">Why use a password generator?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-primary uppercase tracking-wide">The Risk of Weak Passwords</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Most security breaches occur not through complex hacks, but through the exploitation of weak or reused passwords. When you use common words or personal information, automated brute-force tools can crack your credentials in seconds. By using a generator, you eliminate human patterns and create a unique, complex shield for every account, ensuring that a breach at one site doesn&apos;t compromise your entire digital identity.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-primary uppercase tracking-wide">True Cryptographic Randomness</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Not all &quot;random&quot; strings are created equal. Standard software functions often use pseudo-random algorithms that can be predicted by sophisticated attackers. Our laboratory utilizes the <strong>Web Crypto API</strong> (<code>crypto.getRandomValues</code>), which hooks into your device&apos;s hardware entropy. This ensures your passwords are mathematically unpredictable and meet the highest cryptographic standards required for banking and enterprise-grade security.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-primary uppercase tracking-wide">Best Practices for 2026</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                For maximum security, we recommend generating passwords of at least <strong>16 characters</strong> using a mix of all character types. Never reuse passwords across different platforms. Instead, use our generator in tandem with a trusted password manager. This allows you to maintain &quot;unbreakable&quot; credentials without the burden of memorization, keeping your financial, health, and personal data safe from the evolving landscape of cyber threats.
              </p>
            </div>
          </div>
        </section>

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
      </div>
    </div>
  );
}
