"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading } from "@/store/slices/app";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewFieldsModal } from "./modals/new-fields-modal";
import { Button } from "./ui/button";

export const ContinueButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const { selectedGame, selectedRawgGame, isLoading } = useAppSelector(
    (state) => state.app
  );

  const handleContinueClick = async () => {
    dispatch(setLoading(true));

    if (!selectedGame && !selectedRawgGame) {
      return;
    }

    // Check if the selected game is new, if so add it to the user's library
    const isNewGame = selectedRawgGame && !selectedGame;

    console.log({ isNewGame });

    if (isNewGame) {
      // Prompt to add fields

      setModal(true);

      return;
    }

    console.log("Continue with existing game");

    const session = {
      id: "9233bdcc-edf1-4bc6-a75d-3b8a3aa9386f",
    };

    router.push(`/session/${session.id}`);
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
