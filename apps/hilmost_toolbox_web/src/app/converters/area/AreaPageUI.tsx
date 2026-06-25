import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { AreaClient } from "./AreaClient";
import { ShareButton } from "@/components/ShareButton";

export function AreaPageUI({
  defaultFrom = "Square Foot",
  defaultTo = "Square Meter",
  title = "Area Converter",
  description = "Free, high-precision area converter. Instantly convert between square feet, square meters, acres, hectares, and more.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/area",
  lastUpdated
}: {
  defaultFrom?: string;
  defaultTo?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Area", href: "/converters/area" },
  ];

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
            <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title.split(' | ')[0]}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="area_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
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
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
