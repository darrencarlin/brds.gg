import { RawgGame } from "@/types";
import Image from "next/image";
import { shimmer, toBase64 } from "./functions";

interface Props {
  results: RawgGame[] | undefined;
}

export const GameResults = ({ results }: Props) => {
  if (results?.length === 0) {
    return <p className="text-2xl font-semibold">No games found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(192px,1fr))] gap-4 mb-4 h-[calc(100vh-192px)] overflow-y-scroll hide-scrollbar">
      {results?.map((game: RawgGame) => {
        if (!game.background_image) {
          return null;
        }
        return (
          <button key={game.id} className="relative">
            <Image
              src={game.background_image}
              alt={game.name}
              className="w-48 h-64 object-cover rounded-md opacity-80 hover:opacity-100 cursor-pointer"
              width={128}
              height={128}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              quality={100}
            />
            <p className="absolute left-2 bottom-2 text-2xl font-semibold">
              {game.name}
            </p>
          </button>
        );
      })}
    </div>
  );
};
