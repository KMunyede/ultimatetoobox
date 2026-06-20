import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, BreadcrumbSchema, FAQSchema, ToolHeader } from "@utilitiessite/ui";
import { DeletePagesClient } from "../../../components/pdf/DeletePagesClient";
import { getCanonicalUrl, getFileLastUpdated } from "@utilitiessite/config";
import path from "path";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Delete PDF Pages";
const TOOL_DESC = "Remove unwanted pages from your PDF document instantly. Secure, browser-side deletion with visual page selection.";
const PATH = "/pdf-tools/delete-pages";
const CANONICAL_URL = `https://hilmost-toolbox.hilmost.net${PATH}`;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Delete PDF Pages Free Online — Remove PDF Pages | Hilmost Toolbox";
  const description = "Remove specific pages from your PDF document instantly. Free online tool to delete unwanted PDF pages with visual selection. 100% private and secure.";
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
    question: "How do I remove a page from a PDF?",
    answer: "Upload your document, click on the thumbnails of the pages you want to remove (they will be highlighted and faded), then click 'Delete Selected & Download'. A new PDF will be generated without the deleted pages.",
  },
  {
    question: "Can I delete multiple pages at once?",
    answer: "Yes. You can select as many pages as you like by clicking them in the visual grid. The tool tracks all selected pages and removes them in a single batch operation.",
  },
  {
    question: "What happens to the page numbering after deletion?",
    answer: "The resulting PDF will be re-paginated automatically. For example, if you delete page 2 of a 5-page document, the original page 3 becomes the new page 2, ensuring a continuous and professional document structure.",
  },
];

export default function DeletePagesPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Delete Pages", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/delete-pages/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Upload', description: 'Select the PDF you want to clean up.' } },
    { element: '.pdf-page-grid', popover: { title: '2. Select to Discard', description: 'Click the pages you want to remove from the document.' } },
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
        subtitle="Clean up your documents by removing irrelevant or sensitive pages. Fast, secure, and completely visual."
        lastUpdated={lastUpdated}
        tourId="delete_pages"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <DeletePagesClient />

      <ToolArticle title="Streamline Your PDF Documents">
        <p>
          Sometimes a PDF contains more information than you need to share, or a scan results in unnecessary blank pages. Manually editing these files often requires expensive software, but our Delete Pages tool makes it a simple three-step process.
        </p>
        <h3>Visual Selection for Accuracy</h3>
        <p>
          Deleting pages by number can be risky if you miscount. Our tool renders every page as a high-quality thumbnail, allowing you to visually confirm exactly which content is being removed. Once selected, pages are visually de-emphasized so you can review your changes before finalizing.
        </p>
        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Select File</strong> - Upload the PDF you want to edit.</li>
          <li><strong>Step 2: Pick Pages</strong> - Click on the thumbnails of the pages you wish to discard.</li>
          <li><strong>Step 3: Download</strong> - Generate your cleaned PDF instantly.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}
