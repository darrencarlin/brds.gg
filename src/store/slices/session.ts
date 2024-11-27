import { PartialSession } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: PartialSession = {
  game: {
    id: "",
    image: "",
    user: "",
    name: "",
    indicator: "",
    fields: [],
  },
  round: 1,
  players: [],
  rounds: [],
};

const session = createSlice({
  name: "session",
  initialState,
  reducers: {
    initialilzeApp: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSession: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  initialilzeApp,
  updateSession,
  // addPlayer,
  // addRound,
  // updateTotal,
} = session.actions;

export default session.reducer;
