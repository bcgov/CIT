import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "shared-components";
import MapContainer from "./components/MapContainer/MapContainer";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";

function App() {
  const header = {
    name: "Community Information Tool",
    history: {},
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header header={header} />
      <Router>
        <Switch>
          <Route exact path="/">
            <EDODashboard />
          </Route>
          <Route path="/addInvestment">
            <div
              style={{ height: "80vh" }}
              className="container d-flex flex-column justify-content-center align-items-center"
            >
              <MapContainer />
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
