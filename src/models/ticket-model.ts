export interface ITicketReq {
  user: string;
  hall: string;
  seat: string;
  seatNumber: number;
  price: number;
  pos: {
    row: string;
    seat: string;
  };
}

export interface ITicket {
  id: string;
  user: string;
  hall: string;
  seat: string;
  seatNumber: number;
  price: number;
  pos: {
    row: number;
    seat: number;
  };
}

export interface TicketState {
  tickets: ITicket[];
  loading: boolean;
}
