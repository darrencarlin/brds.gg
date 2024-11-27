"use client";

import { useAppSelector } from "@/store/hooks";

export const GameLeaderboardDetails = () => {
  const { game, round } = useAppSelector((state) => state.session);

  if (!game) return null;

  return (
    <div className="flex justify-between mb-4">
      <h1 className="font-bold text-lg">{game.name}</h1>{" "}
      <p className="font-bold text-lg">Round: {round}</p>
    </div>
  );
};
