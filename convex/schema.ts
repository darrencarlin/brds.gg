import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const playerSchema = v.object({
  id: v.string(),
  name: v.string(),
  score: v.array(
    v.object({
      name: v.string(),
      score: v.number(),
    })
  ),
});

export const roundSchema = v.object({
  round: v.number(),
  player: v.string(),
  score: v.array(
    v.object({
      name: v.string(),
      score: v.number(),
    })
  ),
});

export const fieldSchema = v.object({
  id: v.string(),
  name: v.string(),
  title: v.string(),
  icon: v.string(),
  defaultValue: v.string(),
});

export const gameSchema = v.object({
  id: v.string(),
  name: v.string(),
  indicator: v.string(),
  image: v.string(),
  user: v.string(),
  fields: v.array(fieldSchema),
});

export const sessionSchema = v.object({
  id: v.string(),
  gameId: v.string(),
  user: v.string(),
  game: gameSchema,
  round: v.number(),
  players: v.array(playerSchema),
  rounds: v.array(roundSchema),
  finished: v.boolean(),
  completedTime: v.string(),
});

export const userSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
});

export default defineSchema({
  sessions: defineTable(sessionSchema),
  users: defineTable(userSchema),
  games: defineTable(gameSchema),
});
