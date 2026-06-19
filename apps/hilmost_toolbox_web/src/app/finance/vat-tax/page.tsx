import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion , RelatedTools, Breadcrumbs } from "@utilitiessite/ui";
import { Metadata } from "next";
import { VatTaxClient } from "./VatTaxClient";
import { Suspense } from "react";
import { getFileLastUpdated, getCanonicalUrl } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "VAT & Sales Tax Calculator — Perfect Your Invoices Instantly | Hilmost Toolbox",
    description: "Perfect your business invoices. Free online VAT and GST calculator. Instantly add tax to a net price, or reverse-calculate the tax from a gross price.",
    alternates: {
      canonical: getCanonicalUrl("/finance/vat-tax"),
    },
  };
}

const faqs = [
  {
    question: "What does VAT stand for?",
    answer: "VAT stands for Value-Added Tax. It is a consumption tax assessed on the value added to goods and services. It applies to nearly all goods and services that are bought and sold for use or consumption.",
  },
  {
    question: "How do you reverse-calculate VAT from a total?",
    answer: "To extract the VAT amount from a gross price, you divide the gross price by (1 + the VAT rate). For example, to remove a 20% VAT from $120, you divide 120 by 1.20, which gives you a net price of $100.",
  },
  {
    question: "What is the difference between VAT, GST, and Sales Tax?",
    answer: "They are all forms of consumption taxes paid by the end-user. VAT (Value-Added Tax) and GST (Goods and Services Tax) are typically federal taxes collected at every stage of the supply chain. US Sales Tax is collected only at the final point of sale to the consumer by state or local governments.",
  },
];

export default function VatTaxPage() {
  const breadcrumbItems = [
    { label: "Finance", href: "/finance" },
    { label: "VAT & Tax", href: "/finance/vat-tax" },
  ];

  const filePath = path.join(process.cwd(), "src/app/finance/vat-tax/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name="VAT Calculator | Hilmost" description="Perfect your business invoices. Free online VAT and Tax calculator. Easily add or remove VAT from any amount." url="https://hilmost-toolbox.hilmost.net/finance/vat-tax" />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          VAT & Sales Tax <span className="text-emerald-600 dark:text-emerald-500">Calculator</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Perfect your business invoices. Easily add tax to a net price, or reverse-calculate the exact tax from a grand total instantly.
        </p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar size={14} />
            <span>Last updated: {lastUpdated}</span>
          </div>
        )}
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-xl mx-auto w-full"></div>}>
        <div className="max-w-xl mx-auto">
          <VatTaxClient />
        </div>
      </Suspense>

      <ToolArticle title="Invoicing Made Easy: Adding and Removing Tax">
        <p>
          Whether you are a freelancer generating an invoice or a consumer trying to figure out how much you actually paid in taxes, dealing with VAT (Value-Added Tax), GST (Goods and Services Tax), or localized Sales Tax can be confusing.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Financial Data</strong> - Input your principal amounts, interest rates, or currency values.</li>
          <li><strong>Step 2: Adjust Parameters</strong> - Modify timelines, frequencies, or tax rates as needed.</li>
          <li><strong>Step 3: View Projection</strong> - Instantly see the calculated financial projection, total costs, or exchange amounts.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="finance" currentPath="/finance/vat-tax" />
    </div>
  );
}
