<<<<<<< HEAD
<<<<<<< HEAD:src/store/auth/AuthConfig.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import { authApi } from './AuthApi';
import { studentApi } from './StudentApi';
=======
=======
>>>>>>> main
import { configureStore } from "@reduxjs/toolkit";
import { loadStateFromLocalStorage } from "./auth/AuthLoaded";
import { authApi } from "./auth/AuthApi";
import { questionApi } from "./questions/QuestionApi";
<<<<<<< HEAD
>>>>>>> a3ed556 (makes questions crud and getall func working):src/store/DefaultStore.ts
=======
>>>>>>> main

import authReducer from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
<<<<<<< HEAD
<<<<<<< HEAD:src/store/auth/AuthConfig.ts
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(studentApi.middleware),
=======
=======
>>>>>>> main
    [questionApi.reducerPath]: questionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, questionApi.middleware),

<<<<<<< HEAD
>>>>>>> a3ed556 (makes questions crud and getall func working):src/store/DefaultStore.ts
=======
>>>>>>> main
  preloadedState: loadStateFromLocalStorage(), // Load data from localStorage into Redux store on initialization
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
