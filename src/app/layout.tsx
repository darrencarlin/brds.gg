import Fathom from "@/components/fathom";
import { Navigation } from "@/components/navigation";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BRDS.gg",
  description: " Track scores and compete with your friends!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#151515",
          backgroundImage:
            "radial-gradient(#2c2c2c 1.4500000000000002px, #151515 1.4500000000000002px)",
          backgroundSize: "29px 29px",
        }}
      >
        <Fathom />
        <ReactQueryProvider>
          <Navigation />
          {children}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
