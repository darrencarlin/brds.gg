import { Player } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: Player = {
  id: "",
  name: "",
  score: [],
};

const player = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.score = action.payload.score;
    },
  },
});

export const { setPlayer } = player.actions;

export default player.reducer;
