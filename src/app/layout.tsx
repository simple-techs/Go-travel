import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PwaInstall from "@/components/PwaInstall";

export const metadata: Metadata = {
  title: "GO - Free Stays for Backpackers",
  description: "Spin the globe, find your people, stay for free. The backpacker community platform.",
  applicationName: "GO",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "GO",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050a15",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="pt-16" style={{ paddingTop: "calc(4rem + env(safe-area-inset-top))" }}>{children}</main>
        <PwaInstall />
      </body>
    </html>
  );
}
