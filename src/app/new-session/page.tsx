import { ContinueButton } from "@/components/continue-button";
import { Library } from "@/components/library";
import { Search } from "@/components/search";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function NewSession() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="relative grid grid-rows-[auto_auto_1fr_auto] min-h-screen w-full text-white p-4">
      <Library />
      <Search />
      <ContinueButton />
    </div>
  );
}
