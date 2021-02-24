import { combineReducers } from "redux";
import opportunity from "./reducers/opportunity";
import notification from "./reducers/notification";

export default combineReducers({
  opportunity,
  notification,
});
