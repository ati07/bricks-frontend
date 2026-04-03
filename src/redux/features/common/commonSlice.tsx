import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type common = {
  data:[];
  merchants:[];
  merchantsFilters:[];
  dbasFilters:[];
  dbas:[];
  dbasData:[];
  mid:[],
  clients:[],
  openAmount:'',
  overdueAmount:'',
  paidAmount:'',
  apiData:{
    [key: string]:any
  },
  comments:[]
};

const initialState: common = {
  data:[],
  dbas:[],
  merchants:[],
  merchantsFilters:[],
  dbasFilters:[],
  dbasData:[],
  mid:[],
  clients:[],
  apiData:{},
  openAmount:'',
  overdueAmount:'',
  paidAmount:'',
  comments:[]
}
export const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    setCommonData: (state, action:any) => {
      // console.log('state.data',action.payload)
      state.data = action.payload;
      
    },
    setMerchantsData: (state, action:any) => {
      state.merchants = action.payload;
      
    },
    setMerchantsFilterData: (state, action:any) => {
      state.merchantsFilters = action.payload;
    },
    setDbasFilterData: (state, action:any) => {
      state.dbasFilters = action.payload;
    },
    setClientsData:(state, action:any)=>{
      state.clients = action.payload;

    },
    setMID:(state, action:any)=>{
      state.mid= action.payload;
    },
    setDbas:(state, action:any)=>{
      state.dbas= action.payload;
    },
    setDbasData:(state, action:any)=>{
      state.dbasData = action.payload;
    },
    setApiData:(state, action:any)=>{
      state.apiData = action.payload;
      // return 
    },
    setOpenAmount:(state, action:any)=>{
      state.openAmount = action.payload;
    },
    setOverDueAmount:(state, action:any)=>{
      state.overdueAmount = action.payload;
    },
    setPaidAmount:(state, action:any)=>{
      state.paidAmount = action.payload;
    },
    setComments:(state, action:any)=>{
      state.comments = action.payload;
    }
  }
});

export const {
  setCommonData,
  setMerchantsData,
  setMerchantsFilterData,
  setDbasFilterData,
  setMID,
  setClientsData,
  setDbas,
  setDbasData,
  setApiData,
  setOpenAmount,
  setOverDueAmount,
  setPaidAmount,
  setComments
}= commonSlice.actions;

export default commonSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type common = {
//   data:[];
//   merchants:[];
//   dbas:[];
//   mid:[],
//   clients:[]
//   apiData:{
//     [key: string]:any
//   };
// };

// const initialState: common = {
//   data:[],
//   dbas:[],
//   merchants:[],
//   mid:[],
//   clients:[],
//   apiData:{}
// }
// export const commonSlice = createSlice({
//   name: "Common",
//   initialState,
//   reducers: {
//     setCommonData: (state, action:any) => {
//       state.data = action.payload;
      
//     },
//     setMerchantsData: (state, action:any) => {
//       state.merchants = action.payload;
      
//     },
//     setClientsData:(state, action:any)=>{
//       state.clients = action.payload;

//     },
//     setMID:(state, action:any)=>{
//       state.mid= action.payload;
//     },
//     setDbas:(state, action:any)=>{
//       state.dbas= action.payload;
//     },
//     setApiData:(state, action:any)=>{
//       state.apiData = action.payload;
//       // return 
//     }
//   }
// });

// export const {
//   setCommonData,
//   setMerchantsData,
//   setMID,
//   setClientsData,
//   setDbas,
//   setApiData
// }= commonSlice.actions;

// export default commonSlice.reducer;