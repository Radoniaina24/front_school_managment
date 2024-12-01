import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authSlice, setCredentials } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL, // URL de votre backend
  credentials: "include", // Inclure les cookies (pour le refreshToken)
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token; // Récupérer l'access token depuis le state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Middleware pour intercepter les erreurs 401 et rafraîchir le token
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("Access token expiré, tentative de renouvellement...");
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions,
    );
    if (refreshResult?.data) {
      // Stocker le nouveau accessToken
      const newAccessToken = (refreshResult.data as { accessToken: string })
        .accessToken;
      api.dispatch(
        authSlice.actions.setCredentials({
          token: newAccessToken,
        }),
      );

      // Réessayer la requête initiale avec le nouveau token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Si le refresh échoue, déconnecter l'utilisateur
      api.dispatch(authSlice.actions.logout());
    }
  }

  return result;
};

export const authAPI = createApi({
  reducerPath: "authAPI",
  tagTypes: ["authentication"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token; // Récupération du token JWT depuis Redux
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include", // S'assurer que les cookies sont envoyés avec la requête
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
      providesTags: ["authentication"],
    }),
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["authentication"],
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
        };
      },
      invalidatesTags: ["authentication"],
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useLogoutMutation } = authAPI;
