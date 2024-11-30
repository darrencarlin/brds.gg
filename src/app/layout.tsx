import Fathom from "@/components/fathom";

import { Auth } from "@/components/auth";
import { ConvexClientProvider } from "@/components/convex-provider";
import { Navigation } from "@/components/navigation";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/store/provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 500 700 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 500 700 900",
});

export const metadata: Metadata = {
  title: "BRDS.gg",
  description: " Track scores and compete with your friends!",
};

const WAIT_LIST = process.env.WAIT_LIST;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (WAIT_LIST === "true") {
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
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <StoreProvider>
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
          <SessionProvider>
            <ConvexClientProvider>
              <ReactQueryProvider>
                <Auth />
                <Navigation />
                {children}
              </ReactQueryProvider>
            </ConvexClientProvider>

            <Toaster />
          </SessionProvider>

          <footer className="flex gap-8 justify-center items-center py-16 text-center text-gray-300 font-bold">
            <div className="flex flex-col text-left">
              <p>Built by Darren: </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/darrenjcarlin"
                className="mt-2 underline"
              >
                Twitter
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.darrencarlin.com/"
                className="mt-2 underline"
              >
                Web
              </a>
            </div>

            <div className="flex flex-col text-left">
              <p>Other stuff I have built:</p>{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.theguinnessmap.com/"
                className="mt-2 underline"
              >
                The Guinness Map
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.wordlediscordbot.com/"
                className="mt-2 underline"
              >
                Wordle Discord Bot
              </a>
            </div>
          </footer>
        </body>
      </StoreProvider>
    </html>
  );
}
