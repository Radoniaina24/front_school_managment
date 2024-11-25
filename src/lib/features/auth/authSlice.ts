import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  token: string | null;
  user: any | null;
  authenticated: boolean;
}
const initialState: AuthState = {
  token: null,
  user: null,
  authenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; userFound: any }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.userFound;
      state.authenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.authenticated = false;
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const authentication = (state: RootState) => state.auth.authenticated;
export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
