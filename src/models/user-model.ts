export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export interface UserState {
  loading: "idle" | "pending";
  user: IUser;
  isAuth: boolean;
}
