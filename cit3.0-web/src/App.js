import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import LoadingBar from "react-redux-loading-bar";
import { Spinner } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
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

import Roles from "./constants/roles";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./components/Page/HomePage/HomePage";
import citHome from "./components/Page/citHome/citHome";

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
                  from="/investmentopportunities"
                  to="/investmentopportunities/home"
                />
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
                  title="Community Investment Opportunities Tool - Dashboard"
                  path="/investmentopportunities/dashboard"
                  roles={[Roles.ECONOMIC_DEVELOPMENT_OFFICER]}
                  layout={AuthLayout}
                  component={EDODashboard}
                />
                <AppRoute
                  protected
                  exact
                  path="/investmentopportunities/add"
                  title="Community Investment Opportunities Tool - Add Property"
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
                  title="Community Investment Opportunities Tool - Site Information"
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
                  title="Community Investment Opportunities Tool - Add Property Details"
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
                  title="Community Investment Opportunities Tool - Add Additional Details"
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
                  title="Community Investment Opportunities Tool - Opportunity Review & Submit"
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
                  title="Community Investment Opportunities Tool - Opportunity Submitted!"
                  layout={AuthLayout}
                  component={ReviewSubmitted}
                />
                <AppRoute
                  protected
                  exact
                  path="/manage/investmentopportunities"
                  title="Community Investment Opportunities Tool - Opportunity Management"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApproveListPage}
                />
                <AppRoute
                  path="/investmentopportunities/view/*:path"
                  title="Community Investment Opportunities Tool - Opportunity Listing"
                  component={OpportunityPage}
                />
                <AppRoute
                  protected
                  path="/manage/investmentopportunities/view/*:path"
                  title="Community Investment Opportunities Tool - Opportunity Approval"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={OpportunityApprovePage}
                />
                <AppRoute
                  path="/investmentopportunities/search"
                  title="Community Investment Opportunities Tool - Search Investment Opportunities"
                  component={InvestorMainView}
                />
                <AppRoute
                  protected
                  path="/delete/investmentopportunities/*:path"
                  title="Community Investment Opportunities Tool - Delete an Opportunity"
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
                  title="Community Information Tool - Internal Report"
                  layout={AuthLayout}
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                    Roles.POWER_BI_VIEWER,
                  ]}
                  component={PowerBi}
                />
                <AppRoute
                  title="Community Information Tool - Community Report"
                  path="/cit-dashboard/public"
                  component={PowerBi}
                />
                <AppRoute
                  protected
                  exact
                  path="/manage/users"
                  title="Community Information Tool - User Management"
                  roles={[
                    Roles.SUPER_ADMINISTRATOR,
                    Roles.SYSTEM_ADMINISTRATOR,
                  ]}
                  layout={AuthLayout}
                  component={UserManagementDashboard}
                />

                <AppRoute
                  path="/investmentopportunities/home"
                  title="Community Investment Opportunities Tool"
                  component={HomePage}
                />
                <AppRoute
                  path="/cit-dashboard/home"
                  title="Community Information Tool"
                  component={citHome}
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
