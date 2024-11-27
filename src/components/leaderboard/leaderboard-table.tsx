import { GameLeaderboardTable } from "./game-leaderboard-table";
import { GameRoundsDetails } from "./game-round-details";
import { GameRoundsTable } from "./game-rounds-table";
import { GameLeaderboardDetails } from "./leaderboard-details";
import { GameLeaderboardUpdate } from "./leaderboard-update";

export const LeaderboardTable = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      <div className="grid grid-cols-1 gap-8 w-full">
        <div className="p-6 rounded-lg bg-neutral-950">
          <GameLeaderboardDetails />
          <GameLeaderboardTable />
        </div>
        <GameLeaderboardUpdate />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="p-6 rounded-lg bg-neutral-950">
          <GameRoundsDetails />
          <GameRoundsTable />
        </div>
      </div>
    </div>
  );
};
