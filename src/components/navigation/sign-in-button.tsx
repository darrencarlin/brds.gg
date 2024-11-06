import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "../ui/button";

export const SignInButton = async () => {
  const session = await auth();

  if (session?.user) {
    return null;
  }

  return (
    <Button
      asChild
      className="font-black bg-neutral-100 hover:bg-neutral-300 text-black p-2 rounded transition-colors duration-300 uppercase"
    >
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};
