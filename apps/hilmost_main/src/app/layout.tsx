import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, Header, Footer } from "@utilitiessite/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hilmost.net'),
  title: "Hilmost | The Digital Workshop. Achievement is One Click Away.",
  description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
  openGraph: {
    title: "Hilmost | The Digital Workshop",
    description: "Hilmost provides powerful, instant web tools and utilities. Achieve maximum results with zero effort today.",
    url: "https://hilmost.net",
    siteName: "Hilmost",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hilmost | The Digital Workshop",
    description: "Hilmost provides powerful, instant web tools and utilities.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-canvas-base text-text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
