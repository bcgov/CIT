import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";
import { getProximityData } from "../../helpers/resourceCalls";
import { getSoilAndElevationData, buildSoilString } from "../../helpers/soil";
import { setSoil, setElevation } from "../../store/actions/opportunity";

export default function MapContainer({
  nearbyResources,
  setNearbyResources,
  coords,
  setCoords,
  setAddress,
  setError,
  setNoAddressFlag,
}) {
  const [lastCoords, setLastCoords] = useState([]);
  const dispatch = useDispatch();

  const run = async () => {
    const soilData = await getSoilAndElevationData(coords);
    if (soilData) {
      const soilStr = buildSoilString(soilData);
      dispatch(setSoil(soilStr));
      dispatch(setElevation(soilData.AVG_ELEV));
    }
    const proximity = await getProximityData(coords);
    console.log("got proximity data in MapContainer, setting nearby resources");
    dispatch(setNearbyResources(proximity.data));
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
          setNearbyResources={setNearbyResources}
          coords={coords}
          setCoords={setCoords}
          setAddress={setAddress}
          nearbyResources={nearbyResources}
          setError={setError}
          setNoAddressFlag={setNoAddressFlag}
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
  setNoAddressFlag: PropTypes.func.isRequired,
};
