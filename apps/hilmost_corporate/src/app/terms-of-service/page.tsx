import { Metadata } from "next";
import { TermsOfServiceContent } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Terms of Service | Hilmost Software Corporation",
  description: "Terms of Service for Hilmost Software Corporation (HSC).",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
        <h1>Terms of Service</h1>
      </div>
      <TermsOfServiceContent />
    </div>
  );
}
