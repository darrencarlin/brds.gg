"use client";

import { removeGame } from "@/actions/game";
import { Delete } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  id: string;
}

export const RemoveGameButton = ({ id }: Props) => {
  return (
    <Button
      variant="destructive"
      className="w-full uppercase font-medium "
      onClick={async () => {
        const { success, message } = await removeGame(id);

        console.log({ success, message });
      }}
    >
      Delete <Delete size={32} />
    </Button>
  );
};
