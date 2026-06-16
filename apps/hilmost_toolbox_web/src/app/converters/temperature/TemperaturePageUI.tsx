import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { TemperatureConverterClient } from "./TemperatureConverterClient";

export function TemperaturePageUI({ defaultUnit1 = "celsius", defaultUnit2 = "fahrenheit", title = "Temperature Converter", description = "Effortlessly switch between global weather scales. Instant conversions for Celsius, Fahrenheit, and Kelvin.", canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/temperature" }) {
  const faqs = [
    {
      question: "How do you convert Celsius to Fahrenheit manually?",
      answer: "The formula is: (Celsius × 9/5) + 32. For a quick mental estimate, you can simply multiply the Celsius temperature by 2 and add 30. (e.g., 20°C × 2 = 40. 40 + 30 = 70°F).",
    },
    {
      question: "What is Absolute Zero?",
      answer: "Absolute zero is the lowest limit of the thermodynamic temperature scale, a state at which the enthalpy and entropy of a cooled ideal gas reach their minimum value, taken as zero. It is exactly 0 Kelvin, which equals -273.15°C or -459.67°F.",
    },
    {
      question: "At what temperature are Celsius and Fahrenheit the same?",
      answer: "Celsius and Fahrenheit intersect exactly at -40°. Therefore, -40°C is perfectly equal to -40°F.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name={title + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} className="text-rose-500">{word}</span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <TemperatureConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
        </div>
      </Suspense>

      <ToolArticle title="Decoding Global Temperatures">
        <p>
          Whether you are traveling internationally, following a foreign recipe, or studying physics, dealing with multiple temperature scales can be incredibly frustrating. Because temperature scales do not start at the same &quot;zero,&quot; you cannot use simple multiplication to convert them.
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
