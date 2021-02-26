import React from "react";
import Proptypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
/**
 * @todo: Find our sets of action interfaces
 */
import { useKeycloakWrapper } from "../../hooks/useKeycloakWrapper";

/**
 * A PrivateRoute only allows a user who is authenticated and has the appropriate role(s) or claim(s).
 * @param props - Properties to pass { component, role, claim }
 */
const PrivateRoute = (props) => {
  const keycloak = useKeycloakWrapper();
  const { component: Component, layout: Layout, ...rest } = props;
  /* eslint consistent-return: "off" */
  return (
    <Route
      {...rest}
      render={(subprops) => {
        if (keycloak.obj && !!keycloak.obj.authenticated) {
          // if (
          //   (!rest.role && !rest.claim) ||
          //   keycloak.hasRole(rest.role) ||
          //   keycloak.hasClaim(rest.claim)
          // ) {
          return (
            <Layout>
              <Component {...subprops} {...rest.componentProps} />
            </Layout>
          );
        }
        // return (
        //   <Redirect
        //     to={{
        //       pathname: "/forbidden",
        //       state: { referer: subprops.location },
        //     }}
        //   />
        // );
        // }
        if (subprops.location.pathname !== "/login") {
          const redirectTo = encodeURI(
            `${location.pathname}${location.search}`
          );
          return <Redirect to={`/login?redirect=${redirectTo}`} />;
        }
      }}
    />
  );
};

PrivateRoute.defaultProps = {
  role: {},
  claim: {},
  componentProps: {},
};

PrivateRoute.propTypes = {
  component: Proptypes.func.isRequired,
  layout: Proptypes.func.isRequired,
  location: Proptypes.shape().isRequired,
  role: Proptypes.shape(),
  claim: Proptypes.shape(),
  componentProps: Proptypes.shape(),
};

export default PrivateRoute;
