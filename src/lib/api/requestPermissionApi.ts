import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestPermissionAPI = createApi({
  reducerPath: "requestPermissionAPI",
  tagTypes: ["parametre"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRequestPermission: builder.query({
      query: (params) => {
        return {
          url: `rpermission`,
          method: "GET",
          params,
        };
      },
      providesTags: ["parametre"],
    }),
    getAllRequestPermission: builder.query({
      query: () => {
        return {
          url: `rpermission`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    getRequestPermissionById: builder.query({
      query: (id) => {
        return {
          url: `rpermission/${id}`,
          method: "GET",
        };
      },
      providesTags: ["parametre"],
    }),
    addRequestPermission: builder.mutation({
      query: (obj) => {
        return {
          url: `rpermission`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    updateRequestPermission: builder.mutation({
      query: ({ updateRequestPermission, id }) => {
        return {
          url: `rpermission/${id}`,
          method: "PUT",
          body: updateRequestPermission,
        };
      },
      invalidatesTags: ["parametre"],
    }),
    deleteRequestPermission: builder.mutation({
      query: (id) => {
        return {
          url: `rpermission/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["parametre"],
    }),
  }),
});

export const {
  useGetRequestPermissionQuery,
  useGetRequestPermissionByIdQuery,
  useAddRequestPermissionMutation,
  useDeleteRequestPermissionMutation,
  useUpdateRequestPermissionMutation,
  useGetAllRequestPermissionQuery,
} = requestPermissionAPI;
