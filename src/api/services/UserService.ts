import $api, { ENDPOINTS } from "..";
import { AxiosResponse } from "axios";
import { IUser } from "models/user-model";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>(ENDPOINTS.USERS);
  }
}
