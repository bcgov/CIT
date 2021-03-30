import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { Footer } from "shared-components";
import LoadingBar from "react-redux-loading-bar";
import { Spinner } from "react-bootstrap";
import Header from "./components/Headers/Header/Header";

import OpportunityApprovePage from "./components/Page/OpportunityApprovePage/OpportunityApprovePage";
import AddOpportunity from "./components/Page/AddOpportunity/AddOpportunity";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";
import SiteInfomation from "./components/Page/SiteInformation/SiteInformation";
import PropertyDetails1 from "./components/Page/PropertyDetails1/PropertyDetails1";
import PropertyDetails2 from "./components/Page/PropertyDetails2/PropertyDetails2";
import ReviewOpportunity from "./components/Page/ReviewOpportunity/ReviewOpportunity";
import OpportunityDeletePage from "./components/Page/OpportunityDeletePage/OpportunityDeletePage";
import { AuthStateContext } from "./contexts/authStateContext";
import Login from "./components/Page/account/Login";
import Logout from "./components/Page/account/Logout";
import AccessDenied from "./components/Page/Errors/401/AccessDenied";

import ReviewSubmitted from "./components/Page/ReviewSubmitted/ReviewSubmitted";
import OpportunityPage from "./components/Page/OpportunityPage/OpportunityPage";
import AppRoute from "./utils/AppRoute/AppRoute";
import AuthLayout from "./layouts/AuthLayout";
import InvestorMainView from "./components/Page/InvestorMainView/InvestorMainView";
import OpportunityApproveListPage from "./components/Page/OpportunityApproveListPage/OpportunityApproveListPage";

import Roles from "./constants/roles";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./components/Page/HomePage/HomePage";
import citHome from "./components/Page/citHome/citHome";

function App() {
  const getTitle = (page) => `Investments${` - ${page}`}`;

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
                <Redirect exact from="/" to="/home" />
                <AppRoute
                  title={getTitle("Login")}
                  path="/login"
                  component={Login}
                />
                <AppRoute
                  title={getTitle("Logout")}
                  path="/logout"
                  component={Logout}
                />
                <AppRoute
                  title={getTitle("Access Denied - Login to continue")}
                  path="/forbidden"
                  component={AccessDenied}
                />
                <AppRoute
                  protected
                  title={getTitle("Opportunity Dashboard")}
                  path="/dashboard"
                  roles={[Roles.ECONOMIC_DEVELOPMENT_OFFICER]}
                  layout={AuthLayout}
                  component={EDODashboard}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity"
                  title={getTitle("Add Property")}
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  layout={AuthLayout}
                  component={AddOpportunity}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity/site-info"
                  title={getTitle("Site Information")}
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  layout={AuthLayout}
                  component={SiteInfomation}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity/property-details"
                  title={getTitle("Add Property Details")}
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  layout={AuthLayout}
                  component={PropertyDetails1}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity/additional-details"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  title={getTitle("Add Additional Details")}
                  layout={AuthLayout}
                  component={PropertyDetails2}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity/review"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  title={getTitle("Opportunity Review & Submit")}
                  layout={AuthLayout}
                  component={ReviewOpportunity}
                />
                <AppRoute
                  protected
                  exact
                  path="/opportunity/success"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  title={getTitle("Opportunity Submitted!")}
                  layout={AuthLayout}
                  component={ReviewSubmitted}
                />
                <AppRoute
                  protected
                  exact
                  path="/manage/opportunities"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApproveListPage}
                />
                <AppRoute
                  path="/opportunity/*:path"
                  component={OpportunityPage}
                />
                <AppRoute
                  protected
                  path="/manage/opportunity/*:path"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApprovePage}
                />
                <AppRoute
                  protected
                  path="/delete/opportunity/*:path"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityDeletePage}
                />
                <AppRoute path="/search" component={InvestorMainView} />
                <AppRoute path="/home" component={HomePage} />
                <AppRoute path="/cit-home" component={citHome} />
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
