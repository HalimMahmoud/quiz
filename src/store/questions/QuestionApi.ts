// questionApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/api/axiosBaseQuery";
import { QUESTIONS_URLS } from "../../services/api/ApiConfig";
import type { Question } from "./QuestionSlice";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Question[], void>({
      query: () => ({
        url: QUESTIONS_URLS.GET_ALL_QUESTIONS,
        method: "GET",
      }),
    }),
    createQuestion: builder.mutation<Question, Partial<Question>>({
      query: (body) => ({
        url: QUESTIONS_URLS.CREATE,
        method: "POST",
        data: body,
      }),
    }),
    updateQuestion: builder.mutation<
      Question,
      { id: string; data: Partial<Question> }
    >({
      query: ({ id, data }) => ({
        url: QUESTIONS_URLS.UPDATE(id),
        method: "PUT",
        data,
      }),
    }),
    deleteQuestion: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: QUESTIONS_URLS.DELETE(id),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
