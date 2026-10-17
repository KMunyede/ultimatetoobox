import type { Metadata } from "next";
import { NOINDEX_APP_SCREEN } from "@/lib/indexing-policy";

export const metadata: Metadata = {
  title: "The Wisdom Library | Daily Wisdom",
  description: "Explore our curated library of stoic and philosophical quotes.",
  ...NOINDEX_APP_SCREEN,
};

export default function LibraryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
