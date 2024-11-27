import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";
import { useMutation } from "convex/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";

export const GameLeaderboardUpdate = () => {
  const {
    game,
    id: sessionId,
    round,
    user,
    finished,
  } = useAppSelector((state) => state.session);
  const { user: session } = useAppSelector((state) => state.auth);
  const addRoundMutation = useMutation(api.sessions.addRoundMutation);
  const updateTotalMutation = useMutation(api.sessions.updateTotalMutation);
  const endSessionMutation = useMutation(api.sessions.endSessionMutation);
  const [update, setUpdate] = useState<{ name: string; score: number }[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!game) return;

    const player = localStorage.getItem("player");

    if (!player) return;

    const playerId = JSON.parse(player).id;
    const playerName = JSON.parse(player).name;

    const initialFields = game.fields.map((field) => {
      return { name: field.name, score: 0 };
    });

    const parsedFields = initialFields.map((field) => {
      return {
        ...field,
        score: update.find((u) => u.name === field.name)?.score ?? 0,
      };
    });

    await addRoundMutation({
      id: sessionId as string,
      round: { round, player: playerName, score: [...parsedFields] },
    });

    await updateTotalMutation({
      id: sessionId as string,
      player: {
        id: playerId,
        name: playerName,
        score: parsedFields,
      },
    });

    // Reset
    setUpdate([]);
  };

  const handleSkipRound = async () => {
    const player = localStorage.getItem("player");

    if (!player || !game) return;

    const playerName = JSON.parse(player).name;

    // Initialize fields, set all to 0
    const initialFields = game.fields.map((field) => {
      return { name: field.name, score: 0 };
    });

    const parsedFields = initialFields.map((field) => {
      return {
        ...field,
        score: -1,
      };
    });

    await addRoundMutation({
      id: sessionId as string,
      round: { round, player: playerName, score: [...parsedFields] },
    });
  };

  const handleEndSession = async () => {
    await endSessionMutation({ id: sessionId as string });
  };

  if (!game) return null;
  if (finished) {
    return (
      <div className="p-6 rounded-lg bg-neutral-950">
        <p className="text-lg">Session has ended.</p>
      </div>
    );
  }

  const isOwner = session?.email != null && session?.email === user;

  return (
    <form
      className="flex flex-col gap-4 p-6 rounded-lg bg-neutral-950"
      onSubmit={handleSubmit}
    >
      {game.fields.map((field) => {
        return (
          <div key={field.name} className="flex flex-col">
            <Label className="mb-2 text-lg" htmlFor={field.name}>
              {field.title}
            </Label>
            <Input
              className="rounded border-neutral-700"
              name={field.name}
              type="text"
              value={update.find((u) => u.name === field.name)?.score ?? 0}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const score = Number(e.target.value);
                setUpdate((prev) => {
                  const index = prev.findIndex((u) => u.name === field.name);
                  if (index === -1) {
                    return [...prev, { name: field.name, score }];
                  }
                  return prev.map((u) =>
                    u.name === field.name ? { name: field.name, score } : u
                  );
                });
              }}
            />
          </div>
        );
      })}
      <div className="flex gap-4">
        {!finished && <Button>Submit</Button>}
        {!finished && (
          <Button type="button" onClick={handleSkipRound}>
            Skip Round
          </Button>
        )}
        {isOwner && (
          <Button type="button" onClick={handleEndSession}>
            End Session
          </Button>
        )}
      </div>
    </form>
  );
};
