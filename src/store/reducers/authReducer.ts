import { createSlice } from "@reduxjs/toolkit";
import { IUser, UserState } from "models/user-model";
import * as authAction from "store/actions/auth";

const initialState = {
  user: {},
  isAuth: false,
  loading: "idle",
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authAction.login.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(authAction.login.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(authAction.login.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      })
      .addCase(authAction.logout.fulfilled, (state, action) => {
        state.user = {} as IUser;
        state.isAuth = false;
      })
      .addCase(authAction.checkAuth.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(authAction.checkAuth.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(authAction.checkAuth.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      });
  },
});

export default userSlice;
