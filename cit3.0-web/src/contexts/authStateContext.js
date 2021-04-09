import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";
import { useKeycloakWrapper } from "../hooks/useKeycloakWrapper";
import { getUser, postUser, setUser } from "../store/actions/user";
import UserFactory from "../store/factory/UserFactory";

export const AuthStateContext = React.createContext({
  ready: false,
});

const AuthStateContextProvider = ({ children }) => {
  const keycloak = useKeycloakWrapper();
  const [userInfo, setUserInfo] = React.useState(null);
  const keycloakReady = useSelector((state) => state.keycloakReady);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (keycloak.obj && keycloak.obj.authenticated) {
      const loadUserInfo = () => {
        keycloak.obj
          .loadUserInfo()
          .then((user) => {
            setUserInfo(user);
            getUser({ email: user.email }).then((existingUser) => {
              console.log(existingUser);
              if (existingUser.data.length) {
                dispatch(setUser(existingUser.data[0]));
              } else {
                postUser(
                  UserFactory.createStateFromKeyCloak(user),
                  keycloak.obj.token
                ).then((newUser) => {
                  dispatch(setUser(newUser.data));
                });
              }
            });
          })
          .catch((e) => {
            // eslint-disable-next-line
            console.error(e);
          });
      };
      loadUserInfo();
    }
  }, [keycloakReady]);

  return (
    <AuthStateContext.Provider
      value={{
        // if user info is not available when authenticated, then the auth state is not ready
        ready:
          keycloakReady &&
          keycloak.obj &&
          (!keycloak.obj.authenticated ||
            (keycloak.obj.authenticated && !!userInfo)),
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

AuthStateContextProvider.propTypes = { children: Proptypes.shape().isRequired };

export default AuthStateContextProvider;
