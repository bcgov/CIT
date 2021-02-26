import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import createHistory from "history/createBrowserHistory";
import reducer from "./reducer";

export const history = createHistory();

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(loadingBarMiddleware());
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(loadingBarMiddleware(), createLogger());
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
