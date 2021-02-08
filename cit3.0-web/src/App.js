import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "shared-components";
import AddOpportunity from "./components/Page/AddOpportunity/AddOpportunity";
import EDODashboard from "./components/Page/EDODashboard/EDODashboard";
import InvestOpForm from "./components/InvestOpForm/InvestOpForm";

function App() {
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
            <AddOpportunity />
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
