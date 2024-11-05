"use client";

import { RawgGame } from "@/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchGames = async (searchTerm: string): Promise<RawgGame[]> => {
  if (!searchTerm) return [];

  const response = await fetch(
    `/api/search/game?query=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  const { results } = await response.json();

  return results;
};

export function useGames(searchTerm: string, debounceMs = 500) {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, debounceMs]);

  return useQuery<RawgGame[], Error>(
    ["games", debouncedTerm],
    () => fetchGames(debouncedTerm),
    {
      enabled: Boolean(debouncedTerm),
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}
