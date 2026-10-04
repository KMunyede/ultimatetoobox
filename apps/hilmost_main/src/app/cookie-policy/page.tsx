import { Metadata } from "next";
import { CookiePolicyContent } from "@utilitiessite/ui";

export const metadata: Metadata = {
  alternates: { canonical: "https://hilmost.net/cookie-policy" },
  title: "Cookie Policy | Hilmost",
  description: "How Hilmost uses cookies for preferences, analytics, and advertising.",
  openGraph: {
    title: "Cookie Policy | Hilmost",
    description: "How Hilmost uses cookies for preferences, analytics, and advertising.",
  },
  twitter: {
    title: "Cookie Policy | Hilmost",
    description: "How Hilmost uses cookies for preferences, analytics, and advertising.",
  },
};

export default function Page() { return <CookiePolicyContent />; }
