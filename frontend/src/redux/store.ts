import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";

import { rootReducer } from "./reducers";

const initialState = {};

const middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger());
}

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);
