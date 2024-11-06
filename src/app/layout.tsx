import Fathom from "@/components/fathom";
import LandingPage from "@/components/landing-page";
import { Navigation } from "@/components/navigation";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/store/provider";
import { AppState } from "@/store/slices/app";
import type { Metadata } from "next";
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

const getAppState = async (): Promise<AppState> => {
  return {
    isLoading: false,
    selectedRawgGame: null,
    selectedGame: null,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appState = await getAppState();

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
          <LandingPage />
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <StoreProvider appState={appState}>
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
      </StoreProvider>
    </html>
  );
}
