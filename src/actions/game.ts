"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { validateGameFields } from "@/types";
import type { Game } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const addGame = async (
  game: Omit<Game, "id" | "userId" | "createdAt" | "updatedAt">
) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const existingGame = await prisma.game.findFirst({
      where: {
        name: game.name,
        userId: session.user.id,
      },
    });

    if (existingGame) {
      return {
        success: false,
        message:
          "Game already exists, please select it from your library above.",
      };
    }

    const validatedFields = validateGameFields(game.fields);

    const data = {
      name: game.name,
      image: game.image,
      fields: validatedFields,
      userId: session.user.id,
    };

    const newGame = await prisma.game.create({
      data,
    });

    return {
      success: true,
      message: "Game added to your library.",
      data: newGame,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create game" };
  }
};

export const removeGame = async (id: string) => {
  try {
    await prisma.game.delete({
      where: { id },
    });

    // Revalidate the profile page to update the games list
    revalidatePath("/profile");

    return {
      success: true,
      message: `Game with id: ${id} removed successfully`,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to remove game" };
  }
};
