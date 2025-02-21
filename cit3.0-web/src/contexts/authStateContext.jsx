import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthProvider";
import { getUser, setUser } from "../store/actions/user";
import useConfiguration from "../hooks/useConfiguration";

export const AuthStateContext = React.createContext({
  ready: false,
});

const AuthStateContextProvider = ({ children }) => {
  const { keycloak, isAuthenticated, initialized } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const configuration = useConfiguration();

  useEffect(() => {
    if (!initialized) return; // Wait until Keycloak is initialized

    if (isAuthenticated) {
      keycloak
        .loadUserInfo()
        .then((user) => {
          if (!user.email) {
            keycloak.clearToken();
            return;
          }

          setUserInfo(user);
          getUser({ email: user.email }).then((existingUser) => {
            if (existingUser.data.length) {
              dispatch(setUser(existingUser.data[0]));
            }
          });
        })
        .catch(() => {
          keycloak.clearToken();
        });
    }

    setReady(true);
  }, [initialized, isAuthenticated]);

  return (
    <AuthStateContext.Provider value={{ ready }}>
      {children}
    </AuthStateContext.Provider>
  );
};

export default AuthStateContextProvider;
