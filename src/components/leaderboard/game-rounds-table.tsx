"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Table } from "@/components/table/table";
import { TableBody } from "@/components/table/table-body";
import { TableData } from "@/components/table/table-data";
import { TableHead } from "@/components/table/table-head";
import { TableRow } from "@/components/table/table-row";

import { Icon } from "@/components/icon";
import { sortRounds } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

export const GameRoundsTable = () => {
  const { game, rounds } = useAppSelector((state) => state.session);

  if (!game || !rounds) return null;

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
        </TableRow>
        {sortRounds({ rounds, ascending: true }).map(
          ({ round, player, score }, index) => {
            if (score[0].score === -1) {
              return null;
            }

            return (
              <TableRow key={index}>
                <TableData className="font-bold border-t border-r border-neutral-700 text-lg w-10 text-center">
                  {round}
                </TableData>
                <TableData className="border-t border-r border-neutral-700 text-lg">
                  {player}
                </TableData>
                {score.map((score, index) => {
                  return (
                    <TableData
                      key={index}
                      className="text-center border-t border-r border-neutral-700 text-lg"
                    >
                      {score.score}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};
