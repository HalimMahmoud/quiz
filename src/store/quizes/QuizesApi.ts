import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/api/axiosBaseQuery";
import { QUIZZES_URLS } from "../../services/api/ApiConfig";
import type { Quiz } from "@/interfaces/quiz.interface";
import type { TestResponseObject } from "@/interfaces/test.interfaces";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    getIncomingQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: QUIZZES_URLS.INCOMING_QUIZZES,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),

    getCompletedQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: QUIZZES_URLS.COMPLETED_QUIZZES,
        method: "GET",
      }),
      providesTags: ["Quiz"],
    }),

    getQuizByID: builder.query<Quiz, string>({
      query: (id) => ({
        url: QUIZZES_URLS.GET_QUIZ(id),
        method: "GET",
      }),
    }),

    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (body) => ({
        url: QUIZZES_URLS.CREATE_QUIZ,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Quiz"],
    }),

    updateQuiz: builder.mutation<Quiz, { id: string; body: Partial<Quiz> }>({
      query: ({ id, body }) => ({
        url: QUIZZES_URLS.UPDATE_QUIZ(id),
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["Quiz"],
    }),

    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: QUIZZES_URLS.DELETE_QUIZ(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    joinQuiz: builder.mutation<void, { code: string }>({
      query: (body) => ({
        url: QUIZZES_URLS.JOIN,
        method: "POST",
        data: body,
      }),
    }),

    getQuizResults: builder.query<void, void>({
      query: () => ({
        url: QUIZZES_URLS.GET_RESULTS,
        method: "GET",
      }),
    }),

    getQuestionsWithoutAnswers: builder.query<TestResponseObject, string>({
      query: (quizId) => ({
        url: QUIZZES_URLS.QUESTIONS_WITHOUT_ANSWER(quizId),
        method: "GET",
      }),
    }),

    submitQuiz: builder.mutation<
      { message: string; timpstamp: string },
      {
        id: string;
        body: {
          answers: {
            question: string;
            answer: string;
          }[];
        };
      }
    >({
      query: ({ id, body }) => ({
        url: QUIZZES_URLS.SUMBIT_QUIZ(id),
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useGetIncomingQuizzesQuery,
  useGetCompletedQuizzesQuery,
  useGetQuizByIDQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useJoinQuizMutation,
  useGetQuizResultsQuery,
  useGetQuestionsWithoutAnswersQuery,
  useSubmitQuizMutation,
} = quizApi;
