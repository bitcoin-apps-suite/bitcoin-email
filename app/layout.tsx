import type { Metadata } from "next";
import "./globals.css";
import Taskbar from "../components/Taskbar";

export const metadata: Metadata = {
  title: "Bitcoin Email - Blockchain-Powered Email Client",
  description: "The world's first open-source, blockchain-powered email client with native Bitcoin payments and end-to-end encryption.",
  icons: {
    icon: '/bitcoin-email-icon.jpg',
    apple: '/bitcoin-email-icon.jpg',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <Taskbar />
        <div className="pt-[22px]">
          {children}
        </div>
      </body>
    </html>
  );
}
