import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mailAPI = createApi({
  reducerPath: "mailAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getMail: builder.query({
      query: (params) => {
        return {
          url: `mail`,
          method: "GET",
          params,
        };
      },
      providesTags: ["parametre"],
    }),
    getAllMail: builder.query({
      query: () => {
        return {
          url: `mail`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getMailById: builder.query({
      query: (id) => {
        return {
          url: `mail/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addMail: builder.mutation({
      query: (obj) => {
        return {
          url: `mail`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateMail: builder.mutation({
      query: ({ updateMail, id }) => {
        return {
          url: `mail/${id}`,
          method: "PUT",
          body: updateMail,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteMail: builder.mutation({
      query: (id) => {
        return {
          url: `mail/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetMailQuery,
  useGetAllMailQuery,
  useGetMailByIdQuery,
  useAddMailMutation,
  useDeleteMailMutation,
  useUpdateMailMutation,
} = mailAPI;
