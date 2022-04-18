import $api, { ENDPOINTS } from "../http";
import { AxiosResponse } from "axios";
import { IHall } from "models/hall-model";

export default class HallService {
  static getHalls(): Promise<AxiosResponse<IHall[]>> {
    return $api.get<IHall[]>(ENDPOINTS.HALLS);
  }

  static getOneHall(id: string): Promise<AxiosResponse<IHall>> {
    return $api.get<IHall>(`${ENDPOINTS.HALLS}/${id}`);
  }

  static reserveSeat(updatedHall: IHall): Promise<AxiosResponse<IHall[]>> {
    return $api.put(ENDPOINTS.HALLS, updatedHall);
  }
}
