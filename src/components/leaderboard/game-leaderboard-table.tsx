"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Icon } from "@/components/icon";
import { cn, countRoundsPlayedByPlayer, sortPlayers } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Gamepad2 } from "lucide-react";
import { Table, TableBody, TableData, TableHead, TableRow } from "../table";

export const GameLeaderboardTable = () => {
  const { game, players, rounds } = useAppSelector((state) => state.session);
  const { player } = useAppSelector((state) => state.app);

  if (!game || !players || !rounds) return null;

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead className="border-r border-neutral-700 text-lg w-10">
            #
          </TableHead>
          <TableHead className="border-r border-neutral-700 text-left text-lg min-w-[250px]">
            Gamer
          </TableHead>

          {game.fields.map((field, index) => {
            return (
              <TableHead
                key={index}
                className="text-center border-r border-neutral-700"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon name={field.icon} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{field.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            );
          })}

          <TableHead className="border-r border-neutral-700 text-center text-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Gamepad2 />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Games Played</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableHead>
        </TableRow>

        {sortPlayers({ players, game, ascending: true }).map((p, index) => {
          const classname = cn("bg-neutral-900 hover:bg-neutral-950", {
            "bg-neutral-800": p.name === player?.name,
          });

          const positionClassname = cn(
            "font-bold border-t border-r border-neutral-700 text-lg w-10 text-center"
          );

          return (
            <TableRow key={p.id} className={classname}>
              <TableData className={positionClassname}>{index + 1}</TableData>
              <TableData className="border-t border-r border-neutral-700 text-lg">
                {p.name}
              </TableData>
              {p.score.map((score, index) => {
                return (
                  <TableData
                    key={index}
                    className="text-center border-t border-r border-neutral-700 text-lg"
                  >
                    {score.score}
                  </TableData>
                );
              })}
              <TableData className="text-center border-t border-r border-neutral-700 text-lg">
                {countRoundsPlayedByPlayer(rounds, p)}
              </TableData>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
