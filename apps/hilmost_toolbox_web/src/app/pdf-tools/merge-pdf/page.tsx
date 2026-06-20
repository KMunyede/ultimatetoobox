import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader } from "@utilitiessite/ui";
import { MergePDFClient } from "../../../components/pdf/MergePDFClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Merge PDF Files";
const TOOL_DESC = "Combine multiple PDF documents into one instantly. Secure, browser-side merging with drag-to-reorder functionality.";
const PATH = "/pdf-tools/merge-pdf";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Merge PDF Files Free Online — Combine Multiple PDFs | Hilmost Toolbox";
  const description = "Combine multiple PDF files into a single document instantly. Free online tool to merge PDFs with drag-to-reorder support. 100% private and secure.";
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
      images: ["/og/pdf-tools.png"],
    },
  };
}

const faqs = [
  {
    question: "Is merging PDFs online secure?",
    answer: "Yes, our tool is 100% secure because all merging happens locally in your web browser. Your PDF files are never uploaded to our servers or stored anywhere online. Your sensitive data remains entirely on your device.",
  },
  {
    question: "Is there a limit to the number of files I can merge?",
    answer: "There is no hard limit on the number of files, but performance depends on your device's memory. For most users, merging 20-50 documents works smoothly. If you have very large files, we recommend merging them in smaller batches.",
  },
  {
    question: "Can I change the order of the files before merging?",
    answer: "Absolutely. Once you upload your files, you can drag and drop the file cards to reorder them exactly how you want them to appear in the final combined PDF.",
  },
];

export default function MergePDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Merge PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/merge-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Select Files', description: 'Click or drag PDF files into this area to start.' } },
    { element: '.pdf-merge-btn', popover: { title: '2. Combine', description: 'Click this button to merge your documents once you are happy with the order.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-4 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/pdf-tools.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Combine multiple documents into a single, organized PDF instantly. Professional-grade merging."
        lastUpdated={lastUpdated}
        tourId="merge_pdf"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <MergePDFClient />

      <ToolArticle title="Why Merge PDFs Locally?">
        <p>
          Managing multiple PDF documents can be a logistical headache, especially when you need to send a single cohesive file for applications, reports, or legal documentation. While many online services offer merging, they require you to upload your sensitive data to their cloud infrastructure.
        </p>
        <h3>Privacy-First Merging</h3>
        <p>
          Our Merge PDF tool uses the <code>pdf-lib</code> engine to perform all calculations directly inside your browser&apos;s memory. This means your private information—bank statements, contracts, or personal IDs—never leaves your machine.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select Files</strong> - Click the upload zone or drag and drop your PDF files.</li>
          <li><strong>Step 2: Reorder</strong> - Drag the file cards to arrange them in the correct sequence.</li>
          <li><strong>Step 3: Download</strong> - Click the merge button to generate and save your new document instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}
