import { createSlice } from "@reduxjs/toolkit";
import { SessionState } from "models/session-model";
import * as sessionAction from "store/actions/sessions";

const initialState = {
  sessions: [],
  loading: false,
} as SessionState;

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sessionAction.getSessions.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(sessionAction.getSessions.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.sessions = action.payload;
        }
      })
      .addCase(sessionAction.getSessions.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(sessionAction.getSession.fulfilled, (state, action) => {
        let newHalls = [
          ...state.sessions.map((session) => {
            if (session.id === action.payload.id) {
              return action.payload;
            }
            return session;
          }),
        ];
        state.sessions = newHalls;
      });
  },
});

export default sessionSlice;
