import type { Metadata } from "next";
import { Geist, Geist_Mono, Black_Ops_One, Domine, Montserrat, Jost } from "next/font/google";
import localFont from "next/font/local";
import BackgroundMusic from "@/components/BackgroundMusic";
import Loader from "@/components/Loader";
import SideNav from "@/components/SideNav";
import DoomCursor from "@/components/DoomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { BackgroundProvider } from "@/components/BackgroundContext";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-black-ops-one",
  weight: "400",
  subsets: ["latin"],
});

const domine = Domine({
  variable: "--font-domine",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
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
      className={`${geistSans.variable} ${geistMono.variable} ${avenger.variable} ${blackOpsOne.variable} ${domine.variable} ${montserrat.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <BackgroundProvider>
          <Loader />
          <SideNav />
          <SmoothScroll>{children}</SmoothScroll>
          <BackgroundMusic />
          <DoomCursor />
        </BackgroundProvider>
      </body>
    </html>
  );
}
