import { RESULT_ULR } from "@/services/api/ApiConfig";
import { axiosBaseQuery } from "@/services/api/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Results"],
  endpoints: (builder) => ({
    getAllResults: builder.query({
      query: () => ({
        url: RESULT_ULR.GET_All,
        method: "GET",
      }),
      providesTags: ["Results"],
    }),
    getResultsByGroupId: builder.query({
      query: (id) => ({
        url: RESULT_ULR.GET_GROUP_BY_ID(id),
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Results", id }],
    }),
  }),
});
export const { useGetAllResultsQuery, useGetResultsByGroupIdQuery } = resultApi;
