export interface IUser {
  id: string;
  email: string;
  isActivated: boolean;
}

export interface UserState {
  loading: boolean;
  user: IUser;
  isAuth: boolean;
}
