import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { WeightConverterClient } from "./WeightConverterClient";

export function WeightMassPageUI({ defaultUnit1 = "kilograms", defaultUnit2 = "pounds", title = "Weight & Mass Converter", description = "Drop the heavy math. Effortlessly calculate metric and imperial weight units without the guesswork.", canonicalUrl = "https://hilmost-toolbox.hilmost.net/converters/weight-mass" }) {
  const faqs = [
    {
      question: "How many pounds are in a kilogram?",
      answer: "There are approximately 2.20462 pounds in a single kilogram. To quickly estimate kilograms to pounds, multiply the number by 2 and add 10%.",
    },
    {
      question: "What is the difference between weight and mass?",
      answer: "Mass is the amount of matter in an object, which never changes regardless of location. Weight is the gravitational force acting on that mass. While you would weigh much less on the Moon because of lower gravity, your mass remains exactly the same.",
    },
    {
      question: "What is a 'Stone' in weight measurement?",
      answer: "A stone is an imperial unit of mass equal to 14 pounds. It is still commonly used in the United Kingdom and Ireland to measure human body weight.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name={title + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-3">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
          {title.split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} className="text-blue-500">{word}</span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-4xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <WeightConverterClient defaultUnit1={defaultUnit1} defaultUnit2={defaultUnit2} />
        </div>
      </Suspense>

      <ToolArticle title="The Heavy Lifting of Global Logistics">
        <p>
          Whether you are tracking your fitness progress, measuring baking ingredients, or calculating shipping freight costs, weight conversion is essential.
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
