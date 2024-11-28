import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearch } from "@/store/slices/app";
import { Input } from "../ui/input";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.app);
  return (
    <form className="mb-4">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        required
        className="w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        aria-label="Search for a game"
      />
    </form>
  );
};
