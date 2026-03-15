import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SessionProvider from "@/components/auth/SessionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Basava Antah Prerna — Veerashaiva Lingayat Business Directory",
    template: "%s | Basava Antah Prerna",
  },
  description:
    "Connect with verified Veerashaiva Lingayat professionals — lawyers, doctors, engineers, artisans and more. List your business and grow your community network.",
  keywords: [
    "Veerashaiva",
    "Lingayat",
    "business directory",
    "community",
    "professionals",
    "Basavanna",
  ],
  metadataBase: new URL("https://basavaantahprerna.in"),
  openGraph: {
    title: "Basava Antah Prerna — Veerashaiva Lingayat Business Directory",
    description:
      "Connect with verified Veerashaiva Lingayat professionals. List your business and grow your community network.",
    url: "https://basavaantahprerna.in",
    siteName: "Basava Antah Prerna",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
