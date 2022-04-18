import $api, { ENDPOINTS } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(ENDPOINTS.LOGIN, { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(ENDPOINTS.REGISTRATION, { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post(ENDPOINTS.LOGOUT);
  }
}
