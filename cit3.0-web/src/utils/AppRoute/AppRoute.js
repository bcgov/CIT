import React, { useLayoutEffect } from "react";
import Proptypes from "prop-types";
import { useLocation, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicLayout from "../../layouts/PublicLayout";

const AppRoute = ({
  component: Component,
  layout,
  protected: usePrivateRoute,
  role,
  claim,
  title,
  ...rest
}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const keycloakReady = useSelector((state) => state.keycloakReady);
  if (!keycloakReady) {
    return (
      <main className="center-spinner">
        <Spinner animation="border" />
      </main>
    );
  }

  /* eslint react/prop-types: "off" */
  const Layout =
    layout === undefined ? (props) => <>{props.children}</> : layout;

  document.title = title;

  if (usePrivateRoute) {
    return (
      <PrivateRoute
        {...rest}
        component={Component}
        layout={Layout}
        role={role}
        claim={claim}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <main>
          <Component {...props} />
        </main>
      )}
    />
  );
};

AppRoute.defaultProps = {
  layout: () => <PublicLayout />,
  protected: false,
  role: {},
  claim: {},
  title: "Community Information Tool",
};

AppRoute.propTypes = {
  component: Proptypes.func.isRequired,
  layout: Proptypes.func,
  protected: Proptypes.bool,
  role: Proptypes.shape(),
  claim: Proptypes.shape(),
  title: Proptypes.string,
};

export default AppRoute;
