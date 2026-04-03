import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export type loader = {
    open: boolean,
   
}
type openSnackType = {
    payload: {
        open: boolean
    }
}
const initialState: loader = {
    open: false
}

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        openLoader: (state, action: openSnackType) => {
            state.open = action.payload.open
        },
        closeLoader: (state) => {
            state.open = false
        }
    }
})

export const { openLoader, closeLoader } = loaderSlice.actions;

export default loaderSlice.reducer