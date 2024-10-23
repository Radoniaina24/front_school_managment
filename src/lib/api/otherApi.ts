import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otherAPI = createApi({
  reducerPath: "otherAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getOther: builder.query({
      query: () => {
        return {
          url: `other/one`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getOtherById: builder.query({
      query: ({ id }) => {
        return {
          url: `other/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addOther: builder.mutation({
      query: (obj) => {
        return {
          url: `other`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateOther: builder.mutation({
      query: (updateOther) => {
        return {
          url: `other`,
          method: "PUT",
          body: updateOther,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteOther: builder.mutation({
      query: (id) => {
        return {
          url: `other/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetOtherQuery,
  useGetOtherByIdQuery,
  useAddOtherMutation,
  useDeleteOtherMutation,
  useUpdateOtherMutation,
} = otherAPI;
