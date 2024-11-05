import { HomePage } from "@/components/home-page";
import LandingPage from "@/components/landing-page";

const WAIT_LIST = process.env.WAIT_LIST;

export default function Home() {
  if (WAIT_LIST === "true") {
    return <LandingPage />;
  }

  return <HomePage />;
}
