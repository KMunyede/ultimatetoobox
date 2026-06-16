import { Metadata } from "next";
import { PrivacyPolicyContent } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Hilmost Software Corporation",
  description: "Privacy Policy for Hilmost Software Corporation (HSC).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
        <h1>Privacy Policy</h1>
      </div>
      <PrivacyPolicyContent />
    </div>
  );
}
