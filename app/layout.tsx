import type { Metadata } from "next";
import "./globals.css";
import Taskbar from "../components/Taskbar";

export const metadata: Metadata = {
  title: "Bitcoin Email - Blockchain-Powered Email Client",
  description: "The world's first open-source, blockchain-powered email client with native Bitcoin payments and end-to-end encryption.",
  icons: {
    icon: '/bitcoin-email-logo.svg',
    apple: '/bitcoin-email-logo.svg',
  },
  openGraph: {
    title: "Bitcoin Email",
    description: "Decentralized Email on the Blockchain",
    images: ['/bitcoin-email-logo.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bitcoin Email",
    description: "Decentralized Email on the Blockchain",
    images: ['/bitcoin-email-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Taskbar />
        <div className="pt-[22px]">
          {children}
        </div>
      </body>
    </html>
  );
}
