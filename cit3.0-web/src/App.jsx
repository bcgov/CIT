import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-v5-theme/css/bootstrap-theme.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoadingBar from "react-redux-loading-bar";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import Header from "./components/Headers/Header/Header";
import Datasources from "./components/Page/Datasources/Datasources";
import { useContext } from "react";
import { AuthStateContext } from "./contexts/authStateContext";
import Login from "./components/Page/account/Login";
import Logout from "./components/Page/account/Logout";
import UserStory from "./components/Page/UserStory/UserStory";
import AccessDenied from "./components/Page/Errors/401/AccessDenied";
import AppRoute from "./utils/AppRoute/AppRoute";
import AuthLayout from "./layouts/AuthLayout";
import PowerBi from "./components/Page/PowerBi/PowerBi";
import PublicReport from "./components/Page/PowerBi/PublicReport";
import Compare from "./components/Page/PowerBi/Compare";
import CriteriaSearch from "./components/Page/PowerBi/CriteriaSearch";
import PublicLayout from "./layouts/PublicLayout";

function App() {
  const context = useContext(AuthStateContext);
  if (!context.ready) {
    return (
      <PublicLayout>
        <main className="center-spinner">
          <Spinner animation="border" />
        </main>
      </PublicLayout>
    );
  }

  return (
    <div className="app-container">
      <LoadingBar
        style={{
          zIndex: 9999,
          backgroundColor: "#fcba19",
          height: "3px",
        }}
      />
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/cit-dashboard/home" replace />}
          />
          <Route
            path="/cit-dashboard"
            element={<Navigate to="/cit-dashboard/home" replace />}
          />
          <Route
            path="/login"
            element={<AppRoute title="Login" element={Login} />}
          />
          <Route
            path="/logout"
            element={<AppRoute title="Logout" component={Logout} />}
          />
          <Route
            path="/forbidden"
            element={
              <AppRoute
                title="Access Denied - Login to continue"
                component={AccessDenied}
              />
            }
          />
          {/* TODO: turn this into a protected route */}
          <Route
            path="/cit-dashboard/internal"
            element={
              <AppRoute
                protected
                layout={AuthLayout}
                title="Community Information Tool - Internal Report"
                component={PowerBi}
              />
            }
          />
          <Route
            path="/cit-dashboard/public"
            element={
              <AppRoute
                title="Community Information Tool - Community Report"
                component={PowerBi}
              />
            }
          />
          <Route
            path="/cit-dashboard/info/:zonetype/:id"
            element={
              <AppRoute
                title="Community Information Tool - Community Report"
                component={PublicReport}
              />
            }
          />
          <Route
            path="/cit-dashboard/info/:zonetype/name/:name"
            element={
              <AppRoute
                title="Community Information Tool - Community Report"
                component={PublicReport}
              />
            }
          />
          <Route
            path="/cit-dashboard/home"
            element={
              <AppRoute
                title="Community Information Tool"
                component={UserStory}
              />
            }
          />
          <Route
            path="/userstory"
            element={
              <AppRoute
                title="Community Information Tool"
                component={UserStory}
              />
            }
          />
          <Route
            path="/userstory/internal"
            element={
              <AppRoute
                title="Community Information Tool"
                component={UserStory}
              />
            }
          />
          <Route
            path="/reports/publicreport"
            element={
              <AppRoute
                title="Community Information Tool"
                component={PublicReport}
              />
            }
          />
          <Route
            path="/reports/Compare"
            element={
              <AppRoute
                title="Community Information Tool"
                component={Compare}
              />
            }
          />
          <Route
            path="/reports/criteriasearch"
            element={
              <AppRoute
                title="Community Information Tool"
                component={CriteriaSearch}
              />
            }
          />
          <Route
            path="/datasources"
            element={
              <AppRoute
                title="Community Information Tool - Data Sources"
                component={Datasources}
              />
            }
          />
        </Routes>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
