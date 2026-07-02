import { WebApplicationSchema, Breadcrumbs, ToolHeader, FAQAccordion, FAQSchema, ToolArticle } from "@utilitiessite/ui";
import { Metadata } from "next";
import { TextCaseConverterTool } from "./TextCaseConverterTool";
import { getFileLastUpdated } from "@utilitiessite/config/server";
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Text Case Converter";
const TOOL_DESC = "Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more. Free, instant, browser-side tool for developers and writers.";
const PATH = "/text-data/text-case-converter";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

const faqs = [
  {
    question: "What is camelCase used for?",
    answer: "camelCase is a naming convention commonly used in programming languages like JavaScript and Java for naming variables and functions. The first letter is lowercase, and each subsequent word starts with a capital letter."
  },
  {
    question: "What is snake_case used for?",
    answer: "snake_case uses underscores to separate words and is standard in languages like Python and for database column names. SCREAMING_SNAKE_CASE (all caps) is often used for global constants."
  },
  {
    question: "Does this tool store my text?",
    answer: "No. Hilmost Digital Labs follows a 'Zero-Server' architecture. All text transformations happen directly in your browser's memory. Your content is never sent to our servers or stored anywhere."
  },
  {
    question: "Can I convert large amounts of text?",
    answer: "Yes. The tool is optimized to handle large blocks of text efficiently using local browser processing. Performance depends on your device's memory, but typical documents are processed instantly."
  }
];

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
      images: [{ url: "https://hilmost-toolbox.hilmost.net/og/text-data.png", width: 1200, height: 630, alt: `Hilmost ${TOOL_NAME}` }],
    },
    twitter: {
      title,
      description: TOOL_DESC,
      images: ["https://hilmost-toolbox.hilmost.net/og/text-data.png"],
    }
  };
}

export default function TextCaseConverterPage() {
  const breadcrumbItems = [
    { label: "Text & Data", href: "/text-data" },
    { label: "Case Converter", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/text-data/text-case-converter/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#text-converter-input', popover: { title: '1. Input Text', description: 'Paste or type the text you want to transform here.' } },
    { element: '#text-converter-buttons', popover: { title: '2. Choose Case', description: 'Click any case type to instantly convert your text.' } },
    { element: '#text-converter-output', popover: { title: '3. Results', description: 'Your converted text appears here, ready to copy or download.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/text-data.png"
      />
      <FAQSchema items={faqs} />

      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Case Transformation Lab"
        subtitle="Switch between programming cases and writing formats with precision. 100% private browser-side processing."
        lastUpdated={lastUpdated}
        tourId="text_case_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <TextCaseConverterTool />

      <div className="max-w-4xl mx-auto my-16 space-y-16">
        <ToolArticle title="Advanced Text Transformation: A Deep Dive">
          <p>
            Text case conversion is more than just capitalization; it&apos;s about structural consistency. For developers, this is an essential part of the workflow when transforming variable names between different programming languages. For example, moving a JSON key from <code>camelCase</code> to <code>snake_case</code> is a common task that can be tedious to do manually.
          </p>

          <h3>Linguistic and Technical Accuracy</h3>
          <p>
            Our tool ensures that transformations like <strong>Title Case</strong> and <strong>Sentence case</strong> follow standard linguistic rules, while technical formats like <strong>PascalCase</strong> and <strong>SCREAMING_SNAKE_CASE</strong> adhere to strict naming conventions. This precision prevents errors in codebases and ensures professional polish in headlines and copy.
          </p>

          <h3>Custom Terms Override</h3>
          <p>
            A unique feature of our transformation lab is the <strong>Custom Terms Override</strong>. This allows you to define specific words (like &quot;iPhone&quot;, &quot;JavaScript&quot;, or &quot;HSC&quot;) that should always maintain their exact capitalization, regardless of the global transformation being applied. This is invaluable for maintaining brand integrity and technical correctness.
          </p>

          <h3>Zero-Server Security</h3>
          <p>
            At Hilmost Software Corporation, we prioritize your security. Following our monorepo-wide standards, this tool uses a <strong>Zero-Server Architecture</strong>. Your text remains entirely within your browser&apos;s memory during the conversion process, ensuring your private data never touches a server.
          </p>
        </ToolArticle>

        <FAQAccordion items={faqs} />
      </div>
    </div>
  );
}
