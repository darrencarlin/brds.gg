import { Input } from "../ui/input";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchForm = ({ search, setSearch }: Props) => {
  return (
    <form className="mb-4">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required
        className="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        aria-label="Search for a game"
      />
    </form>
  );
};
