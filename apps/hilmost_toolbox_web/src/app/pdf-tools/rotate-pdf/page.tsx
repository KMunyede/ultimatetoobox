import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { RotatePDFClient } from "../../../components/pdf/RotatePDFClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { Calendar } from "lucide-react";

const TOOL_NAME = "Rotate PDF Pages";
const TOOL_DESC = "Rotate individual or all pages of a PDF document instantly. Secure, browser-side rotation with live visual previews.";
const PATH = "/pdf-tools/rotate-pdf";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Rotate PDF Files — Free Online Document Rotator | Hilmost Toolbox";
  const description = "Rotate your PDF documents or specific pages instantly. Free online tool to fix orientation issues in your PDF files. 100% private and secure.";
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
    question: "Can I rotate just one page instead of the whole document?",
    answer: "Yes. Our tool provides individual rotate buttons for every page. You can rotate different pages to different angles (90, 180, or 270 degrees) and save them all at once.",
  },
  {
    question: "Does rotating a PDF affect its quality?",
    answer: "No. Rotating a PDF only changes the orientation metadata and transformation matrix of the pages. The actual text and image data inside the PDF are not re-compressed or altered, ensuring perfect quality.",
  },
  {
    question: "How do I rotate all pages at once?",
    answer: "After uploading your file, click the 'Rotate All' button in the tool header. This will apply a 90-degree clockwise rotation to every page in the document simultaneously.",
  },
];

export default function RotatePDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Rotate PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/rotate-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <WebApplicationSchema name={TOOL_NAME} description={TOOL_DESC} url={getCanonicalUrl(PATH)} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Rotate PDF <span className="text-red-600 dark:text-red-500">Pages</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
          Fix upside-down scans or misaligned documents. Permanently rotate PDF pages with real-time visual feedback.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Calendar size={14} />
          <span>Last updated: {lastUpdated}</span>
        </div>
      </div>

      <RotatePDFClient />

      <ToolArticle title="Mastering Document Orientation">
        <p>
          Scanned documents often end up with some pages oriented incorrectly, making them difficult to read or present professionally. Our Rotate PDF tool allows you to correct these orientation issues without needing expensive desktop software.
        </p>
        <h3>Interactive Visual Feedback</h3>
        <p>
          Instead of guessing which page you are rotating, our tool renders high-fidelity thumbnails of every page. As you click the rotate button, the thumbnail animates to show exactly how the final document will look.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Upload PDF</strong> - Drag your document into the rotation grid.</li>
          <li><strong>Step 2: Adjust Rotation</strong> - Use 'Rotate All' for universal changes or click individual page buttons.</li>
          <li><strong>Step 3: Save</strong> - Download your corrected PDF instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}
