import { Metadata } from "next";
import { WebApplicationSchema, Breadcrumbs, ToolArticle, FAQAccordion, RelatedTools, FAQSchema, ToolHeader, AuthorBio, DidYouKnow, PrivacyBadge, HowToSchema, SourceReference } from "@utilitiessite/ui";
import { RotatePDFClient } from "../../../components/pdf/RotatePDFClient";
import { getCanonicalUrl } from "@utilitiessite/config";
import { getFileLastUpdated } from "@utilitiessite/config/server";;
import path from "path";
import { ShareButton } from "@/components/ShareButton";
import { formatTitle, METADATA_BASE_URL } from "@/lib/metadata";

const TOOL_NAME = "Rotate PDF Pages";
const TOOL_DESC = "Rotate individual or all pages of a PDF document instantly. Secure, browser-side rotation with live visual previews. Fix scans with no uploads.";
const PATH = "/pdf-tools/rotate-pdf";
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
    question: "Can I rotate just one page instead of the whole document?",
    answer: "Yes. Our visual workspace provides individual rotate buttons for every single page in your document. You can rotate different pages to different angles (90, 180, or 270 degrees) and save the entire document with one click.",
  },
  {
    question: "Does rotating a PDF affect its quality or text recognition?",
    answer: "No. Rotating a PDF through our tool only changes the rotation metadata (the transformation matrix) of the pages. The actual compressed image data and text layers inside the PDF are not re-encoded, ensuring zero loss in quality.",
  },
  {
    question: "How do I rotate all pages at once?",
    answer: "After uploading your file, use the 'Rotate All' button in the toolbar. This will apply a 90-degree clockwise rotation to every page in the document simultaneously, which is perfect for fixing entire documents scanned in the wrong orientation.",
  },
  {
    question: "Is it possible to undo a rotation before downloading?",
    answer: "Yes. Our tool is interactive. You can keep clicking the rotate button for a page to cycle through 360 degrees until it returns to its original position.",
  },
  {
    question: "Are my files safe on this website?",
    answer: "Absolutely. We utilize client-side JavaScript to perform the rotation. Your files never leave your computer and are never seen by our servers. This is the most secure way to handle private documents.",
  },
];

const howToSteps = [
  { name: "Select File", text: "Drag your misaligned PDF into the rotation area or click to upload from your local drive." },
  { name: "Adjust Orientation", text: "Use individual page controls or the 'Rotate All' button to fix the orientation." },
  { name: "Live Preview", text: "Watch the thumbnails rotate in real-time to confirm the final layout of your document." },
  { name: "Download", text: "Save the corrected PDF directly to your device. Processing is instant and secure." },
];

export default function RotatePDFPage() {
  const breadcrumbItems = [
    { label: "PDF Tools", href: "/pdf-tools" },
    { label: "Rotate PDF", href: PATH },
  ];

  const filePath = path.join(process.cwd(), "src/app/pdf-tools/rotate-pdf/page.tsx");
  const lastUpdated = getFileLastUpdated(filePath);

  const tourSteps = [
    { element: '.pdf-dropzone', popover: { title: '1. Upload', description: 'Drag and drop your PDF file to see individual page controls.' } },
    { element: '.pdf-rotate-controls', popover: { title: '2. Fix Orientation', description: 'Rotate individual pages or use the "Rotate All" feature.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={CANONICAL_URL}
        image="https://hilmost-toolbox.hilmost.net/og/pdf-tools.png"
      />
      <FAQSchema items={faqs} />
      <HowToSchema
        name="How to Rotate PDF Pages Permanently"
        description="Follow this visual guide to correcting the orientation of your PDF documents locally in your browser."
        steps={howToSteps}
      />
      
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle="Fix upside-down scans or misaligned documents. Permanently rotate PDF pages with real-time feedback."
        lastUpdated={lastUpdated}
        tourId="rotate_pdf"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />

      <RotatePDFClient />

      <PrivacyBadge />

      <DidYouKnow category="pdf" />

      <ToolArticle title="Mastering Document Orientation and Layout">
        <p>
          Scanned documents often end up with some pages oriented incorrectly, making them difficult to read, print, or present professionally. Whether it&apos;s a contract scanned upside-down or a landscape spreadsheet trapped in a portrait PDF, our <strong>Rotate PDF Pages</strong> tool allows you to correct these issues without the need for expensive software subscriptions.
        </p>

        <h3>Interactive Visual Feedback</h3>
        <p>
          Instead of guessing which page you are rotating based on page numbers alone, our tool renders high-fidelity thumbnails of every page in your document. As you click the rotate button, the thumbnail animates to show exactly how the final document will look. This visual-first approach eliminates errors and ensures your final document is exactly as intended.
        </p>

        <h3>Why Local Rotation is Superior</h3>
        <p>
          Many online PDF rotators require you to upload your entire document to their servers, where it is processed and then made available for download. This process is slow and introduces significant security vulnerabilities for sensitive documents. Our engine performs <strong>In-Browser Rotation</strong>. By using the <code>pdf-lib</code> library, we modify the document&apos;s internal transformation matrix directly on your machine. Your data remains private, and the speed is limited only by your computer&apos;s processor, not your internet connection.
        </p>

        <h3>How to Use This Tool</h3>
        <ol>
          <li><strong>Step 1: Add PDF File</strong> - Drag your misaligned document into the visual rotation workspace. Our engine will quickly generate thumbnails for your review.</li>
          <li><strong>Step 2: Adjust Orientation</strong> - Click individual page rotate buttons to rotate them in 90-degree increments, or use &quot;Rotate All&quot; to fix consistent orientation errors across the entire file.</li>
          <li><strong>Step 3: Download Corrected</strong> - Once you are satisfied with the visual layout, save your permanently rotated PDF document to your device in seconds.</li>
        </ol>

        <SourceReference
          sources={[
            { name: "Adobe - PDF Metadata and Rotation", url: "https://www.adobe.com/acrobat/resources/pdf-metadata.html" },
            { name: "Mozilla - PDF.js Project", url: "https://mozilla.github.io/pdf.js/" }
          ]}
        />
      </ToolArticle>

      <FAQAccordion items={faqs} />

      <AuthorBio />

      <RelatedTools category="pdf-tools" currentPath={PATH} />
    </div>
  );
}
