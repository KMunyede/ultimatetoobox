import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, Header, Footer } from "@utilitiessite/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hilmost Software Corporation (HSC) | Corporate",
  description: "Official corporate information for Hilmost Software Corporation (HSC)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-canvas-base text-text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
