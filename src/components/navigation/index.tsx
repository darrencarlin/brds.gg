import Link from "next/link";
import { ProfileButton } from "./profile-button";
import { SessionButton } from "./session-button";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

export const Navigation = async () => {
  return (
    <nav className="p-4 flex items-center justify-between">
      <Link href="/" className="font-black text-white text-xl md:text-3xl">
        BRDS.gg
      </Link>

      <div className="flex items-center gap-4">
        <ProfileButton />
        <SignInButton />
        <SessionButton />
        <SignOutButton />
      </div>
    </nav>
  );
};
