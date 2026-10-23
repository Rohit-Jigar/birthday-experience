import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Playfair_Display } from "next/font/google";
import { AudioProvider } from "@/context/audio-context";
import { birthdayConfig } from "@/config/birthday";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Happy Birthday, ${birthdayConfig.recipientName}`,
  description: birthdayConfig.subtitle,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${cinzel.variable} ${playfair.variable}`}
    >
      <body className="bg-background text-textPrimary antialiased selection:bg-champagne-300/30 selection:text-champagne-100 min-h-screen overflow-x-hidden">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
