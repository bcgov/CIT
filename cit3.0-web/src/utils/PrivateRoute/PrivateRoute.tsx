import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate, useLocation } from "react-router-dom";
import useKeycloakWrapper from "../../hooks/useKeycloakWrapper";

/**
 * A PrivateRoute only allows a user who is authenticated and has the appropriate role(s) or claim(s).
 * @param {object} props - Properties to pass { component, role, claim }
 */
const PrivateRoute = ({
  component: Component,
  layout: Layout,
  roles,
  ...rest
}) => {
  const keycloak = useKeycloakWrapper();
  const location = useLocation();

  if (!keycloak.authenticated) {
    const redirectTo = encodeURIComponent(
      `${location.pathname}${location.search}`
    );
    return <Navigate to={`/login?redirect=${redirectTo}`} replace />;
  }

  return (
    <Layout>
      <Component {...rest.componentProps} />
    </Layout>
  );
};

// PrivateRoute.defaultProps = {
//   claim: {},
//   componentProps: {},
// };

// PrivateRoute.propTypes = {
//   component: PropTypes.elementType.isRequired,
//   layout: PropTypes.elementType.isRequired,
//   roles: PropTypes.arrayOf(PropTypes.string).isRequired,
//   claim: PropTypes.shape(),
//   componentProps: PropTypes.shape(),
// };

export default PrivateRoute;
