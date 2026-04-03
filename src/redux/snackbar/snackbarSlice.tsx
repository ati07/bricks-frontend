import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export type SnackBar = {
    severity: AlertColor,
    open: boolean,
    message: string,
    duration?: number
}
type openSnackType = {
    payload: {
        open: boolean, severity: AlertColor, message: string
    }
}
const initialState: SnackBar = {
    open: false, severity: 'error', message: 'Hello', duration: 3000
}

export const SnackBarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        openSnackbar: (state, action: openSnackType) => {
            state.open = action.payload.open,
                state.severity = action.payload.severity,
                state.message = action.payload.message
        },
        closeSnackbar: (state) => {
            state.open = false
        }
    }
})

export const { openSnackbar, closeSnackbar } = SnackBarSlice.actions;

export default SnackBarSlice.reducer