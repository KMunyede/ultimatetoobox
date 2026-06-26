import { EditorialPolicyContent } from "@utilitiessite/ui";
import { Metadata } from "next";
import { formatTitle } from "@/lib/metadata";

export const metadata: Metadata = {
  title: formatTitle("Editorial & Accuracy Policy"),
  description: "Learn about the banking-grade engineering, expert review process, and mathematical precision behind Hilmost tools.",
  alternates: {
    canonical: "/editorial-policy",
  }
};

export default function EditorialPolicyPage() {
  return <EditorialPolicyContent />;
}
