"use client";

import { useAppDispatch } from "@/store/hooks";
import { setSelectedGame, setSelectedRawgGame } from "@/store/slices/app";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const NewSessionButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <Button
      onClick={() => {
        router.push("/new-session");
        // Reset the selected game before creating a new session
        dispatch(setSelectedGame(null));
        dispatch(setSelectedRawgGame(null));
      }}
      className="font-black bg-rose-500 hover:bg-rose-900 text-white p-2 rounded transition-colors duration-300 uppercase"
    >
      New Session
    </Button>
  );
};
