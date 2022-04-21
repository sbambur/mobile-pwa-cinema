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

export interface ISession {
  id: string;
  title: string;
  hall: string;
  active: boolean;
  date: Date | null;
  movie: IMovie | null;
}

export interface SessionState {
  sessions: ISession[];
  loading: boolean;
}
