import { Title } from "@/components/title";
import { getGames } from "@/data/games";
import { LibraryResults } from "./library-results";

interface Props {
  hasDeleteButton?: boolean;
}

export const Library = async ({ hasDeleteButton = false }: Props) => {
  const games = await getGames();
  return (
    <div className="mb-4">
      <Title>Your Library</Title>
      <LibraryResults results={games} hasDeleteButton={hasDeleteButton} />
    </div>
  );
};
