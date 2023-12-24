import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  darkMode: boolean;
  currScore: number;
}

const generalSlice = createSlice({
  name: "general",
  initialState: {
    darkMode: true,
    currScore: 0,
  } as GeneralState,
  reducers: {
    switchDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setCurrScore: (state, action: PayloadAction<number>) => {
      state.currScore = action.payload;
    },
  },
});

export const { switchDarkMode, setCurrScore } = generalSlice.actions;
export default generalSlice.reducer;
