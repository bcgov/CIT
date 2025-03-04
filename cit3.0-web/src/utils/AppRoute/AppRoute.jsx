import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import PublicLayout from "../../layouts/PublicLayout";

const AppRoute = ({
  component: Component,
  layout: Layout = PublicLayout,
  title = "Community Information Tool",
  ...rest
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Set the current application the user is using
    if (location.pathname.startsWith("/cit-dashboard")) {
      localStorage.setItem("currentAppHome", "/cit-dashboard/home");
    }
    // On page change start at the top of it
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Show loading spinner until keycloak is ready
  const keycloakReady = useSelector((state) => state.keycloakReady);
  if (!keycloakReady) {
    return (
      <main className="center-spinner">
        <Spinner animation="border" />
      </main>
    );
  }

  return (
    <main>
      {title && (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
      <Layout>
        <Component {...rest} />
      </Layout>
    </main>
  );
};

export default AppRoute;
