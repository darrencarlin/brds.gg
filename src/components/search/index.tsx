"use client";

import { useGames } from "@/hooks/use-games";
import { useState } from "react";
import { Title } from "../title";
import { GameSearchResults } from "./game-search-results";
import { SearchForm } from "./search-form";

export const Search = () => {
  const [search, setSearch] = useState("");

  const { isLoading, data } = useGames(search);

  return (
    <div className="mb-4">
      <Title>Play something new</Title>
      <SearchForm search={search} setSearch={setSearch} />
      <GameSearchResults results={data} isLoading={isLoading} />
    </div>
  );
};
