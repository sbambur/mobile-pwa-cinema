import { createSlice } from "@reduxjs/toolkit";
import { IUser, UserState } from "models/user-model";
import * as authAction from "store/actions/auth";

const initialState = {
  user: {},
  isAuth: false,
  loading: false,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authAction.login.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(authAction.login.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(authAction.login.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(authAction.logout.fulfilled, (state, action) => {
        state.user = {} as IUser;
        state.isAuth = false;
      })
      .addCase(authAction.checkAuth.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(authAction.checkAuth.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(authAction.checkAuth.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      });
  },
});

export default userSlice;
