import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITicketReq } from "models/ticket-model";
import TicketService from "service/TicketService";

export const getTickets = createAsyncThunk(
  "ticket/getTickets",
  async (userId: string) => {
    try {
      const response = await TicketService.getAll(userId);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      throw new Error("ошибка");
    }
  }
);

export const saveTickets = createAsyncThunk(
  "ticket/saveTickets",
  async (tickets: ITicketReq[]) => {
    try {
      console.log(tickets);

      const response = await TicketService.create(tickets);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      throw new Error("ошибка");
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (ticketId: string) => {
    try {
      const response = await TicketService.delete(ticketId);
      return response.data;
    } catch (e: any) {
      console.log(e.response.data.message);
      throw new Error("ошибка");
    }
  }
);
