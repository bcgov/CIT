import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "shared-components";
import AddressSearchBar from "../AddressSearchBar/AddressSearchBar";
import Map from "../Map/Map";
import { getAddressData, getProximityData } from "../../helpers/resourceCalls";

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
  address,
  setAddress,
}) {
  // const [coords, setCoords] = useState([49.2827, -123.1207]);
  const [coords, setCoords] = useState([54.1722, -124.1207]);

  const getCoords = async (addy) => {
    const data = await getAddressData(addy);
    setCoords([
      data.data.features[0].geometry.coordinates[1],
      data.data.features[0].geometry.coordinates[0],
    ]);
  };

  useEffect(() => {
    const run = async () => {
      const proximity = await getProximityData(resourceIds, coords);
      setNearbyResources(proximity);
    };
    if (coords[0] !== 54.1722) {
      run();
    }
  }, [coords]);

  return (
    <div style={{ minHeight: "100%" }} className="d-flex w-100">
      <div className="w-50 my-3 pr-5">
        <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
      </div>
      <div className="my-2" style={{ height: "500px", width: "600px" }}>
        <Map
          resourceIds={resourceIds}
          setNearbyResources={setNearbyResources}
          coords={coords}
          setCoords={setCoords}
          setAddress={setAddress}
          nearbyResources={nearbyResources}
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
  address: PropTypes.string.isRequired,
  setNearbyResources: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};
