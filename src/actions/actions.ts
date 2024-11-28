"use server";

import { ConvexHttpClient } from "convex/browser";

import { auth } from "@/lib/auth";
import { api } from "../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");

export const deleteAllData = async () => {
  const session = await auth();

  if (!session || !session.user?.email) return;

  await convex.mutation(api.sessions.deleteAllSessionsByUser, {
    id: session.user.email,
  });

  await convex.mutation(api.game.deleteAllGamesByUser, {
    email: session.user.email,
  });
};
