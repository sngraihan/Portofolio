import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ChatBot from "./components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raihan Andi Saungnaga — AI Engineer Portfolio",
  description:
    "Portfolio of Raihan Andi Saungnaga, an aspiring AI Engineer and fresh graduate from University of Lampung. Explore projects, skills, and get in touch.",
  keywords: [
    "AI Engineer",
    "Portfolio",
    "Raihan Andi Saungnaga",
    "Machine Learning",
    "Next.js",
  ],
  authors: [{ name: "Raihan Andi Saungnaga" }],
  openGraph: {
    title: "Raihan Andi Saungnaga — AI Engineer Portfolio",
    description:
      "Aspiring AI Engineer, fresh graduate from University of Lampung.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Using native Helvetica system fonts defined in CSS now */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
