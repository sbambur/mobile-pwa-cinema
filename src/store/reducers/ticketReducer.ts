import { createSlice } from "@reduxjs/toolkit";
import { TicketState } from "models/ticket-model";
import * as ticketActions from "store/actions/ticket";

const initialState = {
  tickets: [],
  loading: false,
} as TicketState;

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ticketActions.getTickets.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(ticketActions.getTickets.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.tickets = action.payload;
        }
      })
      .addCase(ticketActions.getTickets.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
        }
      })
      .addCase(ticketActions.deleteTicket.fulfilled, (state, action) => {
        let newTickets = state.tickets.map((ticket) => {
          if (ticket.id === action.payload.id) {
            return action.payload;
          }
          return ticket;
        });

        state.tickets = newTickets;
      });
  },
});

export default ticketSlice;
