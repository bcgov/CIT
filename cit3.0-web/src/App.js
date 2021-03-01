import "bootstrap/dist/css/bootstrap.css";
import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import { Header, Footer } from "shared-components";
import AddOpportunity from "./components/Page/AddOpportunity/AddOpportunity";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";
import SiteInfomation from "./components/Page/SiteInformation/SiteInformation";
import PropertyDetails1 from "./components/Page/PropertyDetails1/PropertyDetails1";
import PropertyDetails2 from "./components/Page/PropertyDetails2/PropertyDetails2";
import ReviewOpportunity from "./components/Page/ReviewOpportunity/ReviewOpportunity";
import Flyout from "./components/Flyout/Flyout";

import { store } from "./store";
import ReviewSubmitted from "./components/Page/ReviewSubmitted/ReviewSubmitted";
import OpportunityPage from "./components/Page/OpportunityPage/OpportunityPage";

function App() {
  const header = {
    name: "Community Information Tool",
    history: {},
  };

  return (
    <Provider store={store}>
      <div className="app-container">
        <Header header={header} />
        <Router>
          <Switch>
            <Route exact path="/">
              <EDODashboard />
            </Route>
            <Route
              path="/addOpportunity"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={AddOpportunity} exact />
                  <Route
                    path={`${url}/siteDetails`}
                    component={SiteInfomation}
                    exact
                  />
                  <Route
                    path={`${url}/propDetails1`}
                    component={PropertyDetails1}
                    exact
                  />
                  <Route
                    path={`${url}/propDetails2`}
                    component={PropertyDetails2}
                    exact
                  />
                  <Route
                    path={`${url}/review`}
                    component={ReviewOpportunity}
                    exact
                  />
                  <Route
                    path={`${url}/success`}
                    component={ReviewSubmitted}
                    exact
                  />
                </>
              )}
            />
            <Route path="/investment/*:path" component={OpportunityPage} />
            <Route exact path="/search">
              <Flyout />
            </Route>
          </Switch>
        </Router>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
