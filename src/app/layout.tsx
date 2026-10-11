import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StepSnap — Turn Screenshots Into Step-by-Step Guides | Free Scribe Alternative",
  description: "Create professional PDF guides and shareable web documentation from screenshots. Free alternative to Scribe with zero watermarks and privacy-first local processing.",
  keywords: ["StepSnap", "Scribe alternative", "documentation generator", "screenshot to guide", "PDF guide builder", "how-to guides"],
  authors: [{ name: "StepSnap Team" }],
  openGraph: {
    title: "StepSnap — Free Scribe Alternative",
    description: "Turn Screenshots Into Step-by-Step Guides. Fast, free PDF exports and shareable guides.",
    siteName: "StepSnap",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StepSnap — Turn Screenshots Into Step-by-Step Guides",
    description: "Free alternative to paid documentation tools. Download publication-ready PDFs in seconds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100">
        {children}
      </body>
    </html>
  );
}