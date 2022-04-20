import $api, { ENDPOINTS } from "../http";
import { AxiosResponse } from "axios";
import { ITicket } from "models/ticket-model";

export default class TicketService {
  static async getAll(userId: string): Promise<AxiosResponse<ITicket[]>> {
    return $api.get<ITicket[]>(`${ENDPOINTS.TICKETS}/${userId}`);
  }

  static async create(tickets: ITicket[]): Promise<AxiosResponse<ITicket>> {
    return $api.post<ITicket>(ENDPOINTS.TICKETS, tickets);
  }

  static async delete(ticketId: string): Promise<AxiosResponse<ITicket>> {
    return $api.post<ITicket>(`${ENDPOINTS.TICKETS}/${ticketId}`);
  }
}
