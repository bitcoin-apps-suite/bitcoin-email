import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import Taskbar from "../components/Taskbar";
import MobileBottomNav from "../components/MobileBottomNav";
import { InstallPrompt } from "../components/InstallPrompt";

export const metadata: Metadata = {
  title: "Bitcoin Email - Blockchain-Powered Email Client",
  description: "The world's first open-source, blockchain-powered email client with native Bitcoin payments and end-to-end encryption.",
  metadataBase: new URL('http://localhost:1040'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Bitcoin Email',
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-256.png', sizes: '256x256', type: 'image/png' },
      { url: '/icon-384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Bitcoin Email",
    description: "Decentralized Email on the Blockchain",
    images: ['/bitcoin-email-icon.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bitcoin Email",
    description: "Decentralized Email on the Blockchain",
    images: ['/bitcoin-email-icon.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#ff3333',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <Taskbar />
        <div className="pt-[22px] md:pt-[22px] mobile-content-wrapper">
          {children}
        </div>
        <MobileBottomNav />
        <InstallPrompt />
      </body>
    </html>
  );
}
