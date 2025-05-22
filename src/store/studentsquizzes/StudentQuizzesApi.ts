// studentsQuizApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/api/axiosBaseQuery";
import { STUDENTSQUIZZES_URL } from "../../services/api/ApiConfig";

type QuizOption = {
  A: string;
  B: string;
  C: string;
  D: string;
};

type QuizQuestion = {
  _id: string;
  title: string;
  options: QuizOption;
};

export type Quiz = {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  closed_at?: string;
  participants: number;
};

type JoinQuizPayload = {
  code: string;
};

type SubmitQuizPayload = {
  quizId: string;
  answers: {
    questionId: string;
    answer: keyof QuizOption;
  }[];
};

type QuizResult = {
  student: {
    _id: string;
    name: string;
  };
  quiz: string;
  score: number;
  submittedAt: string;
};
type Response = {
  message: string;
  timestamp: string;
};

export const studentQuizApi = createApi({
  reducerPath: "studentsQuizApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["StudentsQuizzes"],

  endpoints: (builder) => ({
    joinQuiz: builder.mutation<Response, JoinQuizPayload>({
      query: (body) => ({
        url: STUDENTSQUIZZES_URL.joinQuiz,
        method: "POST",
        data: body,
      }),
    }),

    getQuestionsWithoutAnswers: builder.query<QuizQuestion[], string>({
      query: (quizId) => ({
        url: STUDENTSQUIZZES_URL.qutionWithoutAnswer(quizId),
        method: "GET",
      }),
    }),

    submitQuiz: builder.mutation<Response, SubmitQuizPayload>({
      query: ({ quizId, answers }) => ({
        url: STUDENTSQUIZZES_URL.submitQuiz(quizId),
        method: "POST",
        data: { answers },
      }),
    }),

    getFirstFiveIncomingQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: STUDENTSQUIZZES_URL.firstFiveIncomming,
        method: "GET",
      }),
      providesTags: ["StudentsQuizzes"],
    }),

    getLastFiveCompletedQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: STUDENTSQUIZZES_URL.lastFiveCompleted,
        method: "GET",
      }),
      providesTags: ["StudentsQuizzes"],
    }),

    getQuizResults: builder.query<QuizResult[], void>({
      query: () => ({
        url: STUDENTSQUIZZES_URL.result,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useJoinQuizMutation,
  useGetQuestionsWithoutAnswersQuery,
  useSubmitQuizMutation,
  useGetFirstFiveIncomingQuizzesQuery,
  useGetLastFiveCompletedQuizzesQuery,
  useGetQuizResultsQuery,
} = studentQuizApi;
