import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Map from "../Map/Map";
import { getProximityData } from "../../helpers/resourceCalls";

const resourceIds = {
  Hospitals: "5ff82cf4-0448-4063-804a-7321f0f2b4c6",
  Schools: "5832eff2-3380-435e-911b-5ada41c1d30b",
  "Post Secondary Schools": "8e4e2a87-2d1d-4931-828e-6327b49f310e",
  Courts: "23aa0b75-2715-4ccb-9a36-9a608450dc2d",
  "Walk-In Clinics": "3ca6b086-c92b-4654-ae82-ff5723d00611",
  "Natural Resource Projects": "2b69cc4b-4076-4272-a5a0-1c731455e063",
  "Economic Projects": "b12cd4cc-b58b-4079-b630-a20b6df58e8d",
};

export default function MapContainer({
  nearbyResources,
  setNearbyResources,
  coords,
  setCoords,
  setAddress,
  setError,
}) {
  const [lastCoords, setLastCoords] = useState([]);

  const run = async () => {
    const proximity = await getProximityData(coords);
    setNearbyResources(proximity.data);
  };
  useEffect(() => {
    if (coords[0] !== 54.1722 && coords[0] !== lastCoords[0]) {
      setLastCoords(coords);
      run();
    }
  }, [coords]);

  return (
    <div style={{ minHeight: "100%" }} className="d-flex w-100">
      <div
        className="my-3 full-border"
        style={{ height: "500px", width: "600px" }}
      >
        <Map
          resourceIds={resourceIds}
          setNearbyResources={setNearbyResources}
          coords={coords}
          setCoords={setCoords}
          setAddress={setAddress}
          nearbyResources={nearbyResources}
          setError={setError}
        />
      </div>
    </div>
  );
}

MapContainer.defaultPropTypes = {
  nearbyResources: null,
};

MapContainer.propTypes = {
  nearbyResources: PropTypes.shape({
    resource: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCoords: PropTypes.func.isRequired,
  setNearbyResources: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
