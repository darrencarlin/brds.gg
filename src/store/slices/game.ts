import { Field, PartialGame } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState extends PartialGame {}

export const initialState: AppState = {
  fields: [],
  id: "",
  image: "",
  indicator: "",
  name: "",
  user: "",
};

const newGame = createSlice({
  name: "newGame",
  initialState,
  reducers: {
    updateIndicator: (state, action: PayloadAction<string>) => {
      state.indicator = action.payload;
    },
    addField: (state, action: PayloadAction<Field>) => {
      state.fields = [...(state.fields ?? []), action.payload];
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields?.filter(
        (field) => field.id !== action.payload
      );
    },
    clearFields: (state) => {
      state.fields = [];
    },
  },
});

export const { updateIndicator, addField, removeField, clearFields } =
  newGame.actions;

export default newGame.reducer;
