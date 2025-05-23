import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./auth/StudentApi";
import { questionApi } from "./questions/QuestionApi";
import { authApi } from "./auth/AuthApi";
import authReducer from "./auth/AuthSlice";
import { resultApi } from "./auth/ResultApi";
import { studentQuizApi } from "./studentsquizzes/StudentQuizzesApi";
import { quizApi } from "./quizes/QuizesApi";

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
    [questionApi.reducerPath]: questionApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
    [studentQuizApi.reducerPath]: studentQuizApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      studentApi.middleware,
      questionApi.middleware,
      resultApi.middleware,
      studentQuizApi.middleware,
      quizApi.middleware
    ),

  preloadedState: loadStateFromLocalStorage(), // Load data from localStorage into Redux store on initialization
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
