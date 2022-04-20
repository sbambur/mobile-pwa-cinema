import * as AuthActionCreator from "./auth";
import * as HallActionCreator from "./hall";
import * as TicketActionCreator from "./ticket";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthActionCreator,
  ...HallActionCreator,
  ...TicketActionCreator,
};
