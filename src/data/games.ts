import { BASE_URL } from "@/constants";
import { Game } from "@/types";

import { headers } from "next/headers";

export const getGames = async (): Promise<Game[]> => {
  const response = await fetch(`${BASE_URL}/api/games`, {
    headers: await headers(),
  });
  const { data } = await response.json();
  return data ?? [];
};
