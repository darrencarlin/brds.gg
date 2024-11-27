import { ShareSessions } from "@/components/sessions/share-session";

export default async function Page({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const email = (await params).email;

  return (
    <div className="min-h-[calc(100vh-68px)] w-full text-white p-4">
      <ShareSessions email={email} />
    </div>
  );
}
