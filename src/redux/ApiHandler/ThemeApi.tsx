import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'
import { themeApiType } from '../../types/ThemeApiTypes'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import useCRUD from '../../hooks/useCRUD';
// import { urls } from './BackendAPI'
export interface Post {
  [key: string]: string
}
// Define a service using a base URL and expected endpoints

//  console.log("process.env.REACT_APP_SERVER_URL",process.env.REACT_APP_SERVER_URL);
// let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '').token :''

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_REACT_API_URL}` }),
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getData: builder.query<themeApiType, string>({
      query: (name) => ({
        url:`${name}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user') ?? '')?.token}`
        },
        keepUnusedDataFor: 0
      }),
    }),
        getDashboardData: builder.mutation<any, any>({
      query: (payload) =>({ 
        url:`${payload.endpoint}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${payload.token}`
        },
        body: payload.data,
      })
        
    }),
    getFilterData: builder.mutation<any, any>({
      query: (payload) =>({ 
        url:`${payload.endpoint}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user') ?? '')?.token}`
        },
        body: payload.data
      })
        
    }),
    user: builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: payload.data
      }),
      
      // invalidatesTags: ['Post'],
    }),
    get: builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user') ?? '')?.token}`
        }
      }),
      // invalidatesTags: ['Post']
    }),
    create: builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${payload.token}`
        },
        body: payload.data
      }),
    }),
    update: builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${payload.token}`
        },
        body: payload.data
      })
    }),
    deleteRow: builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${payload.token}`
        }
      }),
      // invalidatesTags: ['Post']
    }),
    sendMail:builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${payload.token}`
        },
        body: payload.data
      })
    }),
    uploadFile:builder.mutation<any, any>({
      query: (payload) => ({
        url: payload.endpoint,
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          authorization: `Bearer ${payload.token}`
        },
        body: payload.data
      })
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataQuery,
  useGetDashboardDataMutation,
  useUserMutation,
  useCreateMutation,
  useUpdateMutation,
  useDeleteRowMutation,
  useGetMutation,
  useGetFilterDataMutation,
  useSendMailMutation,
  useUploadFileMutation
} = themeApi
//  useFindProductMutation





// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// // import type { Pokemon } from './types'
// import { themeApiType } from '../../types/ThemeApiTypes'
// // import { urls } from './BackendAPI'
// export interface Post {
//   [key: string]: string
// }
// // Define a service using a base URL and expected endpoints
// // https://shopmobileapp.cedcommerce.com/shopifymobilenew/graphql/getdata
// // http://localhost/magenativenew/shipify-mobile-app/index.php/shopifymobilenew/themeconfig/getthemedata
// //  console.log("process.env.REACT_APP_SERVER_URL",process.env.REACT_APP_SERVER_URL);
// export const themeApi = createApi({
//   reducerPath: 'themeApi',
//   keepUnusedDataFor: 0,
//   baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_REACT_API_URL}` }),
//   endpoints: (builder) => ({
//     getData: builder.query<themeApiType, string>({
//       query: (name) => `${name}`,
//     }),
//     getDashboardData: builder.mutation<any, any>({
//       query: (payload) =>({ 
//         url:`${payload.endpoint}`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data,
//       })
        
//     }),
//     getRiskReportData: builder.mutation<any, any>({
//       query: (payload) =>({ 
//         url:`${payload.endpoint}`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data,
//       })
        
//     }),
//     getFilterData:builder.mutation<any, any>({
//       query: (payload) =>({ 
//         url:`${payload.endpoint}`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data,
//       })
        
//     }),
//     user: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: payload.data,
//       }),
//       // invalidatesTags: ['Post'],
//     }),
//     create: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data
//       })
//     }),
//     update:builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data
//       })
//     }),
//     deleteRow: builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         }
//       })
//     }),
//     updateStatus:builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: "GET"
//       })
//     }),
//     sendMail:builder.mutation<any, any>({
//       query: (payload) => ({
//         url: payload.endpoint,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${payload.token}`
//         },
//         body: payload.data
//       })
//     }),
//   })
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetDataQuery,
//   useGetDashboardDataMutation,
//   useGetRiskReportDataMutation,
//   useUserMutation,
//   useCreateMutation,
//   useUpdateMutation,
//   useDeleteRowMutation,
//   useUpdateStatusMutation,
//   useGetFilterDataMutation,
//   useSendMailMutation
// } = themeApi
// //  useFindProductMutation

