import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Saans substitute per DESIGN.md: a geometric sans with true 300 + 500 —
// the system is a two-weight conversation, never 600/700.
const saans = Inter({
  variable: "--font-saans",
  subsets: ["latin"],
  weight: ["300", "500"],
});

const saansMono = JetBrains_Mono({
  variable: "--font-saans-mono",
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "Vigilant Asia | Enterprise Mobile Threat Defense",
  description:
    "Protect your enterprise iOS, Android & ChromeOS devices from advanced mobile threats with Vigilant Asia Mobile Threat Defense: on-device AI, offline protection, privacy-first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${saans.variable} ${saansMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
