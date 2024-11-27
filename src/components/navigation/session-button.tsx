"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedGame, setSelectedRawgGame } from "@/store/slices/app";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const SessionButton = () => {
  const pathname = usePathname();
  const { user: session } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id, finished } = useAppSelector((state) => state.session);

  if (pathname.includes("/session")) {
    return null;
  }

  if (finished === true || finished === undefined) {
    return (
      <Button
        onClick={() => {
          if (!session) {
            router.push("/sign-in");
            return;
          }
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
  }

  return (
    <Button
      onClick={() => {
        router.push(`/session/${id}`);
        // Reset the selected game before creating a new session
        dispatch(setSelectedGame(null));
        dispatch(setSelectedRawgGame(null));
      }}
      className="font-black bg-rose-500 hover:bg-rose-900 text-white p-2 rounded transition-colors duration-300 uppercase"
    >
      Continue Session
    </Button>
  );
};
