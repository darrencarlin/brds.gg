import { Library } from "@/components/library";
import { UserProfileCard } from "@/components/user-card";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen w-full text-white p-4">
      <UserProfileCard user={session.user} />
      <Library hasDeleteButton={true} />
    </div>
  );
}
