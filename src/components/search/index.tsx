"use client";

import { useGames } from "@/hooks/use-games";
import { useAppSelector } from "@/store/hooks";
import { Title } from "../title";
import { GameSearchResults } from "./game-search-results";
import { SearchForm } from "./search-form";

export const Search = () => {
  const { search } = useAppSelector((state) => state.app);
  const { isLoading, data } = useGames(search);

  return (
    <div className="mb-4">
      <Title>Play something new</Title>
      <SearchForm />
      <GameSearchResults results={data} isLoading={isLoading} />
    </div>
  );
};
