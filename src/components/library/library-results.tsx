"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedGame, setSelectedRawgGame } from "@/store/slices/app";
import { shimmer, toBase64 } from "@/utils/functions";

import { Game } from "@/types";
import { useQuery } from "convex/react";

import Image from "next/image";
import { api } from "../../../convex/_generated/api";
import { GridWrapper } from "../grid-wrapper";
import { RemoveGameButton } from "../remove-game-button";

interface Props {
  hasDeleteButton: boolean;
}

export const LibraryResults = ({ hasDeleteButton }: Props) => {
  const dispatch = useAppDispatch();

  const { user: session } = useAppSelector((state) => state.auth);

  const games = useQuery(api.game.getGames, { email: session?.email ?? "" });

  const { selectedGame } = useAppSelector((state) => state.app);

  if (games?.length === 0) {
    return <p className="text-2xl font-semibold">No games found</p>;
  }

  return (
    <GridWrapper>
      {games?.map((game: Game) => {
        if (!game.image) {
          return null;
        }

        const imageClassname = cn(
          "aspect-[3/4] w-full relative rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-gray-800/10 to-gray-900/20",
          {
            "border-2 border-accent rounded p-1": selectedGame?.id === game.id,
          }
        );

        return (
          <div key={game.id} className="flex flex-col justify-between w-full">
            <button
              onClick={async () => {
                dispatch(setSelectedGame(game));
                dispatch(setSelectedRawgGame(null));
              }}
              className="flex flex-col w-full"
            >
              <div className={imageClassname}>
                <div className="absolute inset-0 border border-white/10 rounded-md pointer-events-none z-10" />
                <Image
                  src={game.image}
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
            {hasDeleteButton && <RemoveGameButton id={game.id} />}
          </div>
        );
      })}
    </GridWrapper>
  );
};
