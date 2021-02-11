import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "shared-components";
import MapContainer from "./components/MapContainer/MapContainer";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";

function App() {
  const [nearbyResources, setNearbyResources] = useState({});
  const header = {
    name: "Community Information Tool",
    history: {},
  };

  return (
    <div className="app-container">
      <Header header={header} />
      <Router>
        <Switch>
          <Route exact path="/">
            <EDODashboard />
          </Route>
          <Route path="/addOpportunity">
            <div className="invest-container container d-flex flex-column justify-content-center align-items-center">
              <MapContainer
                nearbyResources={nearbyResources}
                setNearbyResources={setNearbyResources}
              />
            </div>
          </Route>
        </Switch>
      </Router>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
