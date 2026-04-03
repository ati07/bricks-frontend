
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeDialogBox = {
    open: boolean,
    message: string,
    btnPrimaryText?: string,
    btnSecondaryText?: string,
    primaryAction: () => void,
    secondaryAction: () => void,
}

let initialState: TypeDialogBox = {
    open: false, message: 'There is some error. Please try again later', btnPrimaryText: "Yes", btnSecondaryText: "No", primaryAction: () => { }, secondaryAction: () => { }
}

export const DialogBoxSlice = createSlice({
    name: "dialogBox",
    initialState,
    reducers: {
        openDialogBox: (state, action: PayloadAction<TypeDialogBox>) => {
            state.open = action.payload.open,
                state.message = action.payload.message,
                state.btnPrimaryText = action.payload?.btnPrimaryText || state.btnPrimaryText,
                state.btnSecondaryText = action.payload?.btnSecondaryText || state.btnSecondaryText
            state.primaryAction = action.payload.primaryAction,
                state.secondaryAction = action.payload.secondaryAction
        },
        closeDialogBox: (state) => {
            state.open = false,
                state.primaryAction = () => { },
                state.secondaryAction = () => { }
        }
    }
})

export const { openDialogBox, closeDialogBox } = DialogBoxSlice.actions;

export default DialogBoxSlice.reducer