import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs, ToolHeader, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { Metadata } from "next";
import { VatTaxClient } from "./VatTaxClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "VAT & Sales Tax Calculator";
const TOOL_DESC = "Perfect your business invoices. Free online VAT and GST calculator. Instantly add tax to a net price, or reverse-calculate the tax.";
const PATH = "/finance/vat-tax";
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

const howToSteps = [
  { name: "Choose Calculation Mode", text: "Select whether you want to 'Add VAT' to a net amount or 'Remove VAT' from a total (gross) price." },
  { name: "Input Base Amount", text: "Enter the currency value you wish to calculate tax for." },
  { name: "Set Tax Rate", text: "Input the applicable percentage rate (e.g., 20% for UK VAT or 15% for standard GST)." },
  { name: "Review Breakdown", text: "Instantly see the split between the net price, the tax amount, and the final grand total." },
];

export default function VatTaxPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "VAT & Tax", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/vat-tax/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '#tour-vat-mode', popover: { title: '1. Select Mode', description: 'Decide if you are adding tax to a price or removing it from a total.' } },
    { element: 'input', popover: { title: '2. Values', description: 'Enter the amount and the specific tax percentage.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name="VAT & Tax Calculator"
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/finance.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name={`How to Calculate VAT & Sales Tax`}
        description="Follow our four-step guide to accurately calculate taxes for your business invoices or personal purchases."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title="VAT & GST Calculator"
        subtitle="Perfect your business invoices. Easily add tax to a net price, or reverse-calculate the exact tax instantly."
        lastUpdated={lastUpdated}
        tourId="vat_calc"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <VatTaxClient />

      <ToolArticle title="Invoicing Made Easy: Mastering Tax Calculations">
        <p>
          Whether you are a freelancer generating a professional invoice or a consumer trying to figure out the &quot;true&quot; cost of a purchase, mastering VAT (Value Added Tax) and GST (Goods and Services Tax) is essential for financial clarity. VAT is a consumption tax placed on a product whenever value is added at each stage of the supply chain, from production to the point of sale.
        </p>
        
        <h3>Adding Tax vs. Removing Tax</h3>
        <p>
          Our tool supports two primary workflows used by businesses and tax professionals worldwide:
        </p>
        <ul>
          <li><strong>Add VAT:</strong> Typically used when quoting a price to a customer. You start with your net service fee (the amount you want to keep) and add the government mandated tax rate to get the final gross total that the customer pays.</li>
          <li><strong>Remove VAT (Reverse Calculation):</strong> Used when you have a total receipt or "Inclusive" price and need to separate the tax for bookkeeping purposes. This is common when claiming back business expenses.</li>
        </ul>

        <h3>Common Global Tax Rates</h3>
        <p>
          While tax rates vary by jurisdiction, common values include 20% (United Kingdom), 15% (New Zealand/South Africa), and various GST rates in Canada and Australia. Always verify the current legal rate for your specific region before finalizing official documents. In many countries, certain items like books, children's clothes, or basic groceries may be "Zero-rated" or exempt.
        </p>

        <h3>The Math Behind the Calculation</h3>
        <p>
          To calculate the <strong>Gross Amount</strong> (Adding Tax):
          <br />
          <code>Gross = Net * (1 + Rate/100)</code>
        </p>
        <p>
          To calculate the <strong>Net Amount</strong> (Removing Tax):
          <br />
          <code>Net = Gross / (1 + Rate/100)</code>
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select Mode</strong> - Use the toggle at the top to switch between "Add VAT" or "Remove VAT." This changes the logic of the entire calculation instantly.</li>
          <li><strong>Step 2: Enter Amount</strong> - Input the price you want to work with. Our high-impact display updates in real-time as you type.</li>
          <li><strong>Step 3: Set Tax Rate</strong> - Enter the custom percentage applicable to your specific region or product category.</li>
          <li><strong>Step 4: Breakdown</strong> - Review the result card for a clear split between the base price and the tax component.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "GOV.UK - VAT rates and rules", url: "https://www.gov.uk/vat-rates" },
            { name: "OECD - Consumption Tax Trends", url: "https://www.oecd.org/tax/consumption/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath={PATH} />
    </div>
  );
}
