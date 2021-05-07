import React, { useLayoutEffect } from "react";
import Proptypes from "prop-types";
import { useLocation, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicLayout from "../../layouts/PublicLayout";

const AppRoute = ({
  component: Component,
  layout,
  protected: usePrivateRoute,
  roles,
  title,
  ...rest
}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    // Set the current application the user is using
    if (location.pathname.startsWith("/cit-dashboard")) {
      localStorage.setItem("currentAppHome", "/cit-dashboard/home");
    }
    if (location.pathname.startsWith("/investmentopportunities")) {
      localStorage.setItem("currentAppHome", "/investmentopportunities/home");
    }
    // On page change start at the top of it
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  let route = (
    <Route
      {...rest}
      render={(props) => (
        <main>
          <Component {...props} />
        </main>
      )}
    />
  );

  const keycloakReady = useSelector((state) => state.keycloakReady);
  if (!keycloakReady) {
    route = (
      <main className="center-spinner">
        <Spinner animation="border" />
      </main>
    );
  }

  /* eslint react/prop-types: "off" */
  const Layout =
    layout === undefined ? (props) => <>{props.children}</> : layout;

  if (usePrivateRoute) {
    route = (
      <PrivateRoute
        {...rest}
        component={Component}
        layout={Layout}
        roles={roles}
      />
    );
  }

  return (
    <>
      {title !== "" ? (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      ) : null}
      {route}
    </>
  );
};

AppRoute.defaultProps = {
  layout: () => <PublicLayout />,
  protected: false,
  roles: [],
  title: "Community Information Tool",
};

AppRoute.propTypes = {
  component: Proptypes.func.isRequired,
  layout: Proptypes.func,
  protected: Proptypes.bool,
  roles: Proptypes.arrayOf(Proptypes.string),
  title: Proptypes.string,
};

export default AppRoute;
