import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestAPI = createApi({
  reducerPath: "requestAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRequest: builder.query({
      query: (params) => {
        return {
          url: `request`,
          method: "GET",
          params,
        };
      },
      providesTags: ["parametre"],
    }),
    getAllRequest: builder.query({
      query: () => {
        return {
          url: `request`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getRequestById: builder.query({
      query: (id) => {
        return {
          url: `request/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addRequest: builder.mutation({
      query: (obj) => {
        return {
          url: `request`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateRequest: builder.mutation({
      query: ({ updateRequest, id }) => {
        return {
          url: `request/${id}`,
          method: "PUT",
          body: updateRequest,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteRequest: builder.mutation({
      query: (id) => {
        return {
          url: `request/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetRequestQuery,
  useGetRequestByIdQuery,
  useAddRequestMutation,
  useDeleteRequestMutation,
  useUpdateRequestMutation,
  useGetAllRequestQuery,
} = requestAPI;
