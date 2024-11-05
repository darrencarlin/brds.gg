"use client";

import { useGames } from "@/hooks/use-games";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GameResults } from "./game-results";

export const Search = () => {
  const [search, setSearch] = useState("");

  const { isLoading, data } = useGames(search);

  return (
    <>
      <h2 className="text-4xl font-semibold mb-4">Choose a game</h2>
      <form className="mb-4">
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          className="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
          aria-label="Search for a game"
        />
      </form>

      {isLoading && <p className="text-2xl font-semibold">Loading...</p>}

      <GameResults results={data} />

      <div className="flex justify-end">
        <Button className="bg-neutral-100 hover:bg-neutral-300 text-neutral-950">
          Continue
        </Button>
      </div>
    </>
  );
};
