import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { AreaClient } from "./AreaClient";

export function AreaPageUI({
  defaultFrom = "Square Foot",
  defaultTo = "Square Meter",
  title = "Area Converter | Square Feet, Meters, Acres & More",
  description = "Free, high-precision area converter. Instantly convert between square feet, square meters, acres, hectares, and more for real estate, farming, and construction.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/area"
}: {
  defaultFrom?: string;
  defaultTo?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
}) {
  const faqs = [
    {
      question: "What is the difference between an Acre and a Hectare?",
      answer: "Both are standard units for measuring land, but Acre is part of the Imperial system (primarily used in the US and UK) while Hectare is part of the Metric system. One Hectare is exactly 10,000 square meters, which is roughly equal to 2.47 Acres.",
    },
    {
      question: "How do I calculate the area of a room in square feet?",
      answer: "Measure the length and width of the room in feet, then multiply those two numbers together. For example, a room that is 10 feet long and 12 feet wide has an area of 120 square feet.",
    },
    {
      question: "Why do we use different units for area depending on the context?",
      answer: "Small units like square inches or centimeters are used for precise crafting and manufacturing. Medium units like square feet or square meters are standard for residential floor plans and room sizes. Large units like acres, hectares, and square miles are necessary for large-scale agriculture, real estate development, and geographical mapping.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 || word.toLowerCase() === 'converter' ? <span key={i} className="text-blue-500">{word} </span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl w-full"></div>}>
        <AreaClient defaultFrom={defaultFrom} defaultTo={defaultTo} />
      </Suspense>

      <ToolArticle title="The Importance of Accurate Area Conversion">
        <p>
          Whether you are buying a new home, planning an agricultural project, or laying down new flooring, understanding area conversions is a critical skill that ensures you don't overspend on materials or misunderstand property values.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Select Units</strong> - Choose your starting unit and your target conversion unit.</li>
          <li><strong>Step 2: Enter Value</strong> - Type the number you want to convert into the input field.</li>
          <li><strong>Step 3: Get Result</strong> - The converted measurement updates instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
