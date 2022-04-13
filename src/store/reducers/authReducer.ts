import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../http";
import { IUser } from "models/IUser";
import { AuthResponse } from "models/response/AuthResponse";
import AuthService from "service/AuthService";

// ********************** Actions **********************

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (e: any) {
      console.log(e.response.data.message);

      throw new Error("ошибка");
    }
  }
);

export const registration = createAsyncThunk(
  "user/login",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      return response.data.user;
    } catch (e) {
      throw new Error("ошибка");
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await AuthService.logout();
    localStorage.removeItem("token");
    return response;
  } catch (e) {
    throw new Error("ошибка");
  }
});

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
  } catch (e) {
    throw new Error("ошибка");
  }
});

// ********************** Actions **********************

export interface UserState {
  loading: "idle" | "pending";
  user: IUser;
  isAuth: boolean;
}

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
      .addCase(login.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {} as IUser;
        state.isAuth = false;
      })
      .addCase(checkAuth.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
          state.user = action!.payload!;
          state.isAuth = true;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";
        }
      });
  },
});

export default userSlice;
