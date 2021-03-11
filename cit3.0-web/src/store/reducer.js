import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import opportunity from "./reducers/opportunity";
import notification from "./reducers/notification";
import options from "./reducers/options";
import keycloakReadySlice from "./reducers/keycloakReadySlice";
import jwtSlice from "./reducers/JwtSlice";
import networkReducer from "./reducers/networkReducer";

export default combineReducers({
  opportunity,
  notification,
  options,
  loadingBar: loadingBarReducer,
  keycloakReady: keycloakReadySlice.reducer,
  jwt: jwtSlice.reducer,
  network: networkReducer,
});
