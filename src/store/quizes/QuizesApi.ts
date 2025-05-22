import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/api/axiosBaseQuery';
import { QUIZES_URLS } from '../../services/api/ApiConfig';
import type { Quiz } from '@/interfaces/quiz.interface';

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Quiz'], // Optional: for caching and invalidation
  endpoints: (builder) => ({
    getIncomingQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: QUIZES_URLS.INCOMING_QUIZES,
        method: 'GET',
      }),
      providesTags: ['Quiz'], // Optional: for caching
    }),

    getCompletedQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: QUIZES_URLS.COMPLETED_QUIZES,
        method: 'GET',
      }),
      providesTags: ['Quiz'], // Optional: for caching
    }),

    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (body) => ({
        url: QUIZES_URLS.CREATE_QUIZ,
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Quiz'], // Optional: invalidates cache
    }),

    updateQuiz: builder.mutation<Quiz, { id: string; body: Partial<Quiz> }>({
      query: ({ id, body }) => ({
        url: QUIZES_URLS.UPDATE_QUIZ(id),
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['Quiz'], // Optional: invalidates cache
    }),

    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: QUIZES_URLS.delete_QUIZ(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'], // Optional: invalidates cache
    }),
  }),
});

export const {
  useGetIncomingQuizzesQuery,
  useGetCompletedQuizzesQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApi;