import { HomePage } from "@/components/home-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BRDS.gg",
  description:
    "BRDS.gg is a website for tracking your gaming sessions and competing with friends via real-time leaderboards.",
  keywords: "gaming, sessions, tracking, friends, competition, leaderboards",
};

export default function Home() {
  return <HomePage />;
}
