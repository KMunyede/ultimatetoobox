"use client";

import React, { useMemo } from "react";
import { Sparkles, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface DidYouKnowProps {
  category: "finance" | "calculators" | "astrophysics" | "health" | "pdf";
}

const FACTS: Record<string, string[]> = {
  finance: [
    "The number 0 was first used as a placeholder in Babylon, but its modern form as a value was perfected in India around the 5th century.",
    "Albert Einstein reportedly called Compound Interest the 'eighth wonder of the world.'",
    "The first standardized currency was created by King Alyattes of Lydia (modern-day Turkey) around 600 BC.",
    "The word 'Bank' comes from the Italian word 'banco', which means 'bench'—where early money changers conducted their business.",
  ],
  calculators: [
    "The first mechanical calculator, the Pascaline, was invented by Blaise Pascal in 1642 to help his father, a tax collector.",
    "Before electronic calculators, engineers used slide rules—which rely on logarithmic scales—to design everything from airplanes to bridges.",
    "The first hand-held electronic calculator, the Cal-Tech, was developed by Texas Instruments in 1967.",
    "Mathematical precedence (PEMDAS/BODMAS) was developed in the early 1900s to standardize how people read multi-step equations.",
  ],
  astrophysics: [
    "Neutron stars are so dense that a single teaspoon of their matter would weigh about a billion tons on Earth.",
    "The universe is estimated to be approximately 13.8 billion years old, based on the Hubble constant and cosmic background radiation.",
    "Black holes were originally called 'frozen stars' because of the time-dilation effect described by General Relativity.",
    "Voyager 1 is the most distant man-made object, traveling at over 38,000 miles per hour into interstellar space.",
  ],
  health: [
    "The human heart beats approximately 100,000 times a day and pumps about 2,000 gallons of blood.",
    "The BMI scale was developed in the 1830s by a Belgian mathematician, not a doctor, to categorize populations.",
    "Your brain generates enough electricity to power a small lightbulb (about 12-25 watts) while you are awake.",
  ],
  pdf: [
    "PDF stands for Portable Document Format and was created by Adobe in 1991 to ensure documents looked the same on any screen.",
    "The PDF specification was originally a proprietary format but became an open standard (ISO 32000) in 2008.",
    "Unlike a Word document, a PDF preserves the exact layout, fonts, and images of the original file regardless of the hardware.",
  ]
};

/**
 * Interactive Factoid component to increase "Time on Page" and user engagement.
 * Displays a randomized fact from the relevant category.
 */
export function DidYouKnow({ category }: DidYouKnowProps) {
  const categoryFacts = FACTS[category] || FACTS.calculators;

  const fact = useMemo(() => {
    return categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
  }, [categoryFacts]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="my-10 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
        <Sparkles size={48} className="text-brand-primary" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="p-2 bg-brand-primary text-white rounded-lg shrink-0 shadow-md">
          <Lightbulb size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">
            Did you know?
          </h4>
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {fact}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
