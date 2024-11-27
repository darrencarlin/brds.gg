import { convertSlugToTitle } from "@/lib/utils";
import { Sessions } from "@/types";

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

  return (
    <section>
      <h3 className="mb-4 text-2xl font-bold">Total Sessions</h3>
      <p className="mb-4">{sessions?.length}</p>
      <h3 className="mb-4 text-2xl font-bold">Total Rounds</h3>
      <p className="mb-4">{totalRounds}</p>
      <h3 className="mb-4 text-2xl font-bold">
        Unique Players ({uniquePlayers.length})
      </h3>
      <ul className="flex flex-col mb-4">
        {uniquePlayers.map((player) => (
          <li key={player}>{player}</li>
        ))}
      </ul>
      <h3 className="mb-4 text-2xl font-bold">Total Scores</h3>
      <ul className="flex flex-col mb-4">
        {Object.entries(totalScores || {}).map(([name, score]) => (
          <li key={name}>
            {convertSlugToTitle(name)}: {score}
          </li>
        ))}
      </ul>
      <h3 className="mb-4 text-2xl font-bold">Game Session Counts</h3>
      <ul className="flex flex-col mb-4">
        {Object.entries(gameSessionCounts).map(
          ([name, { sessions, totalRounds }]) => (
            <li key={name}>
              {convertSlugToTitle(name)}: {sessions} sessions, ({totalRounds}{" "}
              rounds)
            </li>
          )
        )}
      </ul>
    </section>
  );
};
