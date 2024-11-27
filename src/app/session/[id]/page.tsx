import HomePageClient from "./client";

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <HomePageClient id={id} />;
}
