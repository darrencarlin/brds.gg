import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { gameSchema } from "./schema";

export const getGames = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.email) {
      throw new Error("Email is required");
    }

    const games = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("user"), args.email))
      .collect();

    return games;
  },
});

export const createGame = mutation({
  args: { game: gameSchema },
  handler: async (ctx, args) => {
    const game = await ctx.db.insert("games", args.game);
    return game;
  },
});

export const deleteGame = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!game) {
      throw new Error("Game not found");
    }

    await ctx.db.delete(game._id);
  },
});

export const deleteAllGamesByUser = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const games = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("user"), args.email))
      .collect();

    await Promise.all(games.map((game) => ctx.db.delete(game._id)));
  },
});
