import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { playerSchema, sessionSchema } from "./schema";

export const getSession = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    return session;
  },
});

export const getSessions = query({
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect();
    return sessions;
  },
});

export const getSessionsById = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("user"), args.email))
      .collect();

    return session;
  },
});

export const createSession = mutation({
  args: sessionSchema,
  handler: async (ctx, args) => {
    const session = await ctx.db.insert("sessions", {
      id: args.id,
      gameId: args.gameId,
      user: args.user,
      game: args.game,
      round: args.round,
      rounds: args.rounds,
      players: args.players,
      finished: args.finished,
      completedTime: args.completedTime,
    });
    return session;
  },
});

export const updateSession = mutation({
  args: { id: v.string(), session: sessionSchema },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session) throw new Error("Session not found in updateSession");

    await ctx.db.patch(session._id, {
      ...session,
      ...args.session,
    });
  },
});

export const addPlayerMutation = mutation({
  args: { id: v.string(), player: playerSchema },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session) throw new Error("Session not found in addPlayerMutation");

    await ctx.db.patch(session._id, {
      ...session,
      players: [...session.players, args.player],
    });

    return args.player;
  },
});

export const addRoundMutation = mutation({
  args: { id: v.string(), round: v.any() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session) throw new Error("Session not found in addRoundMutation");

    // Add the round to the existing session rounds
    await ctx.db.patch(session._id, {
      ...session,
      rounds: [...session.rounds, args.round],
      // Increment the round if all players have played
    });

    return args.round;
  },
});

export const updateTotalMutation = mutation({
  args: { id: v.string(), player: playerSchema },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session) throw new Error("Session not found in updateTotalMutation");

    // Find the player
    const playerIndex = session.players.findIndex(
      (player) => player.id === args.player.id
    );

    if (playerIndex === -1) throw new Error("Player not found");

    const player = session.players[playerIndex];

    args.player.score.forEach((score) => {
      const playerScore = player.score.find((s) => s.name === score.name);
      if (playerScore) {
        playerScore.score += score.score;
      }
    });

    // Update the player
    session.players[playerIndex] = player;

    // Update the session with the new player
    await ctx.db.patch(session._id, {
      ...session,
      players: session.players,
      round:
        session.rounds.length % session.players.length === 0
          ? session.round + 1
          : session.round,
    });

    return player;
  },
});

export const endSessionMutation = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Get the session ID
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session) throw new Error("Invalid session ID in endSessionMutation");

    await ctx.db.patch(session._id, {
      finished: true,
      completedTime: new Date().toISOString(),
    });
  },
});

export const deleteSessionMutation = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!session)
      throw new Error("Invalid session ID in deleteSessionMutation");

    await ctx.db.delete(session._id);
  },
});

export const deleteAllSessionsByUser = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("user"), args.id))
      .collect();

    await Promise.all(sessions.map((session) => ctx.db.delete(session._id)));
  },
});
