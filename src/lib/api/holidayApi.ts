import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const holidayAPI = createApi({
  reducerPath: "holidayAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getHoliday: builder.query({
      query: (params) => {
        return {
          url: `holiday`,
          method: "GET",
          params,
        };
      },
      providesTags: ["parametre"],
    }),
    getAllHoliday: builder.query({
      query: () => {
        return {
          url: `holiday`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getHolidayById: builder.query({
      query: (id) => {
        return {
          url: `holiday/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addHoliday: builder.mutation({
      query: (obj) => {
        return {
          url: `holiday/register`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateHoliday: builder.mutation({
      query: ({ updateHoliday, id }) => {
        return {
          url: `/holiday/update/${id}`,
          method: "PUT",
          body: updateHoliday,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteHoliday: builder.mutation({
      query: (id) => {
        return {
          url: `/holiday/delete/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetHolidayQuery,
  useGetHolidayByIdQuery,
  useAddHolidayMutation,
  useDeleteHolidayMutation,
  useUpdateHolidayMutation,
  useGetAllHolidayQuery,
} = holidayAPI;
