import { WebApplicationSchema, FAQSchema, ToolArticle, FAQAccordion, RelatedTools } from "@utilitiessite/ui";
import { Suspense } from "react";
import { EquationSolverClient } from "./EquationSolverClient";

type EquationType = "kinematics" | "force" | "gas";

export function EquationSolverPageUI({ 
  defaultEquation = "kinematics",
  title = "Science Equation Solver | Bypass the Algebra Instantly",
  description = "Free online science equation solver. Bypass the algebra. Enter what you know, and we'll instantly find what you don't for physics and chemistry.",
  canonicalUrl = "https://hilmost-toolbox.hilmost.net/calculators/equation-solver" 
}: { 
  defaultEquation?: EquationType,
  title?: string,
  description?: string,
  canonicalUrl?: string
}) {
  const faqs = [
    {
      question: "How do I use this solver?",
      answer: "Simply select your equation, enter the values you already know into their respective fields, and leave exactly one field blank. The calculator will automatically solve for the missing variable in real time.",
    },
    {
      question: "Can I share a specific solved equation with my classmates?",
      answer: "Yes! The entire state of the equation, including the values you've entered and the resulting answer, is synchronized with the URL. Click the share button to copy the link and send it to anyone.",
    },
    {
      question: "Which equations are currently supported?",
      answer: "Currently, we support core foundational equations: 1D Kinematics (v = u + at), Newton's Second Law of Motion (F = ma), and the Ideal Gas Law (PV = nRT). We are continuously expanding our library based on user feedback.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <WebApplicationSchema name={title.split(" | ")[0] + " | Hilmost"} description={description} url={canonicalUrl} />
      <FAQSchema items={faqs} />
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {title.split(' | ')[0].split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} className="text-blue-500">{word}</span> : word + ' '
          )}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {description.split('.')[0]}. {description.split('.')[1]}.
        </p>
      </div>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl max-w-2xl mx-auto w-full"></div>}>
        <div className="max-w-4xl mx-auto">
          <EquationSolverClient defaultEquation={defaultEquation} />
        </div>
      </Suspense>

      <ToolArticle title="The End of Algebraic Frustration">
        <p>
          Whether you are balancing physics equations late at night or double-checking chemistry homework, algebraically rearranging formulas to isolate a specific variable is tedious and prone to human error. Our Science Equation Solver is designed to completely eliminate that step.
        </p>
        
        <h3>How to Use This Tool</h3>
        
        <ol>
          <li><strong>Step 1: Choose Formula</strong> - Select the physics or algebraic formula you want to solve.</li>
          <li><strong>Step 2: Input Variables</strong> - Enter the known values into the respective fields. Leave the target variable blank.</li>
          <li><strong>Step 3: Solve</strong> - The tool will automatically isolate and calculate the missing variable.</li>
        </ol>
      </ToolArticle>

      <FAQAccordion items={faqs} />
      <RelatedTools category="calculators" currentPath={canonicalUrl.replace("https://hilmost-toolbox.hilmost.net", "")} />
    </div>
  );
}
