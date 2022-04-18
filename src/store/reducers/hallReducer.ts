import { createSlice } from "@reduxjs/toolkit";
import { HallState } from "models/hall-model";
import * as hallAction from "store/actions/hall";

const initialState = {
  halls: [],
  loading: false,
} as HallState;

const hallSlice = createSlice({
  name: "hall",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hallAction.getHalls.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(hallAction.getHalls.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.halls = action.payload;
        }
      })
      .addCase(hallAction.getHalls.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(hallAction.getHall.fulfilled, (state, action) => {
        let newHalls = [
          ...state.halls.map((hall) => {
            if (hall.id === action.payload.id) {
              return action.payload;
            }
            return hall;
          }),
        ];
        state.halls = newHalls;
      });
  },
});

export default hallSlice;
