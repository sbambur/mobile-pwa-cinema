interface IPos {
  row: string;
  seat: string;
}

export interface ISeat {
  id: string;
  seatNumber: number;
  price: number;
  pos: IPos;
  sale?: boolean;
}

export interface IScheme {
  id: string;
  title: string;
  seats: ISeat[];
}
export interface SchemeState {
  scheme: IScheme[];
  loading: boolean;
}
