import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="p-4 flex justify-between">
      <Link href="/" className="font-bold text-white">
        BRDS.gg
      </Link>
      <div className="flex gap-4">
        <Link
          href="/new-session"
          className="font-bold bg-zinc-950 hover:bg-zinc-900 text-white p-2 rounded"
        >
          New Session
        </Link>
      </div>
    </nav>
  );
};
