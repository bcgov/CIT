import "@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Header, Footer } from "shared-components";
import MapContainer from "./components/MapContainer/MapContainer";
import ResourceList from "./components/ResourceList/ResourceList";

function App() {
  const [nearbyResources, setNearbyResources] = useState({});
  const header = {
    name: "Community Information Tool",
    history: useHistory() || {},
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header header={header} />
      <div
        style={{ minHeight: "80vh" }}
        className="container pb-5 w-75 d-flex flex-column"
      >
        <div className="my-1">
          <MapContainer
            nearbyResources={nearbyResources}
            setNearbyResources={setNearbyResources}
          />
        </div>
        <div className="container w-75 d-flex flex-column justify-items-center align-items-center pb-1">
          {JSON.stringify(nearbyResources) !== "{}" ? (
            <>
              <h1>Resources within 50km</h1>
              <ResourceList resources={nearbyResources} />
            </>
          ) : null}
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
