import type { Metadata } from "next";
import { AuthProvider } from "@/components/wisdom/AuthProvider";
import { LAYOUT_TITLE } from "./daily-virtue-content";

export const metadata: Metadata = {
  title: LAYOUT_TITLE,
  description: "Your daily companion for Stoic quotes and private journaling.",
};

export default function DailyWisdomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

