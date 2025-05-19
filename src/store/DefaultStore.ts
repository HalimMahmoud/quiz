import { configureStore } from "@reduxjs/toolkit";
import { loadStateFromLocalStorage } from "./auth/AuthLoaded";
import { authApi } from "./auth/AuthApi";
import { questionApi } from "./questions/QuestionApi";

import authReducer from "./auth/AuthSlice";
import { resultApi } from "./auth/ResultApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, questionApi.middleware, resultApi.middleware ),

  preloadedState: loadStateFromLocalStorage(), // Load data from localStorage into Redux store on initialization
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
