"use client";

import { useAppSelector } from "@/store/hooks";

interface Props {
  id: string;
}

export const SessionClient = ({ id }: Props) => {
  const { selectedGame } = useAppSelector((state) => state.app);
  return (
    <div className="flex flex-col justify-center items-center w-full text-white p-4">
      <p>
        <span className="uppercase font-black"> Game</span>:{" "}
        {selectedGame?.name}
      </p>
      <p>
        <span className="uppercase font-black"> Fields</span>:{" "}
        {JSON.stringify(selectedGame?.fields)}
      </p>
      <p>
        <span className="uppercase font-black"> Session ID</span>: {id}
      </p>
    </div>
  );
};
