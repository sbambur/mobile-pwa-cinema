import * as AuthActionCreator from "./auth";
import * as HallActionCreator from "./hall";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthActionCreator,
  ...HallActionCreator,
};
