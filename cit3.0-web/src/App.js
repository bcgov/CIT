import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Header, Footer } from "shared-components";

import LoadingBar from "react-redux-loading-bar";
import { Spinner } from "react-bootstrap";
import OpportunityApprovePage from "./components/Page/OpportunityApprovePage/OpportunityApprovePage";
import AddOpportunity from "./components/Page/AddOpportunity/AddOpportunity";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";
import SiteInfomation from "./components/Page/SiteInformation/SiteInformation";
import PropertyDetails1 from "./components/Page/PropertyDetails1/PropertyDetails1";
import PropertyDetails2 from "./components/Page/PropertyDetails2/PropertyDetails2";
import ReviewOpportunity from "./components/Page/ReviewOpportunity/ReviewOpportunity";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import { AuthStateContext } from "./contexts/authStateContext";
import Login from "./components/Page/account/Login";

import ReviewSubmitted from "./components/Page/ReviewSubmitted/ReviewSubmitted";
import OpportunityPage from "./components/Page/OpportunityPage/OpportunityPage";
import AppRoute from "./utils/AppRoute/AppRoute";

function App() {
  // const location = useLocation();
  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  const getTitle = (page) => `Investments${` - ${page}`}`;

  const header = {
    name: "Community Information Tool",
    history: {},
  };

  return (
    <AuthStateContext.Consumer>
      {(context) => {
        if (!context.ready) {
          return <Spinner animation="border" />;
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
            <Header header={header} />
            <Router>
              <Switch>
                <Redirect exact from="/" to="/login" />
                <AppRoute
                  title={getTitle("Login")}
                  path="/login"
                  component={Login}
                />
                <AppRoute
                  title={getTitle("Opportunity Dashboard")}
                  path="/"
                  component={EDODashboard}
                />
                <AppRoute
                  path="/addOpportunity/"
                  title={getTitle("Add Opportunity Parcel")}
                  component={AddOpportunity}
                />
                <AppRoute
                  path="/addOpportunity/siteDetails"
                  title={getTitle("Opportunity Site Information")}
                  component={SiteInfomation}
                />
                <AppRoute
                  path="/addOpportunity/propDetails1"
                  title={getTitle("Add Property Details")}
                  component={PropertyDetails1}
                />
                <Route
                  path="/addOpportunity/propDetails2"
                  title={getTitle("Add Additional Details")}
                  component={PropertyDetails2}
                />
                <AppRoute
                  path="/addOpportunity/review"
                  title={getTitle("Opportunity Review & Submit")}
                  component={ReviewOpportunity}
                />
                <AppRoute
                  path="/addOpportunity/success"
                  title={getTitle("Opportunity Submitted!")}
                  component={ReviewSubmitted}
                />
                <AppRoute
                  path="/investment/*:path"
                  component={OpportunityPage}
                />
                <AppRoute
                  path="/investment/*:path/approve"
                  component={OpportunityApprovePage}
                />
                <AppRoute path="/search" component={FilterPanel} />
              </Switch>
            </Router>
            <div className="footer">
              <Footer />
            </div>
          </div>
        );
      }}
    </AuthStateContext.Consumer>
  );
}

export default App;
