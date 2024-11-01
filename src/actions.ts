"use server";

import prisma from "./lib/db";

export const createSubscriber = async (email: string) => {
  try {
    await prisma.subscriber.create({
      data: {
        email: email,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
