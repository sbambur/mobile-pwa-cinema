import { createAsyncThunk } from "@reduxjs/toolkit";
import SchemeService from "api/services/SchemeService";

export const getScheme = createAsyncThunk("scheme/getScheme", async () => {
  try {
    const response = await SchemeService.getScheme();
    return response.data;
  } catch (e: any) {
    console.log(e.response.data.message);

    throw new Error("ошибка");
  }
});
