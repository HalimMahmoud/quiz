import { RESULT_ULR } from "@/services/api/ApiConfig";
import { axiosBaseQuery } from "@/services/api/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAllResults: builder.query({
      query: () => ({
        url: RESULT_ULR.GET_All,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllResultsQuery } = resultApi;
