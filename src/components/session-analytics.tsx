"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  cn,
  convertSlugToTitle,
  getFullDate,
  getReadableDate,
} from "@/lib/utils";
import { Sessions } from "@/types";
import { Bar, BarChart, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

interface Props {
  sessions?: Sessions;
}

export const SessionAnalytics = ({ sessions }: Props) => {
  if (!sessions) return null;

  const uniquePlayers = [
    ...new Set(
      sessions?.flatMap((session) =>
        session.players.map((player) => player.name)
      )
    ),
  ];

  const totalRounds = sessions?.reduce(
    (acc, session) => acc + session.round,
    0
  );

  const allRoundsScores = sessions?.flatMap((session) => {
    const scores = session.players.flatMap((player) => player.score);
    return scores;
  });

  const totalScores = allRoundsScores?.reduce(
    (acc: { [key: string]: number }, { name, score }) => {
      return {
        ...acc,
        [name]: (acc[name] || 0) + score,
      };
    },
    {}
  );

  const gameSessionCounts = sessions.reduce(
    (
      counts: { [key: string]: { sessions: number; totalRounds: number } },
      game
    ) => {
      const gameName = game.game.name;

      if (!counts[gameName]) {
        counts[gameName] = {
          sessions: 0,
          totalRounds: 0,
        };
      }

      counts[gameName].sessions++;
      counts[gameName].totalRounds += game.round;

      return counts;
    },
    {}
  );

  const totalScoresData = Object.entries(totalScores || {}).map(
    ([name, score]) => ({
      name: convertSlugToTitle(name),
      score,
    })
  );

  const gameSessionData = Object.entries(gameSessionCounts).map(
    ([name, { sessions }]) => ({
      name: convertSlugToTitle(name),
      sessions,
    })
  );

  const dates = sessions.map((session) => getFullDate(session._creationTime));

  const dateCounts = dates.reduce((acc: { [key: string]: number }, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[53] grid-rows-7">
            {Object.entries(dateCounts).map(([date, count]) => {
              const classname = cn("w-3 h-3 rounded bg-neutral-950", {
                "bg-green-300": count < 3,
                "bg-green-400": count >= 3 && count < 6,
                "bg-green-500": count >= 6,
              });

              return (
                <TooltipProvider key={date}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className={classname} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">
                        {getReadableDate(date)} - {count} sessions
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Total Sessions & Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-4xl font-bold">{sessions?.length}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{totalRounds}</p>
              <p className="text-sm text-muted-foreground">Total Rounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Unique Players ({uniquePlayers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-2 gap-2">
            {uniquePlayers.map((player) => (
              <li key={player} className="text-sm">
                {convertSlugToTitle(player)}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Total Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: {
                label: "Score",
                color: "hsl(var(--primary-foreground))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={totalScoresData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Game Session Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ChartContainer
            config={{
              sessions: {
                label: "Sessions",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <PieChart width={400} height={300}>
              <Pie
                data={gameSessionData}
                cx={200}
                cy={150}
                outerRadius={100}
                fill="#8884d8"
                dataKey="sessions"
                label={({ name, sessions }) => `${name}: ${sessions}`}
              >
                {gameSessionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900/90 text-white border-neutral-800">
        <CardHeader>
          <CardTitle>Game Session Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(gameSessionCounts).map(
              ([name, { sessions, totalRounds }]) => (
                <li key={name} className="flex justify-between">
                  <span>{convertSlugToTitle(name)}:</span>
                  <span>
                    {sessions} sessions ({totalRounds} rounds)
                  </span>
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
