import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userSlice from "./reducers/authReducer";
import sessionSlice from "./reducers/sessionReducer";
import ticketSlice from "./reducers/ticketReducer";
import schemeSlice from "./reducers/schemeReducer";

const reducer = combineReducers({
  user: userSlice.reducer,
  hall: sessionSlice.reducer,
  ticket: ticketSlice.reducer,
  scheme: schemeSlice.reducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
