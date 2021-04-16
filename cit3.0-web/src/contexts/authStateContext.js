import * as React from "react";
import { Modal } from "react-bootstrap";
import { Button as SharedButton } from "shared-components";
import { useDispatch, useSelector } from "react-redux";
import Proptypes from "prop-types";
import { useKeycloakWrapper } from "../hooks/useKeycloakWrapper";
import {
  getUser,
  postUser,
  setUser,
  updateUserAssignments,
} from "../store/actions/user";
import UserFactory from "../store/factory/UserFactory";
import useConfiguration from "../hooks/useConfiguration";

export const AuthStateContext = React.createContext({
  ready: false,
});

const AuthStateContextProvider = ({ children }) => {
  const keycloak = useKeycloakWrapper();
  const [userInfo, setUserInfo] = React.useState(null);
  const keycloakReady = useSelector((state) => state.keycloakReady);
  const dispatch = useDispatch();

  // Handle modal on error
  const configuration = useConfiguration();
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    keycloak.obj.logout({
      redirectUri: `${configuration.baseUrl}`,
    });
  };

  React.useEffect(() => {
    if (keycloak.obj && keycloak.obj.authenticated) {
      let idp = "";
      const loadUserInfo = () => {
        keycloak.obj
          .loadUserInfo()
          .then((user) => {
            if (!user.email) {
              keycloak.obj.clearToken();
              handleShow();
              return;
            }
            idp = user.preferred_username.slice(
              user.preferred_username.indexOf("@") + 1
            );
            setUserInfo({ ...user, idp });
            getUser({ email: user.email }).then((existingUser) => {
              if (existingUser.data.length) {
                dispatch(setUser({ ...existingUser.data[0], idp }));
                if (
                  existingUser.data[0].is_admin === false &&
                  user.roles.some((role) => role === "IDIR")
                ) {
                  const updatedUser = { ...existingUser.data[0] };
                  updatedUser.is_admin = true;
                  updateUserAssignments(updatedUser, keycloak.obj.token)
                    .then(() => {})
                    .catch(() => {});
                }
              } else {
                postUser(
                  UserFactory.createStateFromKeyCloak(user),
                  keycloak.obj.token
                ).then((newUser) => {
                  dispatch(setUser({ ...newUser.data, idp }));
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
    <>
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
      <Modal
        show={show}
        centered
        backdrop="static"
        onHide={handleClose}
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>There was a problem logging you in!</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            There does not appear to be an email associated with this account.
            Please add an email to your account and try again.
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <SharedButton
            label="Close"
            styling="bcgov-normal-blue modal-save-button btn"
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

AuthStateContextProvider.propTypes = { children: Proptypes.shape().isRequired };

export default AuthStateContextProvider;
