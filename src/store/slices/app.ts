import { RawgGame } from "@/types";
import { Game } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  selectedRawgGame: RawgGame | null;
  selectedGame?: Game | null;
  isLoading: boolean;
}

export const initialState: AppState = {
  selectedRawgGame: null,
  selectedGame: null,
  isLoading: false,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    initialilzeApp: (state, action: PayloadAction<AppState>) => {
      state = action.payload;
    },
    // This is used for adding a new game to the user's library
    setSelectedRawgGame: (state, action: PayloadAction<RawgGame | null>) => {
      state.selectedRawgGame = action.payload;
    },
    // This is used for selecting a game from the user's library
    setSelectedGame: (state, action: PayloadAction<Game | null>) => {
      state.selectedGame = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  initialilzeApp,
  setSelectedRawgGame,
  setSelectedGame,
  setLoading,
} = app.actions;

export default app.reducer;
