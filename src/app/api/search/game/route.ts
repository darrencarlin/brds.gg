import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?search=${query}&search_precise="true"&key=${process
        .env.RAWG_API_KEY!}`
    );

    const { results } = await response.json();
    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
};
