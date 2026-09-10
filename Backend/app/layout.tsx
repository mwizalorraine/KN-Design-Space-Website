import type { Metadata } from "next";
import { Schibsted_Grotesk, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-display" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal","italic"], weight: ["400","500"], variable: "--font-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400","500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "KN Design Space — Architecture & Interiors",
  description: "KN Design Space designs houses, workplaces and interiors around how people actually move through them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${serif.variable} ${mono.variable} font-serif`}>
        {children}
      </body>
    </html>
  );
}