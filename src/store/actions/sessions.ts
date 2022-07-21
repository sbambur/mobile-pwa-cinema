import { createAsyncThunk } from "@reduxjs/toolkit";
import SessionService from "api/services/SessionServices";

export const getSessions = createAsyncThunk("session/getSessions", async () => {
  try {
    const response = await SessionService.getSessions();
    return response.data;
  } catch (e: any) {
    console.log(e.response.data.message);

    throw new Error("ошибка");
  }
});

export const getSession = createAsyncThunk(
  "session/getSession",
  async (id: string) => {
    try {
      const response = await SessionService.getOneSession(id);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);

      throw new Error("ошибка");
    }
  }
);
