import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/api/axiosBaseQuery';
import { STUDENT_URLS } from '../../services/api/ApiConfig';
import type { Student } from '@/interfaces/student.interface';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => ({
        url: STUDENT_URLS.GET_STUDENTS,
        method: 'GET',
      }),
    }),

    getStudentWithoutGroup: builder.query({
      query: () => ({
        url: STUDENT_URLS.GET_STUDENT_WITHOUT_GROUP,
        method: 'GET',
      }),
    }),
    getTopFiveStudents: builder.query({
      query: () => ({
        url: STUDENT_URLS.TOP_FIVE,
        method: 'GET',
      }),
    }),
    getStudentById: builder.query({
      query: (id: string) => ({
        url: STUDENT_URLS.GET_STUDENT_BY_ID(id),
        method: 'GET',
      }),
    }),
    addStudent: builder.mutation({
      query: (body) => ({
        url: STUDENT_URLS.ADD_STUDENT,
        method: 'POST',
        data: body,
      }),
    }),
    addStudentToGroup: builder.mutation({
      query: ({ idGroup, studentId }) => ({
        url: STUDENT_URLS.ADD_STUDENT_TO_GROUP(idGroup, studentId),
        method: 'POST',
      }),
    }),
    updateStudent: builder.mutation({
      query: (body) => ({
        url: STUDENT_URLS.UPDATE_STUDENT,
        method: 'PUT',
        data: body,
      }),
    }),
    updateStudentToGroup: builder.mutation({
      query: ({ idGroup, studentId }) => ({
        url: STUDENT_URLS.UPDATE_STUDENT_TO_GROUP(idGroup, studentId),
        method: 'PUT',
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id: string) => ({
        url: STUDENT_URLS.DELETE_STUDENT(id),
        method: 'DELETE',
      }),
    }),
    deleteStudentFromGroup: builder.mutation({
      query: ({ idGroup, studentId }) => ({
        url: STUDENT_URLS.DELETE_STUDENT_FROM_GROUP(idGroup, studentId),
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTopFiveStudentsQuery,
  useGetStudentsQuery,
  useGetStudentWithoutGroupQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useAddStudentToGroupMutation,
  useUpdateStudentMutation,
  useUpdateStudentToGroupMutation,
  useDeleteStudentMutation,
  useDeleteStudentFromGroupMutation,
} = studentApi;
