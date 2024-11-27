"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppSelector } from "@/store/hooks";
import { useMutation } from "convex/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const NewPlayerDialog = () => {
  const [dialog, setDialog] = useState(false);
  const [name, setName] = useState("");
  const { id, game } = useAppSelector((state) => state.session);
  const addPlayerMutation = useMutation(api.sessions.addPlayerMutation);

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (!player) {
      setDialog(true);
      return;
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;
    if (!game) return;
    if (!id) return;

    const playerId = uuidv4();

    const player = {
      name,
      id: playerId,
      score: game.fields.map((field) => ({ name: field.name, score: 0 })),
    };

    await addPlayerMutation({
      id: id,
      player,
    });

    localStorage.setItem("player", JSON.stringify({ id: playerId, name }));

    setName("");
    setDialog(false);
  };

  return (
    <Dialog open={dialog} onOpenChange={setDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Session</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label className="mb-2 text-lg" htmlFor="name">
              Name
            </Label>
            <Input
              className="rounded border-neutral-700"
              name="name"
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
              }}
            />
          </div>

          <Button>Join</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
