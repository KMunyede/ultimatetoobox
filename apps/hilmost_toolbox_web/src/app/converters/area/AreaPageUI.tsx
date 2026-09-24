import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AreaClient } from "./AreaClient";
import { ShareButton } from "@/components/ShareButton";

export function AreaPageUI({
  defaultFrom = "Square Foot",
  defaultTo = "Square Meter",
  title,
  description,
  canonicalUrl,
  lastUpdated,
  breadcrumbItems: customBreadcrumbItems,
  summary
}: {
  defaultFrom?: string;
  defaultTo?: string;
  title: string;
  description: string;
  canonicalUrl: string;
  lastUpdated?: string;
  breadcrumbItems?: { label: string; href: string }[];
  summary?: string;
}) {
  const defaultBreadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Area", href: "/converters/area" },
  ];

  const breadcrumbItems = customBreadcrumbItems || defaultBreadcrumbItems;

  const faqs = [
    {
      question: "What is the difference between an Acre and a Hectare?",
      answer: "One Hectare is part of the Metric system and is exactly 10,000 square meters. One Acre is part of the Imperial system and is roughly 0.4047 Hectares.",
    },
    {
      question: "How do I calculate the area of a room in square feet?",
      answer: "Multiply the length of the room by the width (both in feet). For example, a 10ft x 12ft room is 120 square feet.",
    },
    {
      question: "Why do we use different units for area?",
      answer: "Context matters. Small units (sq in) are for manufacturing. Medium units (sq ft) are for housing. Large units (acres) are for agriculture and development.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Area', description: 'Enter the numeric value of the land or floor space.' } },
    { element: 'select', popover: { title: '2. Target Unit', description: 'Switch between metrics or agricultural units instantly.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-6xl">
      <WebApplicationSchema
        name={`${title.split(" | ")[0]} | Hilmost`}
        description={description}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' | ')[0]}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="area_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      {summary && (
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-black dark:text-white text-sm md:text-base leading-relaxed border-l-4 border-brand-primary/20 pl-4">
            {summary}
          </p>
        </div>
      )}

      <AreaClient defaultFrom={defaultFrom} defaultTo={defaultTo} />

      <ToolArticle title="The Importance of Accurate Area Conversion">
        <p>
          Whether you are buying a new home, planning an agricultural project, or laying down new flooring, understanding area conversions is a critical skill that ensures you don&apos;t overspend on materials.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose between metric (sq m) or imperial (sq ft) and agricultural units like acres.</li>
          <li><strong>Step 2: Enter Dimensions</strong> - Type the numeric value of the land or floor space you want to convert.</li>
          <li><strong>Step 3: Get Instant Result</strong> - The converted measurement updates in real-time as you modify either field.</li>
        </ol>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl not-prose">
          <h4 className="text-lg font-normal text-blue-900 dark:text-blue-100 mb-2 uppercase tracking-tight">Deeper Dive</h4>
          <p className="text-blue-800 dark:text-blue-300 mb-4 font-medium">Want to learn more about area conversion formulas, acres vs hectares, and avoiding the squared-unit pitfall?</p>
          <Link href="/guides/area-conversion-guide" className="inline-flex items-center gap-2 text-sm font-normal uppercase tracking-widest text-brand-primary hover:underline">
            Read the full guide <ArrowRight size={14} />
          </Link>
        </div>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
