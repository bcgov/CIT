import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Footer } from "shared-components";
import LoadingBar from "react-redux-loading-bar";
import Header from "./components/Headers/Header/Header";

import OpportunityApprovePage from "./components/Page/OpportunityApprovePage/OpportunityApprovePage";
import AddOpportunity from "./components/Page/AddOpportunity/AddOpportunity";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";
import SiteInfomation from "./components/Page/SiteInformation/SiteInformation";
import PropertyDetails1 from "./components/Page/PropertyDetails1/PropertyDetails1";
import PropertyDetails2 from "./components/Page/PropertyDetails2/PropertyDetails2";
import ReviewOpportunity from "./components/Page/ReviewOpportunity/ReviewOpportunity";
import { AuthStateContext } from "./contexts/authStateContext";
import Login from "./components/Page/account/Login";
import Logout from "./components/Page/account/Logout";
import Flyout from "./components/Flyout/Flyout";
import AccessDenied from "./components/Page/401/AccessDenied";

import ReviewSubmitted from "./components/Page/ReviewSubmitted/ReviewSubmitted";
import OpportunityPage from "./components/Page/OpportunityPage/OpportunityPage";
import AppRoute from "./utils/AppRoute/AppRoute";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  const getTitle = (page) => `Investments${` - ${page}`}`;

  const header = {
    name: "Community Information Tool",
    history: {},
  };

  return (
    <AuthStateContext.Consumer>
      {() => (
        <div className="app-container">
          <LoadingBar
            style={{
              zIndex: 9999,
              backgroundColor: "#fcba19",
              height: "3px",
            }}
          />
          <Header header={header} />
          <Router>
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
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
                title={getTitle("Opportunity Dashboard")}
                path="/dashboard"
                component={EDODashboard}
              />
              <AppRoute
                protected
                path="/addOpportunity/"
                title={getTitle("Add Opportunity Parcel")}
                layout={AuthLayout}
                component={AddOpportunity}
              />
              <AppRoute
                protected
                path="/addOpportunity/siteDetails"
                title={getTitle("Opportunity Site Information")}
                layout={AuthLayout}
                component={SiteInfomation}
              />
              <AppRoute
                protected
                path="/addOpportunity/propDetails1"
                title={getTitle("Add Property Details")}
                layout={AuthLayout}
                component={PropertyDetails1}
              />
              <Route
                protected
                path="/addOpportunity/propDetails2"
                title={getTitle("Add Additional Details")}
                layout={AuthLayout}
                component={PropertyDetails2}
              />
              <AppRoute
                protected
                path="/addOpportunity/review"
                title={getTitle("Opportunity Review & Submit")}
                layout={AuthLayout}
                component={ReviewOpportunity}
              />
              <AppRoute
                protected
                path="/addOpportunity/success"
                title={getTitle("Opportunity Submitted!")}
                layout={AuthLayout}
                component={ReviewSubmitted}
              />
              <AppRoute path="/investment/*:path" component={OpportunityPage} />
              <AppRoute
                protected
                path="/investment/*:path/approve"
                layout={AuthLayout}
                component={OpportunityApprovePage}
              />
              <AppRoute path="/search" component={Flyout} />
            </Switch>
          </Router>
          <div className="footer">
            <Footer />
          </div>
        </div>
      )}
    </AuthStateContext.Consumer>
  );
}

export default App;
