import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoadingBar from "react-redux-loading-bar";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import Header from "./components/Headers/Header/Header";
import Datasources from "./components/Page/Datasources/Datasources";
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
  return (
    <AuthStateContext.Consumer>
      {(context) => {
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
              <Switch>
                <Redirect exact from="/" to="/cit-dashboard/home" />
                <Redirect
                  exact
                  from="/cit-dashboard"
                  to="/cit-dashboard/home"
                />
                <AppRoute title="Login" path="/login" component={Login} />
                <AppRoute title="Logout" path="/logout" component={Logout} />
                <AppRoute
                  title="Access Denied - Login to continue"
                  path="/forbidden"
                  component={AccessDenied}
                />
                <AppRoute
                  protected
                  path="/cit-dashboard/internal"
                  title="Community Information Tool - Internal Report"
                  layout={AuthLayout}
                  component={PowerBi}
                />
                <AppRoute
                  title="Community Information Tool - Community Report"
                  path="/cit-dashboard/public"
                  component={PowerBi}
                />
                <AppRoute
                  title="Community Information Tool - Community Report"
                  exact
                  path="/cit-dashboard/info/:zonetype/:id"
                  component={PublicReport}
                />
                <AppRoute
                  title="Community Information Tool - Community Report"
                  exact
                  path="/cit-dashboard/info/:zonetype/name/:name"
                  component={PublicReport}
                />
                <AppRoute
                  path="/cit-dashboard/home"
                  title="Community Information Tool"
                  component={UserStory}
                />
                <AppRoute
                  exact
                  path="/userstory"
                  title="Community Information Tool"
                  component={UserStory}
                />
                <AppRoute
                  exact
                  path="/userstory/internal"
                  title="Community Information Tool"
                  component={UserStory}
                />
                <AppRoute
                  exact
                  path="/reports/publicreport"
                  title="Community Information Tool"
                  component={PublicReport}
                />
                <AppRoute
                  exact
                  path="/reports/Compare"
                  title="Community Information Tool"
                  component={Compare}
                />
                <AppRoute
                  exact
                  path="/reports/criteriasearch"
                  title="Community Information Tool"
                  component={CriteriaSearch}
                />
                <AppRoute
                  path="/datasources"
                  title="Community Information Tool - Data Sources"
                  component={Datasources}
                />
              </Switch>
              <div className="footer">
                <Footer />
              </div>
            </Router>
          </div>
        );
      }}
    </AuthStateContext.Consumer>
  );
}

export default App;
