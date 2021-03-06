import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { createBrowserHistory } from "history";
import reducer from "./reducer";

export const history = createBrowserHistory();

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(loadingBarMiddleware());
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(thunk, loadingBarMiddleware(), createLogger());
};

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
