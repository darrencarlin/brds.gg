"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading } from "@/store/slices/app";
import { useMutation } from "convex/react";
import { Delete } from "lucide-react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";

interface Props {
  id: string;
}

export const RemoveGameButton = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state) => state.sessions);
  const deleteGame = useMutation(api.game.deleteGame);
  const deleteSessionMutation = useMutation(api.sessions.deleteSessionMutation);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this game? This will delete all sessions related to this game and cannot be undone."
    );

    if (!confirm) return;

    try {
      // Prevent multiple simultaneous delete attempts
      if (isDeleting) return;

      setIsDeleting(true);
      dispatch(setLoading(true));

      // Delete the game first
      await deleteGame({ id });

      // Find and delete related sessions
      const sessionsToDelete = sessions
        .filter((session) => session.gameId === id)
        .map((session) => session.id);

      // Use Promise.all for parallel deletion of sessions
      await Promise.all(
        sessionsToDelete.map((sessionId) => {
          if (sessionId) {
            return deleteSessionMutation({ id: sessionId });
          }
        })
      );

      // Optional: You might want to add additional success handling here
      // For example, showing a toast notification or updating UI
    } catch (error) {
      // Error handling
      console.error("Failed to delete game and sessions:", error);
      // Optionally show an error notification to the user
      alert("Failed to delete the game. Please try again.");
    } finally {
      // Ensure loading state is always reset
      dispatch(setLoading(false));
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full uppercase font-medium"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
      <Delete size={32} className="ml-2" />
    </Button>
  );
};
