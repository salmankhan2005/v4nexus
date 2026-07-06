import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import MotionProvider from "@/components/providers/MotionProvider";
import SplashScreen from "@/components/ui/SplashScreen";
import WhatsAppFAB from "@/components/ui/WhatsAppFAB";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V4 Nexus — Web & App Development Studio",
  description:
    "Ship production-grade web apps, mobile applications, and API integrations with a focused dev team. Book a call today.",
  keywords: ["web development", "app development", "Next.js", "React", "API integration", "product design"],
  openGraph: {
    title: "V4 Nexus — Web & App Development Studio",
    description: "Ship production-grade software. Book a call.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="font-body bg-bg-base text-text-primary antialiased">
        <SplashScreen />
        <WhatsAppFAB />
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
