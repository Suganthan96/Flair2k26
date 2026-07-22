import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const avenger = localFont({
  variable: "--font-avenger",
  src: [
    {
      path: "../public/font/AVENGEANCE HEROIC AVENGER.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/AVENGEANCE HEROIC AVENGER BD.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/AVENGEANCE HEROIC AVENGER AT.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/AVENGEANCE HEROIC AVENGER BI.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "FLAIR 2K26 | LICET Technical Symposium",
  description:
    "Flair 2k26 — LICET's flagship technical symposium. Assemble. Innovate. Elevate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // No `scroll-smooth` here — native smooth scrolling fights Lenis.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${avenger.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
