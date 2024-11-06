"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedGame, setSelectedRawgGame } from "@/store/slices/app";
import { RawgGame } from "@/types";
import { shimmer, toBase64 } from "@/utils/functions";
import Image from "next/image";
import { GridWrapper } from "../grid-wrapper";

interface Props {
  results: RawgGame[] | undefined;
  isLoading: boolean;
}

export const GameSearchResults = ({ results, isLoading }: Props) => {
  const dispatch = useAppDispatch();

  const { selectedRawgGame } = useAppSelector((state) => state.app);

  if (results?.length === 0) {
    return <p className="text-2xl font-semibold">No games found</p>;
  }

  if (isLoading) {
    return <p className="text-2xl font-semibold">Loading...</p>;
  }

  return (
    <GridWrapper>
      {results?.map((game: RawgGame) => {
        if (!game.background_image) {
          return null;
        }

        const imageClassname = cn(
          "aspect-[3/4] w-full relative rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-gray-800/10 to-gray-900/20",
          {
            "border-2 border-accent rounded p-1":
              selectedRawgGame?.id === game.id,
          }
        );

        return (
          <button
            key={game.id}
            className="flex flex-col w-full"
            onClick={async () => {
              dispatch(setSelectedRawgGame(game));
              dispatch(setSelectedGame(null));
            }}
          >
            <div className={imageClassname}>
              <div className="absolute inset-0 border border-white/10 rounded-md pointer-events-none z-10" />
              <Image
                src={game.background_image}
                alt={game.name}
                className="object-cover hover:scale-105 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                quality={100}
              />
            </div>
            <div className="flex flex-col flex-grow justify-between w-full">
              <p className="text-xl font-bold my-2">{game.name}</p>
            </div>
          </button>
        );
      })}
    </GridWrapper>
  );
};
