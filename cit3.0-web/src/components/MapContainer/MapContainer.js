import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import Map from "../Map/Map";
import { getProximityData } from "../../helpers/resourceCalls";
import { getSoilAndElevationData, buildSoilString } from "../../helpers/soil";
import {
  setSoil,
  setElevation,
  setNearbyResources,
} from "../../store/actions/opportunity";

export default function MapContainer({
  nearbyResources,
  coords,
  setCoords,
  setAddress,
  setError,
  setNoAddressFlag,
  setProximityInProgress,
}) {
  const [lastCoords, setLastCoords] = useState([]);
  const dispatch = useDispatch();

  const { CancelToken } = axios;
  let source = CancelToken.source();

  const run = async (sourceToken) => {
    // proximity call is running, do not unmount component if user hits continue
    setProximityInProgress(true);
    console.log("running");
    const [soilData, proximityData] = await axios.all([
      getSoilAndElevationData(coords, sourceToken),
      getProximityData(coords, sourceToken),
    ]);
    if (soilData) {
      const soilStr = buildSoilString(soilData);
      dispatch(setSoil(soilStr));
      dispatch(setElevation(soilData.AVG_ELEV));
    }
    if (proximityData) {
      dispatch(setNearbyResources(proximityData));
    }
    // Call is finished and we can safely go to next page
    setProximityInProgress(false);
  };
  useEffect(() => {
    // kill the axios calls if coords change
    if (source) {
      source.cancel("newer search");
    }
    source = CancelToken.source();
    if (coords[0] !== 54.1722 && coords[0] !== lastCoords[0]) {
      setLastCoords(coords);
      run(source);
    }
    return () => {
      source.cancel("cancel in clean up");
    };
  }, [coords]);

  return (
    <div style={{ minHeight: "100%" }} className="d-flex w-100">
      <div
        className="my-3 full-border"
        style={{ height: "500px", width: "600px" }}
      >
        <Map
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
  setAddress: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setNoAddressFlag: PropTypes.func.isRequired,
  setProximityInProgress: PropTypes.func.isRequired,
};
