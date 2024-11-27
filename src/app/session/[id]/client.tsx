"use client";

import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { NewPlayerDialog } from "@/components/new-player-dialog";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/app";
import { setPlayer } from "@/store/slices/player";
import { updateSession } from "@/store/slices/session";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";

export default function HomePageClient({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const session = useQuery(api.sessions.getSession, { id });

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      if (session) {
        dispatch(updateSession(session));

        if (session.finished) {
          localStorage.removeItem("player");
          return;
        }

        const player = localStorage.getItem("player");

        // Player exists in local storage, lets populate the store, leaderboard
        if (player) {
          dispatch(
            setPlayer({
              ...JSON.parse(player),
            })
          );
        }
      }
      dispatch(setLoading(false));
    };

    init();
  }, [session, dispatch]);

  return (
    <>
      <main className="flex justify-center items-center min-h-[calc(100vh-68px)] text-white p-4">
        {session && !session.finished && <NewPlayerDialog />}
        <LeaderboardTable />
      </main>
    </>
  );
}
