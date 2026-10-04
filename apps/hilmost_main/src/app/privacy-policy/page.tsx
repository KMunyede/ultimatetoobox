import { Metadata } from "next";
import { PrivacyPolicyContent } from "@utilitiessite/ui";
import { GamesPrivacySection } from "./GamesPrivacySection";

export const metadata: Metadata = {
  alternates: { canonical: "https://hilmost.net/privacy-policy" },
  title: "Privacy Policy | Hilmost",
  description: "How Hilmost Software Corporation collects, uses, and protects your information across our tools and services.",
  openGraph: {
    title: "Privacy Policy | Hilmost",
    description: "How Hilmost Software Corporation collects, uses, and protects your information across our tools and services.",
  },
  twitter: {
    title: "Privacy Policy | Hilmost",
    description: "How Hilmost Software Corporation collects, uses, and protects your information across our tools and services.",
  },
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PrivacyPolicyContent />
      <GamesPrivacySection />
    </div>
  );
}
