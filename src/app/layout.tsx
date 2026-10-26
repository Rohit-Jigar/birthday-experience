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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://rohit-jigar.github.io/birthday-experience");

const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Happy Birthday, ${birthdayConfig.recipientName} ✦ A Special Journey`,
    template: `%s | Birthday Experience`,
  },
  description: birthdayConfig.subtitle,
  applicationName: "Birthday Experience",
  keywords: [
    "Happy Birthday",
    "Birthday Experience",
    "Digital Gift",
    birthdayConfig.recipientName,
  ],
  authors: [{ name: "With Love" }],
  creator: "Birthday Experience",
  publisher: "Birthday Experience",
  alternates: {
    canonical: basePath ? `${basePath}/` : "/",
  },
  openGraph: {
    title: `Happy Birthday, ${birthdayConfig.recipientName} ✦ A Special Journey`,
    description: birthdayConfig.subtitle,
    url: basePath ? `${basePath}/` : "/",
    siteName: "Birthday Experience",
    images: [
      {
        url: `${basePath}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `Happy Birthday, ${birthdayConfig.recipientName} - A Special Journey`,
        type: "image/jpeg",
      },
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Happy Birthday, ${birthdayConfig.recipientName}`,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Happy Birthday, ${birthdayConfig.recipientName} ✦`,
    description: birthdayConfig.subtitle,
    images: [`${basePath}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicon.png`, type: "image/png", sizes: "32x32" },
      { url: `${basePath}/icon-192.png`, type: "image/png", sizes: "192x192" },
      { url: `${basePath}/icon-512.png`, type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    shortcut: `${basePath}/favicon.ico`,
  },
  manifest: `${basePath}/manifest.webmanifest`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: `Birthday • ${birthdayConfig.recipientName}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050507",
  colorScheme: "dark",
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
