import { saveJwt, clearJwt } from "../store/reducers/JwtSlice";
import { setKeycloakReady } from "../store/reducers/keycloakReadySlice";
import { store } from "../store";

const getKeycloakEventHandler = (keycloak) => {
  const keycloakEventHandler = (event, error) => {
    if (event === "onAuthSuccess") {
      if (keycloak.token) {
        store.dispatch(saveJwt(keycloak.token));
      }
    } else if (event === "onAuthRefreshSuccess") {
      if (keycloak.token) {
        store.dispatch(saveJwt(keycloak.token));
      }
    } else if (event === "onAuthLogout") {
      store.dispatch(clearJwt());
    } else if (event === "onReady") {
      store.dispatch(setKeycloakReady(true));
    } else {
      // TODO: log error properly
      console.debug(`keycloak event: ${event} error ${error}`);
    }
  };
  return keycloakEventHandler;
};

export default getKeycloakEventHandler;
