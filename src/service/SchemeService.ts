import $api, { ENDPOINTS } from "../http";
import { AxiosResponse } from "axios";
import { IScheme } from "models/scheme-model";

export default class SchemeService {
  static getScheme(): Promise<AxiosResponse<IScheme[]>> {
    return $api.get<IScheme[]>(ENDPOINTS.SCHEME);
  }
}
