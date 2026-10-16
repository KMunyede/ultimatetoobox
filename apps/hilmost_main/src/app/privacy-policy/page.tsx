import { Metadata } from "next";
import { PrivacyPolicyContent } from "@utilitiessite/ui";
import { GamesPrivacySection } from "./GamesPrivacySection";

import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta("/privacy-policy", "Privacy Policy | Hilmost", "How Hilmost Software Corporation collects, uses, and protects your information across our tools and services."),
  alternates: { canonical: "https://hilmost.net/privacy-policy" },
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PrivacyPolicyContent />
      <GamesPrivacySection />
    </div>
  );
}
