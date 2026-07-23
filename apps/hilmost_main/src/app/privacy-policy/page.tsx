import { Metadata } from "next";
import { PrivacyPolicyContent } from "@utilitiessite/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Hilmost",
  description: "How Hilmost Software Corporation collects, uses, and protects your information across our tools and services.",
};

export default function Page() { return <PrivacyPolicyContent />; }
