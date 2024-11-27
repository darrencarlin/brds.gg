import { configureStore } from "@reduxjs/toolkit";
import app from "./slices/app";
import auth from "./slices/auth";
import game from "./slices/game";
import player from "./slices/player";
import session from "./slices/session";
import sessions from "./slices/sessions";

export const store = configureStore({
  reducer: {
    app,
    player,
    game,
    session,
    sessions,
    auth,
  },
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
