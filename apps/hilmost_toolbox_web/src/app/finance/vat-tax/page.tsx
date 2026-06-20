import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { Metadata } from "next";
import { VatTaxClient } from "./VatTaxClient";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "VAT & Sales Tax Calculator";
const TOOL_DESC = "Perfect your business invoices. Free online VAT and GST calculator. Instantly add tax to a net price, or reverse-calculate the tax.";
const PATH = "/finance/vat-tax";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${TOOL_NAME} — Perfect Your Invoices Instantly | Hilmost Toolbox`,
    description: TOOL_DESC,
    alternates: {
      canonical: getCanonicalUrl(PATH),
    },
  };
}

const faqs = [
  {
    question: "What does VAT stand for?",
    answer: "VAT stands for Value-Added Tax. It is a consumption tax assessed on the value added to goods and services at each stage of production.",
  },
  {
    question: "How do you reverse-calculate VAT from a total?",
    answer: "Divide the gross price by (1 + the VAT rate). For example, to remove a 20% VAT from $120: $120 / 1.20 = $100 net.",
  },
  {
    question: "What is the difference between VAT, GST, and Sales Tax?",
    answer: "VAT and GST are typically federal taxes collected at every stage. US Sales Tax is collected only at the final point of sale to the consumer.",
  },
];

export default function VatTaxPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "VAT & Tax", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/vat-tax/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: 'input', popover: { title: '1. Amount', description: 'Enter the price you want to apply tax to or remove tax from.' } },
    { element: '.flex-1 > select', popover: { title: '2. Tax Rate', description: 'Select common global rates or enter a custom percentage.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-5xl">
      <WebApplicationSchema
        name={TOOL_NAME}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="VAT & GST Calculator"
        subtitle="Perfect your business invoices. Easily add tax to a net price, or reverse-calculate the exact tax instantly."
        lastUpdated={lastUpdated}
        tourId="vat_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <div className="max-w-xl mx-auto">
        <VatTaxClient />
      </div>

      <ToolArticle title="Invoicing Made Easy: Adding and Removing Tax">
        <p>
          Whether you are a freelancer generating an invoice or a consumer trying to figure out how much you actually paid in taxes, dealing with VAT, GST, or Sales Tax can be confusing.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}
