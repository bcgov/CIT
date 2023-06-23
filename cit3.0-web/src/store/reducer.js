import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
// import notification from "./reducers/notification";
import options from "./reducers/options";
// import user from "./reducers/user";
import keycloakReadySlice from "./reducers/keycloakReadySlice";
import jwtSlice from "./reducers/JwtSlice";
import networkReducer from "./reducers/networkReducer";

export default combineReducers({
  // notification,
  options,
  // user,
  loadingBar: loadingBarReducer,
  keycloakReady: keycloakReadySlice.reducer,
  jwt: jwtSlice.reducer,
  network: networkReducer,
});
