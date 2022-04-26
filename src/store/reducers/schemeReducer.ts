import { createSlice } from "@reduxjs/toolkit";
import { SchemeState } from "models/scheme-model";
import * as schemeAction from "store/actions/scheme";

const initialState = {
  scheme: [],
  loading: false,
} as SchemeState;

const schemeSlice = createSlice({
  name: "scheme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(schemeAction.getScheme.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(schemeAction.getScheme.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.scheme = action.payload;
        }
      })
      .addCase(schemeAction.getScheme.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      });
  },
});

export default schemeSlice;
