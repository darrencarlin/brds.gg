import { PartialSession } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: PartialSession[] = [];

const sessions = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    updateSessions: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateSessions } = sessions.actions;

export default sessions.reducer;
