import type { Metadata } from "next";
import { AuthProvider } from "@/components/wisdom/AuthProvider";

export const metadata: Metadata = {
  title: "Daily Wisdom and Wellness | Change you want to see starts within You",
  description: "Your daily companion for Stoic quotes, wellness habits, and private journaling.",
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

