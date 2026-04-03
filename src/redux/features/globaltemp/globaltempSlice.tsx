import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type globaltemp = {
    data: {
      [key:string]: any
    },
};

const initialState: globaltemp ={
  data:{}
}
export const globaltempSlice = createSlice({
    name: "globaltemp",
    initialState,
    reducers: {
        setglobaltempDataKey: (state, action: {payload:any}) => {
            // state[action.payload.key] = action.payload.value;
            state.data={
                ...state.data,
              [action.payload.key]: action.payload.value
            }
          },
        setglobaltempData:(state, action:{payload:any})=>{
            state.data = action.payload
          },
        setglobaltempDataKeyTwoLevel:(state, action:{payload:any})=>{
          state.data[action.payload.key1][action.payload.position][action.payload.key2] = action.payload.value
        },
        setglobaltempDataKeyInsertDataInArray:(state, action:{payload:any})=>{
          state.data[action.payload.key] = [
                                            action.payload.value,
                                            ...state.data[action.payload.key]
                                            ]
        }
    }
  });
  
  export const {
    setglobaltempDataKey,
    setglobaltempData,
    setglobaltempDataKeyTwoLevel,
    setglobaltempDataKeyInsertDataInArray
  } = globaltempSlice.actions;
  
  export default globaltempSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type globaltemp = {
//     data: {
//       [key:string]: any
//     },
// };

// const initialState: globaltemp ={
//   data:{}
// }
// export const globaltempSlice = createSlice({
//     name: "globaltemp",
//     initialState,
//     reducers: {
//         setglobaltempDataKey: (state, action: {payload:any}) => {
//             // state[action.payload.key] = action.payload.value;
//             state.data={
//                 ...state.data,
//               [action.payload.key]: action.payload.value
//             }
//           },
//         setglobaltempData:(state, action:{payload:any})=>{
//             state.data = action.payload
//           }
//     }
//   });
  
//   export const {
//     setglobaltempDataKey,
//     setglobaltempData
//   } = globaltempSlice.actions;
  
//   export default globaltempSlice.reducer;