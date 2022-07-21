import $api, { ENDPOINTS } from "..";
import { AxiosResponse } from "axios";
import { ISession } from "models/session-model";

export default class SessionService {
  static getSessions(): Promise<AxiosResponse<ISession[]>> {
    return $api.get<ISession[]>(ENDPOINTS.SESSIONS);
  }

  static getOneSession(id: string): Promise<AxiosResponse<ISession>> {
    return $api.get<ISession>(`${ENDPOINTS.SESSIONS}/${id}`);
  }
}
