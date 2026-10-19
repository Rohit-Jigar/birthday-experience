import type { Metadata, Viewport } from "next";
import { AudioProvider } from "@/context/audio-context";
import { birthdayConfig } from "@/config/birthday";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-textPrimary antialiased selection:bg-champagne-300/30 selection:text-champagne-100 min-h-screen overflow-x-hidden">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
