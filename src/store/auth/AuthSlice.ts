import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserRole = "Instructor" | "Student";
type UserStatus = "active" | "inactive";

export type Profile = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
};

interface UserState {
  user: null | Profile;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: Profile | null; token: string | null}>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
