import { WebApplicationSchema, ToolArticle, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, RelatedTools } from "@utilitiessite/ui";
import { Metadata } from "next";
import { RandomGeneratorTool } from "./RandomGeneratorTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Random Name & Number Generator";
const TOOL_DESC = "Generate secure random numbers or random names instantly. Customize ranges, quantities, and categories. 100% browser-side generation.";
const PATH = "/text-data/random-name-number-generator";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

const faqs = [
  {
    question: "Is this random generator truly random?",
    answer: "Yes. For number generation, we use the Web Crypto API's `crypto.getRandomValues()`, which provides cryptographically secure random values. This is significantly more secure than standard generators that use `Math.random()`."
  },
  {
    question: "Are the names generated saved anywhere?",
    answer: "No. Like all Hilmost tools, the generation happens entirely within your browser. Your selections and the resulting names or numbers never leave your device."
  },
  {
    question: "Can I generate names for a specific gender?",
    answer: "Yes, our Random Name generator includes filters for gender-neutral, male, and female names across various categories like First Names and Full Names."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const title = formatTitle("Random Name & Number Generator – Free Secure Tool");
  return {
    metadataBase: new URL(METADATA_BASE_URL),
    title,
    description: "Generate secure random numbers or names. Choose ranges, categories, and quantities. Free online tool.",
    alternates: {
      canonical: PATH,
    },
    openGraph: {
      title,
      description: TOOL_DESC,
      url: CANONICAL_URL,
      type: "website",
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/text-data.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/text-data.png"],
    }
  };
}

export default function RandomGeneratorPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Random Generator", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/random-name-number-generator/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-mode-toggle', popover: { title: '1. Choose Mode', description: 'Switch between generating Random Numbers or Random Names.' } },
    { element: '#tour-generator-output', popover: { title: '2. Results', description: 'Your secure results appear here instantly. Use the copy button to save them.' } },
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
        title="Random Name & Number Generator"
        subtitle="Generate secure, unbiased results for any scenario. Cryptographically secure numbers and curated name lists, processed 100% in your browser."
        lastUpdated={lastUpdated}
        tourId="random_generator"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <RandomGeneratorTool />

      <div className="max-w-4xl mx-auto my-6 space-y-6">
        <ToolArticle title="Why Browser-Side Randomness Matters">
          <p>
            Most online random generators rely on server-side logic, which can be logged or manipulated. At Hilmost, we believe that true randomness should be private. By using the <strong>Web Crypto API</strong>, our tool ensures that your results are generated locally using high-entropy entropy sources from your own device.
          </p>

          <h2>Random Number Precision</h2>
          <p>
            Whether you need a simple dice roll or a complex decimal range for scientific sampling, our generator provides granular control. You can specify minimum and maximum values, the number of results, and whether to allow duplicates. The <strong>&quot;Expose Decimals&quot;</strong> feature allows for high-precision floating-point generation, essential for statistical modeling.
          </p>

          <h3>Curated Name Categories</h3>
          <p>
            Need a name for a new character, a teammate, or a project? Our Random Name mode features thousands of curated entries across categories like <strong>First Names</strong>, <strong>Full Names</strong>, and <strong>Usernames</strong>. With gender filters and bulk generation, you can quickly find the perfect fit for your needs.
          </p>

          <h3>Zero-Data Exposure</h3>
          <p>
            Privacy isn&apos;t just a feature; it&apos;s our foundation. This tool does not track your IP address or save the names and numbers you generate. Once you refresh the page or close the tab, the results are wiped from your browser&apos;s memory. No databases, no logs, just pure utility.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
        <RelatedTools category="text-data" currentPath={PATH} />
      </div>
    </div>
  );
}
