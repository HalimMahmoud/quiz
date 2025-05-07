import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../services/api/axiosBaseQuery";
import { USER_URLS } from "../../services/api/ApiConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: USER_URLS.LOGIN,
        method: "POST",
        data: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: USER_URLS.REGISTER,
        method: "POST",
        data: body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: USER_URLS.FORGET_PASS,
        method: "POST",
        data: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: USER_URLS.RESET_PASS,
        method: "POST",
        data: body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: USER_URLS.CHANGE_PASS,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
