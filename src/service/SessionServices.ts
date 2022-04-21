import $api, { ENDPOINTS } from "../http";
import { AxiosResponse } from "axios";
import { ISession } from "models/session-model";

export default class SessionService {
  static getHalls(): Promise<AxiosResponse<ISession[]>> {
    return $api.get<ISession[]>(ENDPOINTS.SESSIONS);
  }

  static getOneHall(id: string): Promise<AxiosResponse<ISession>> {
    return $api.get<ISession>(`${ENDPOINTS.SESSIONS}/${id}`);
  }
}
