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
import Datasources from "./components/Page/Datasources/Datasources";
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
import UserManagementDashboard from "./components/Page/UserManagement/UserManagementDashboard";

import PowerBi from "./components/Page/PowerBi/PowerBi";
import PowerBiPublic from "./components/Page/PowerBi/PowerBiPublic";

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
                <Redirect exact from="/" to="/cit-dashboard/home" />
                <Redirect
                  exact
                  from="/investmentopportunities"
                  to="/investmentopportunities/home"
                />
                <Redirect
                  exact
                  from="/cit-dashboard"
                  to="/cit-dashboard/home"
                />
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
                  path="/investmentopportunities/dashboard"
                  roles={[Roles.ECONOMIC_DEVELOPMENT_OFFICER]}
                  layout={AuthLayout}
                  component={EDODashboard}
                />
                <AppRoute
                  protected
                  exact
                  path="/investmentopportunities/add"
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
                  path="/investmentopportunities/site-info"
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
                  path="/investmentopportunities/property-details"
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
                  path="/investmentopportunities/additional-details"
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
                  path="/investmentopportunities/review"
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
                  path="/investmentopportunities/success"
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
                  path="/manage/investmentopportunities"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApproveListPage}
                />
                <AppRoute
                  path="/investmentopportunities/view/*:path"
                  component={OpportunityPage}
                />
                <AppRoute
                  protected
                  path="/manage/investmentopportunities/view/*:path"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApprovePage}
                />
                <AppRoute
                  path="/investmentopportunities/search"
                  component={InvestorMainView}
                />
                <AppRoute
                  protected
                  path="/delete/investmentopportunities/*:path"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.ECONOMIC_DEVELOPMENT_OFFICER,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityDeletePage}
                />
                <AppRoute
                  protected
                  path="/cit-dashboard/internal"
                  layout={AuthLayout}
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  component={PowerBi}
                />
                <AppRoute
                  path="/cit-dashboard/public"
                  component={PowerBiPublic}
                />
                <AppRoute
                  protected
                  exact
                  path="/manage/users"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={UserManagementDashboard}
                />

                <AppRoute
                  path="/investmentopportunities/home"
                  component={HomePage}
                />
                <AppRoute path="/cit-dashboard/home" component={citHome} />
                <AppRoute path="/datasources" component={Datasources} />
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
