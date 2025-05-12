import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import { authApi } from './AuthApi';
import { studentApi } from './StudentApi';

const loadStateFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    auth: {
      token: token ? token : null,
      user: user ? JSON.parse(user) : null,
    },
  };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(studentApi.middleware),
  preloadedState: loadStateFromLocalStorage(), // Load data from localStorage into Redux store on initialization
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
