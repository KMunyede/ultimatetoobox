import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader, HowToSchema } from "@utilitiessite/ui";
import { Metadata } from "next";
import { RegexTesterClient } from "./RegexTesterClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Regex Tester & Debugger";
const TOOL_DESC = "Build and test regular expressions in real-time. Secure, browser-side regex tester with match highlighting and reference guide.";
const PATH = "/dx/regex-tester";
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
    question: "What is Regex?",
    answer: "Regex, or Regular Expression, is a sequence of characters that forms a search pattern. It is used for string matching and manipulation in programming.",
  },
  {
    question: "Is my data safe while testing regex?",
    answer: "Yes. All testing happens in your browser. Your input text and regex patterns are never sent to a server, ensuring 100% privacy.",
  },
  {
    question: "Do you support different regex flavors?",
    answer: "Currently, we use the standard JavaScript regex engine. Most patterns used in other languages like Python or PHP are compatible.",
  },
];

const howToSteps = [
  { name: "Enter Pattern", text: "Type your regular expression into the pattern field (e.g. [a-z]+)." },
  { name: "Set Flags", text: "Choose flags like 'g' (global), 'i' (ignore case), or 'm' (multiline) to change the matching behavior." },
  { name: "Input Test Text", text: "Paste the text you want to test your pattern against in the test area." },
  { name: "Analyze Matches", text: "Review the highlighted results and match statistics instantly." },
];

export default function RegexTesterPage() {
  const breadcrumbItems = [
    { label: "DX", href: "/dx" },
    { label: "Regex Tester", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/dx/regex-tester/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-regex-pattern', popover: { title: '1. Pattern', description: 'Enter your regular expression here. Don\'t forget the slashes are handled for you!' } },
    { element: '#tour-regex-test', popover: { title: '2. Test String', description: 'Paste the content you want to search through. We will highlight matches in real-time.' } },
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
        name={`How to Test Regular Expressions`}
        description="Follow these four simple steps to build and debug complex regex patterns using our real-time testing engine."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="Regex Logic Lab"
        subtitle="Unravel the complexity of patterns. Real-time matching, flag control, and instant debugging for developers and data analysts."
        lastUpdated={lastUpdated}
        tourId="regex_tester"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <RegexTesterClient />

      <ToolArticle title="The Developer's Rosetta Stone: Mastering Regex">
        <p>
          Regular Expressions (Regex) are one of the most powerful—and intimidating—tools in a developer&apos;s arsenal. From validating email addresses to scraping data from complex HTML, regex allows you to perform sophisticated string manipulation with just a few characters.
        </p>

        <h3>Why Real-Time Testing is Essential</h3>
        <p>
          Because regex is so dense, it is incredibly easy to make a small error that leads to catastrophic "catastrophic backtracking" or incorrect matches. Our <strong>Regex Tester</strong> provides an instant feedback loop. As you type your pattern, the tool highlights matches in your test string, allowing you to see exactly how your logic is being interpreted.
        </p>

        <h3>Understanding Flags (g, i, m)</h3>
        <p>
          Flags change the "behavior" of your search pattern. The <strong>global (g)</strong> flag ensures you find all matches rather than just the first one. The <strong>ignore case (i)</strong> flag makes your pattern case-insensitive. The <strong>multiline (m)</strong> flag changes how anchors like <code>^</code> and <code>$</code> behave. Our tool provides simple toggles for these flags so you can experiment without needing to remember the syntax.
        </p>

        <h3>Privacy-First Debugging</h3>
        <p>
          Developers often need to test patterns against sensitive production data or logs. Using standard online testers can be a security risk. At Hilmost Digital Labs, we use a <strong>browser-side architecture</strong>. Your regex patterns and test strings are never sent to a server, ensuring 100% privacy for your proprietary code and data.
        </p>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="text-data" currentPath={PATH} />
    </div>
  );
}
