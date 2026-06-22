import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools, Breadcrumbs, ToolHeader } from "@utilitiessite/ui";
import { WeightConverterClient } from "./WeightConverterClient";
import { ShareButton } from "@/components/ShareButton";

export function WeightMassPageUI({
  defaultUnit1 = "kilograms",
  defaultUnit2 = "pounds",
  title = "Weight & Mass Converter",
  description = "Drop the heavy math. Effortlessly calculate metric and imperial weight units without the guesswork.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/weight-mass",
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
    { label: "Weight & Mass", href: "/converters/weight-mass" },
  ];

  const faqs = [
    {
      question: "How many pounds are in a kilogram?",
      answer: "There are approximately 2.20462 pounds in a single kilogram. To quickly estimate kilograms to pounds, multiply the number by 2 and add 10%.",
    },
    {
      question: "What is the difference between weight and mass?",
      answer: "Mass is the amount of matter in an object. Weight is the gravitational force acting on that mass. While you would weigh less on the Moon, your mass remains the same.",
    },
    {
      question: "What is a 'Stone' in weight measurement?",
      answer: "A stone is an imperial unit of mass equal to 14 pounds. It is still commonly used in the United Kingdom and Ireland to measure human body weight.",
    },
  ];

  const tourSteps = [
    { element: 'input', popover: { title: '1. Input Weight', description: 'Enter the value you wish to convert.' } },
    { element: 'select', popover: { title: '2. Select Unit', description: 'Choose from global standards like kg, lbs, or stones.' } },
  ];

  return (
    <div className="container mx-auto px-4 py-1 max-w-5xl">
      <WebApplicationSchema name={title + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      <Breadcrumbs items={breadcrumbItems} />

      <ToolHeader
        title={title}
        subtitle={description}
        lastUpdated={lastUpdated}
        tourId="weight_converter"
        tourSteps={tourSteps}
        shareButton={<ShareButton />}
      />
      
      <div className="max-w-4xl mx-auto">
        <WeightConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
      </div>

      <ToolArticle title="The Heavy Lifting of Global Logistics">
        <p>
          Whether you are tracking your fitness progress, measuring baking ingredients, or calculating shipping freight costs, weight conversion is essential.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Enter Weight</strong> - Type the numeric mass value into the primary input box.</li>
          <li><strong>Step 2: Choose Mass Units</strong> - Convert between grams, kilograms, pounds, ounces, and even metric tons.</li>
          <li><strong>Step 3: Confirm Total</strong> - The tool provides the exact converted weight instantly as you type.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="converters" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
