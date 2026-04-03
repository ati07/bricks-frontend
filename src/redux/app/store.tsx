import { configureStore } from '@reduxjs/toolkit'
import { themeApi } from "../ApiHandler/ThemeApi";
import { SnackBarSlice } from '../../redux/snackbar/snackbarSlice';
import { DialogBoxSlice } from '../../redux/dialogBox/dialogboxSlice';
import appStateSlice from "../features/appState/appStateSlice";
import dashboardSlice from '../features/dashboard/dashboardSlice';
import commonSlice from '../features/common/commonSlice';
import loginSlice from '../features/loginSlice/loginSlice';
import loaderSlice from '../loader/loaderSlice';
import globaltempSlice from '../features/globaltemp/globaltempSlice';
// ...

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [themeApi.reducerPath]: themeApi.reducer,
    dashboard:dashboardSlice,
    snackbar: SnackBarSlice.reducer,
    dialogBox: DialogBoxSlice.reducer,
    appState: appStateSlice,
    commonData:commonSlice,
    login:loginSlice,
    loader:loaderSlice,
    globaltemp:globaltempSlice
    // comments: commentsReducer,
    // users: usersReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(themeApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch