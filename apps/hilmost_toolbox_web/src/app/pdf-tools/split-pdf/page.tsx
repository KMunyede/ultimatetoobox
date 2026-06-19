import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { SplitPDFClient } from "../../../components/pdf/SplitPDFClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Split PDF Pages";
const TOOL_DESC = "Extract specific pages or ranges from your PDF document instantly. Secure, browser-side splitting with visual page selection.";
const PATH = "/pdf-tools/split-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Split PDF Files — Extract Pages Free Online | Hilmost Toolbox";
  const description = "Split your PDF documents into separate files or extract specific pages instantly. Free online tool with visual page selection. 100% private and secure.";
  const canonical = getCanonicalUrl(PATH);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
  };
}

const faqs = [
  {
    question: "How do I extract a single page from a PDF?",
    answer: "Upload your file, use the 'Select Pages' mode, click on the specific page you want to keep, and hit 'Split and Download'. A new PDF containing only that page will be generated instantly.",
  },
  {
    question: "What format should I use for custom ranges?",
    answer: "You can use comma-separated numbers and hyphens. For example: '1, 3, 5-10, 15' will extract pages 1, 3, all pages from 5 to 10, and page 15 into a new document.",
  },
  {
    question: "Are my files uploaded to any server?",
    answer: "No. Just like all tools in the Hilmost Toolbox, the PDF splitting process happens entirely inside your web browser. Your data never leaves your computer, ensuring absolute privacy.",
  },
];

export default function SplitPDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Split PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/split-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={getCanonicalUrl(PATH)} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Split PDF <span className="text-red-600 dark:text-red-500">Pages</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Break down large documents or extract exactly what you need. Fast, visual, and completely private PDF splitting.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar size={14} />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>

      <SplitPDFClient />

      <ToolArticle title="Precision PDF Extraction">
        <p>
          Often, you only need a specific section of a massive PDF report or a single page from a scanned multi-page document. Our Split PDF tool allows you to isolate those pages with surgical precision using two distinct methods.
        </p>
        <h3>Visual Selection vs. Range Input</h3>
        <p>
          For smaller documents, the <strong>Select Pages</strong> mode provides a visual grid of thumbnails where you can simply tap the pages you want to extract. For larger files, the <strong>Custom Range</strong> mode allows you to type specific page numbers or spans (e.g., 10-50) for rapid processing.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Upload PDF</strong> - Drag your document into the browser.</li>
          <li><strong>Step 2: Choose Pages</strong> - Click the thumbnails or enter a numeric range.</li>
          <li><strong>Step 3: Extract</strong> - Download your new, smaller PDF immediately.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}
