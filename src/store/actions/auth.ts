import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";
import AuthService from "api/services/AuthService";
import { AuthResponse } from "models/response/AuthResponse";

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
      console.log("Отработал логин");

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
    console.log("Отработал логаут");
    const response = await AuthService.logout();
    localStorage.removeItem("token");
    return response;
  } catch (e) {
    throw new Error("ошибка");
  }
});

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    console.log("Отработал логин чек");
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
  } catch (e) {
    throw new Error("ошибка");
  }
});
