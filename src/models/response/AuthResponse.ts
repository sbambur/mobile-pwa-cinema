import { IUser } from "models/user-model";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
