import { User } from "next-auth";

import { Doc } from "../convex/_generated/dataModel";

export type Session = Doc<"sessions">;

export type Sessions = Session[];

export type PartialSession = Partial<Session>;

export type Player = Session["players"][0];

export type Players = Session["players"];

export type Round = Session["rounds"][0];

export type Rounds = Session["rounds"];

export type Game = Session["game"];

export type PartialGame = Partial<Game>;

export type Field = Game["fields"][0];

export type Fields = Game["fields"];

export interface RawgGame {
  id: number;
  name: string;
  background_image: string;
}

export interface GoogleUser extends User {
  emailVerified?: null;
  createdAt?: Date;
  updatedAt?: Date;
}
