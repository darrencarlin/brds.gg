import { createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";

export const initialState: Session = {
  user: {
    email: "",
    name: "",
    image: "",
    id: "",
  },
  expires: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSession: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateSession } = auth.actions;

export default auth.reducer;
