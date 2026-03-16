import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0D0D12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Hindu Veerashaiva Lingayat Entrepreneur Forum",
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
    title: "Hindu Veerashaiva Lingayat Entrepreneur Forum",
    description:
      "Connect with verified Veerashaiva Lingayat professionals. List your business and grow your community network.",
    url: "https://basavaantahprerna.in",
    siteName: "Basava Antah Prerna",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon-v2.png",
    apple: "/favicon-v2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="antialiased bg-obsidian text-ivory">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
