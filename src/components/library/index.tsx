import { Title } from "@/components/title";
import { LibraryResults } from "./library-results";

interface Props {
  hasDeleteButton?: boolean;
}

export const Library = ({ hasDeleteButton = false }: Props) => {
  return (
    <div className="mb-4">
      <Title>Your Library</Title>
      <LibraryResults hasDeleteButton={hasDeleteButton} />
    </div>
  );
};
