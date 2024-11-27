"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading } from "@/store/slices/app";
import { clearFields } from "@/store/slices/game";
import { Game } from "@/types";
import { useMutation } from "convex/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../convex/_generated/api";
import { NewFieldsModal } from "./modals/new-fields-modal";
import { Button } from "./ui/button";

export const ContinueButton = () => {
  const router = useRouter();
  const { user: session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const createSession = useMutation(api.sessions.createSession);
  const [modal, setModal] = useState(false);
  const { selectedGame, selectedRawgGame, isLoading } = useAppSelector(
    (state) => state.app
  );

  const handleContinueClick = async () => {
    dispatch(setLoading(true));
    dispatch(clearFields());

    if (!selectedGame && !selectedRawgGame) {
      return;
    }

    // Check if the selected game is new, if so add it to the user's library
    const isNewGame = Boolean(selectedRawgGame && !selectedGame);

    if (isNewGame) {
      // Prompt to add fields

      setModal(true);

      return;
    }

    const userEmail = session?.email;

    if (!userEmail) {
      return;
    }

    if (!selectedGame) {
      return;
    }

    // Create a new session
    const id = uuidv4();

    const game: Game = {
      image: selectedGame.image,
      id: selectedGame.id,
      user: userEmail,
      name: selectedGame.name,
      indicator: selectedGame.indicator,
      fields: selectedGame.fields,
    };

    const data = {
      id,
      gameId: selectedGame.id,
      game,
      players: [],
      round: 1,
      rounds: [],
      user: userEmail,
      finished: false,
      completedTime: "",
    };

    await createSession(data);

    dispatch(setLoading(false));

    router.push(`/session/${id}`);
  };

  if (!selectedGame && !selectedRawgGame) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        className="bg-neutral-100 hover:bg-neutral-300 text-neutral-950"
        onClick={handleContinueClick}
      >
        {isLoading
          ? "Loading..."
          : `Continue with ${selectedGame?.name ?? selectedRawgGame?.name}`}
      </Button>

      <NewFieldsModal open={modal} onOpenChange={setModal} />
    </div>
  );
};
