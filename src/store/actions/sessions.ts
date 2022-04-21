import { createAsyncThunk } from "@reduxjs/toolkit";
import SessionService from "service/SessionServices";

export const getSessions = createAsyncThunk("hall/getHalls", async () => {
  try {
    const response = await SessionService.getHalls();
    return response.data;
  } catch (e: any) {
    console.log(e.response.data.message);

    throw new Error("ошибка");
  }
});

export const getSession = createAsyncThunk(
  "hall/getHall",
  async (id: string) => {
    try {
      const response = await SessionService.getOneHall(id);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);

      throw new Error("ошибка");
    }
  }
);
