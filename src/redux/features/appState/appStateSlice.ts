import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type appState = {
  appState: string;
  sidebar:boolean;
};

const initialState: appState = {
  appState: "",
  sidebar: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<string>) => {
      state.appState = action.payload;
    },
    setSidebar: (state,action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    }
  }
});

export const {
  setAppState,
  setSidebar
} = appStateSlice.actions;

export default appStateSlice.reducer;