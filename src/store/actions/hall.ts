import { createAsyncThunk } from "@reduxjs/toolkit";
import { IHall, ISeat } from "models/hall-model";
import HallService from "service/HallServices";

export const getHalls = createAsyncThunk("hall/getHalls", async () => {
  try {
    const response = await HallService.getHalls();
    return response.data;
  } catch (e: any) {
    console.log(e.response.data.message);

    throw new Error("ошибка");
  }
});

export const getHall = createAsyncThunk("hall/getHall", async (id: string) => {
  try {
    const response = await HallService.getOneHall(id);
    return response.data;
  } catch (e: any) {
    console.log(e.response.data.message);

    throw new Error("ошибка");
  }
});

export const reserveSeat = createAsyncThunk(
  "hall/getHall",
  async (updatedHall: IHall) => {
    let requestHall = {
      ...updatedHall,
      seats: updatedHall!.seats.map((seat: ISeat) => {
        if (seat.sale === true) return { ...seat, reserved: seat.sale };
        return seat;
      }),
    } as IHall;

    try {
      const response = await HallService.reserveSeat(requestHall);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      throw new Error("ошибка");
    }
  }
);

export const unreserveSeat = createAsyncThunk(
  "hall/getHall",
  async (updatedHall: IHall) => {
    try {
      const response = await HallService.reserveSeat(updatedHall);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      throw new Error("ошибка");
    }
  }
);
