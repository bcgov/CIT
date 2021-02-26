import React from "react";
import Proptypes from "prop-types";
import { Route } from "react-router-dom";
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
        <PublicLayout>
          <Component {...props} />
        </PublicLayout>
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
