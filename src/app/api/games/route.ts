import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  console.log({ session });

  if (!session || !session.user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  try {
    const data = await prisma.game.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log({ data });
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to fetch games", { status: 500 });
  }
}
