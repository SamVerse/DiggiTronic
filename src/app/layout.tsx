import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import GlobalEffects from "@/components/global-effects";
import "./globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Digitronic",
    template: "%s | Digitronic",
  },
  description: "Digitronic marketing and AI solutions.",
  openGraph: {
    title: "Digitronic",
    description: "Digitronic marketing and AI solutions.",
    url: "/",
    siteName: "Digitronic",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digitronic - Marketing and AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitronic",
    description: "Digitronic marketing and AI solutions.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}


