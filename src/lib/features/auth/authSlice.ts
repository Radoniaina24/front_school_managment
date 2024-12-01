import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  token: string | null;
  user: any;
}
const initialState: AuthState = {
  token: null,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
