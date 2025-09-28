import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile.css";
import Taskbar from "../components/Taskbar";
import MobileBottomNav from "../components/MobileBottomNav";
import { InstallPrompt } from "../components/InstallPrompt";
import { Providers } from "./providers";
import PocBar from "../components/PocBar";
import DevSidebar from "../components/DevSidebarWorking";
import Footer from "../components/Footer";
import BitcoinOSProvider from "../components/BitcoinOSProvider";
import ConditionalNav from "../components/ConditionalNav";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Bitcoin Email - The Bitcoin Corporation LTD",
  description: "The world's first open-source, blockchain-powered email client. Built by The Bitcoin Corporation LTD (UK Company No. 16735102).",
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
        <ServiceWorkerRegistration />
        <Providers>
          <BitcoinOSProvider>
            <ConditionalNav />
            <Taskbar />
            <PocBar color="#ff3333" />
            <DevSidebar />
            <div className="pt-[70px] md:pt-[70px] mobile-content-wrapper dev-sidebar-content min-h-screen">
              {children}
              <Footer />
            </div>
            <MobileBottomNav />
            <InstallPrompt />
          </BitcoinOSProvider>
        </Providers>
      </body>
    </html>
  );
}
