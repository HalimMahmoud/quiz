// questionApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/api/axiosBaseQuery";
import { QUESTIONS_URLS } from "../../services/api/ApiConfig";
export type Question = {
  _id: string;
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: keyof Question["options"];
  difficulty: "easy" | "medium" | "hard";
  type: "FE" | "BE" | "BO";
};

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Questions"], // 👈 Add tag type
  endpoints: (builder) => ({
    getAllQuestions: builder.query<Question[], void>({
      query: () => ({
        url: QUESTIONS_URLS.GET_ALL_QUESTIONS,
        method: "GET",
      }),
      providesTags: ["Questions"], // 👈 Provide tag
    }),
    createQuestion: builder.mutation<Question, Partial<Question>>({
      query: (body) => ({
        url: QUESTIONS_URLS.CREATE,
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Questions"], // 👈 Invalidate tag
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
      invalidatesTags: ["Questions"], // 👈 Invalidate tag
    }),
    deleteQuestion: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: QUESTIONS_URLS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Questions"], // 👈 Invalidate tag
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
