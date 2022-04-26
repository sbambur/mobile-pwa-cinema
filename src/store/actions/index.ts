import * as AuthActionCreator from "./auth";
import * as HallActionCreator from "./sessions";
import * as TicketActionCreator from "./ticket";
import * as SchemeActionCreator from "./scheme";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...AuthActionCreator,
  ...HallActionCreator,
  ...TicketActionCreator,
  ...SchemeActionCreator,
};
