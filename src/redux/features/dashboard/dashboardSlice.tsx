import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dashboard = {
  dashboard: string;
  sidebar:boolean;
};

const initialState: dashboard = {
  dashboard: "",
  sidebar: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setdashboard: (state, action: PayloadAction<string>) => {
      state.dashboard = action.payload;
    },
    setSidebar: (state,action: PayloadAction<boolean>) => {
      state.sidebar = action.payload;
    }
  }
});

export const {
  setdashboard,
  setSidebar
} = dashboardSlice.actions;

export default dashboardSlice.reducer;