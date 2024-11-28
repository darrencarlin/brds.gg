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
import { motion } from "motion/react";
import { Cell, Pie, PieChart } from "recharts";

interface Props {
  sessions?: Sessions;
}

function getBestPlayersByGame(sessions: Sessions) {
  const bestPlayers: {
    [key: string]: { bestPlayer: string | null; bestScore: number };
  } = {};

  sessions.forEach((session) => {
    const gameName = session.game.name;
    const indicator = session.game.indicator;

    // If we haven't processed this game type yet
    if (!bestPlayers[gameName]) {
      bestPlayers[gameName] = {
        bestPlayer: null,
        bestScore: -Infinity,
      };
    }

    // Check each player in the session
    session.players.forEach((player) => {
      // Find the score for the game's key metric
      const playerScore =
        player.score.find((s) => s.name === indicator)?.score || 0;

      // Update best player if this score is higher
      if (playerScore > bestPlayers[gameName].bestScore) {
        bestPlayers[gameName] = {
          bestPlayer: player.name,
          bestScore: playerScore,
        };
      }
    });
  });

  return bestPlayers;
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

  const bestPlayerResults = getBestPlayersByGame(sessions);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="grid gap-6 md:grid-cols-2"
    >
      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[53] grid-rows-7 gap-2">
              {Object.entries(dateCounts).map(([date, count]) => {
                const classname = cn("w-3 h-3 rounded", {
                  "bg-neutral-950": count === 0,
                  "bg-green-300": count < 3,
                  "bg-green-400": count >= 3 && count < 6,
                  "bg-green-500": count >= 6,
                });

                return (
                  <TooltipProvider key={date}>
                    <Tooltip>
                      <TooltipTrigger>
                        <motion.div
                          variants={itemVariants}
                          className={classname}
                        />
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
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Total Sessions & Rounds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <motion.div variants={itemVariants}>
                <p className="text-4xl font-bold">{sessions?.length}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-4xl font-bold">{totalRounds}</p>
                <p className="text-sm text-muted-foreground">Total Rounds</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Unique Players ({uniquePlayers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {uniquePlayers.map((player) => (
                <motion.div
                  key={player}
                  variants={itemVariants}
                  className="px-2 py-1 bg-black rounded"
                >
                  {convertSlugToTitle(player)}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Total Scores</CardTitle>
          </CardHeader>
          <CardContent>
            {totalScoresData.map((data, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex justify-between"
              >
                <span>{data.name}</span>
                <span>{data.score}</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
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
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Game Session Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(gameSessionCounts).map(
                ([name, { sessions, totalRounds }]) => (
                  <motion.li
                    key={name}
                    variants={itemVariants}
                    className="flex justify-between"
                  >
                    <span>{convertSlugToTitle(name)}:</span>
                    <span>
                      {sessions} sessions ({totalRounds} rounds)
                    </span>
                  </motion.li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="bg-neutral-900/90 text-white border-neutral-800">
          <CardHeader>
            <CardTitle>Best Players</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(bestPlayerResults).map(
                ([game, { bestPlayer }]) => (
                  <motion.li
                    key={game}
                    variants={itemVariants}
                    className="flex justify-between"
                  >
                    <span>{convertSlugToTitle(game)}:</span>
                    <span>
                      {convertSlugToTitle(bestPlayer || "Unknown Player")}
                    </span>
                  </motion.li>
                )
              )}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
