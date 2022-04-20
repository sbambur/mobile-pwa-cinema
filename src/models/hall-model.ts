interface IPos {
  row: number;
  seat: number;
}

export interface ISeatReq {
  seatNumber: number;
  price: number;
  reserved: boolean;
  pos: IPos;
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface ISeat {
  id: string;
  seatNumber: number;
  price: number;
  reserved: boolean;
  pos: IPos;
  height: number;
  width: number;
  x: number;
  y: number;
  sale?: boolean;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  title: string;
  vote_average?: number;
  runtime?: number;
  genres?: IGenres[];
  overview?: string;
  release_date?: string;
  poster_path?: string;
  backdrop_path?: string;
}

export interface IHall {
  id: string;
  title: string;
  reserved: boolean;
  active: boolean;
  date: Date | null;
  movie: IMovie | null;
  seats: ISeat[];
}

export interface HallState {
  halls: IHall[];
  loading: boolean;
}
