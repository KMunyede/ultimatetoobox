import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, BreadcrumbSchema, ToolHeader } from "@utilitiessite/ui";
import { getCanonicalUrl } from "@utilitiessite/config";
import { TemperatureConverterClient } from "./TemperatureConverterClient";
import { ShareButton } from "@/components/ShareButton";

const TOOL_NAME = "Temperature Converter";
const TOOL_DESC = "Convert seamlessly between Celsius, Fahrenheit, and Kelvin in real-time — no signup required.";
const PATH = "/converters/temperature";

export function TemperaturePageUI({
  defaultUnit1 = "celsius",
  defaultUnit2 = "fahrenheit",
  title = TOOL_NAME,
  description = "Effortlessly switch between global weather scales. Instant conversions for Celsius, Fahrenheit, and Kelvin.",
  canonicalUrl = getCanonicalUrl(PATH),
  lastUpdated
}: {
  defaultUnit1?: string;
  defaultUnit2?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  lastUpdated?: string;
}) {
  const breadcrumbItems = [
    { label: "Converters", href: "/converters" },
    { label: "Temperature", href: PATH },
  ];

  const faqs = [
    {
      question: "How do you convert Celsius to Fahrenheit manually?",
      answer: "The formula is: (Celsius × 9/5) + 32. For a quick mental estimate, you can simply multiply the Celsius temperature by 2 and add 30.",
    },
    {
      question: "What is Absolute Zero?",
      answer: "Absolute zero is exactly 0 Kelvin, which equals -273.15°C or -459.67°F.",
    },
    {
      question: "At what temperature are Celsius and Fahrenheit the same?",
      answer: "Celsius and Fahrenheit intersect exactly at -40°. Therefore, -40°C is perfectly equal to -40°F.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Temperature', description: 'Enter the numeric value you want to scale.' } },
    { element: 'select', popover: { title: '2. Select Scale', description: 'Switch between weather-standard or scientific units.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema
        name={`${TOOL_NAME} | Hilmost`}
        description={TOOL_DESC}
        url={canonicalUrl}
        image="https://hilmost-toolbox.hilmost.net/og/converters.png"
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={TOOL_NAME}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="temperature_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <TemperatureConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
      </div>

      <ToolArticle title="Decoding Global Temperatures">
        <p>
          Whether you are traveling internationally, following a foreign recipe, or studying physics, dealing with multiple temperature scales can be incredibly frustrating. Because temperature scales do not start at the same &quot;zero,&quot; you cannot use simple multiplication to convert them.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Input Reading</strong> - Enter the temperature value you want to translate to another scale.</li>
          <li><strong>Step 2: Select Scale</strong> - Switch between Celsius, Fahrenheit, and Kelvin with high precision.</li>
          <li><strong>Step 3: View Equivalent</strong> - See the exact conversion to ensure your scientific or culinary data is correct.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={PATH} />
    </div>
  );
}
