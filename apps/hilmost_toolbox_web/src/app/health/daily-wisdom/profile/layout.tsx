import type { Metadata } from "next";
import { NOINDEX_APP_SCREEN } from "@/lib/indexing-policy";

export const metadata: Metadata = {
  title: "Your Journey | Daily Wisdom",
  description: "Track your progress, manage your account, and see how far you've come.",
  ...NOINDEX_APP_SCREEN,
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
