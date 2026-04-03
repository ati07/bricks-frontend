import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type login = {
    data:{
        [key:string]:any
    },
    openLogin:boolean

};

const initialState: login ={
    data:{},
    openLogin:false
}
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      setloginData: (state, action: any) => {
        state.data = action.payload
        // state[action.payload.key] = action.payload.key
      },
      setopenlogin: (state, action: {payload:boolean}) => {
        state.openLogin = action.payload
      }
    }
  });
  
  export const {
    setloginData,
    setopenlogin
  } = loginSlice.actions;
  
  export default loginSlice.reducer;