import { Game, Player, Players, Rounds } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortPlayers = ({
  players,
  game,
  ascending = false,
}: {
  players: Players;
  game: Game;
  ascending?: boolean;
}) => {
  return [...players].sort((a, b) => {
    const aValue = a.score.find((s) => s.name === game.indicator)?.score;
    const bValue = b.score.find((s) => s.name === game.indicator)?.score;

    if (aValue === undefined || bValue === undefined) {
      return 0;
    }

    // For descending order (default)
    const multiplier = ascending ? 1 : -1;

    if (aValue < bValue) {
      return 1 * multiplier;
    }
    if (aValue > bValue) {
      return -1 * multiplier;
    }
    return 0;
  });
};

export const sortRounds = ({
  rounds,
  ascending = false,
}: {
  rounds: Rounds;
  ascending?: boolean;
}) => {
  return [...rounds].sort((a, b) => {
    const aValue = a.round;
    const bValue = b.round;

    // For descending order (default)
    const multiplier = ascending ? 1 : -1;

    if (aValue < bValue) {
      return 1 * multiplier;
    }
    if (aValue > bValue) {
      return -1 * multiplier;
    }
    return 0;
  });
};

export const countRoundsPlayedByPlayer = (rounds: Rounds, player: Player) => {
  return rounds.filter((round) => {
    return round.player === player.name && round.score[0].score !== -1;
  }).length;
};

export const convertSlugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
