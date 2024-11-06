import { auth, signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export const SignOutButton = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="p-2">
        <LogOut />
      </Button>
    </form>
  );
};
