import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "shared-components";
import Map from "../Map/Map";
// import InvestOpForm from '../InvestOpForm/InvestOpForm';
import { getAddressData, getProximityData } from "../../helpers/resourceCalls";

const resourceIds = {
  Hospitals: "5ff82cf4-0448-4063-804a-7321f0f2b4c6",
  Schools: "5832eff2-3380-435e-911b-5ada41c1d30b",
  // servicesISP: "00a331db-121b-445d-b119-35dbbe3eedd9",
  "Post Secondary Schools": "8e4e2a87-2d1d-4931-828e-6327b49f310e",
  Courts: "23aa0b75-2715-4ccb-9a36-9a608450dc2d",
  "Walk-In Clinics": "3ca6b086-c92b-4654-ae82-ff5723d00611",
  "Natural Resource Projects": "2b69cc4b-4076-4272-a5a0-1c731455e063",
  "Economic Projects": "b12cd4cc-b58b-4079-b630-a20b6df58e8d",
  // airports: "604c8be1-b3f3-45b4-8030-5f9c8be71645",
  // civicFacilities: "64284a1e-0c89-4ae3-bea4-59bc0eb9d579",
  // timberFacilities: "c5553f20-f589-4ca5-8ed6-afb45ae281b1",
  // firstResponders: "70899feb-b62f-4cd0-aeff-32e1936c3018",
  // diagnosticFacilities: "e546be7a-a432-458b-91a0-1084887c291c",
};

export default function MapContainer({ setNearbyResources }) {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState([49.2827, -123.1207]);
  // const [nearbyResources, setNearbyResources] = useState({});

  const getCoords = async () => {
    const data = await getAddressData(address);
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
    if (coords[0] !== 49.2827) {
      run();
    }
  }, [coords]);

  const input = {
    label: "",
    id: "address",
    placeholder: "Address",
    isReadOnly: false,
    isRequired: true,
    styling: "bcgov-editable-white",
  };

  return (
    <div className="d-flex flex-column justify-content-between align-items-center w-100">
      <div className="w-100 mb-2 pt-2">
        <Input input={{ ...input }} onChange={setAddress} />
      </div>
      <Button
        onClick={getCoords}
        label="Search"
        styling="bcgov-normal-blue btn"
      />
      <div className="my-2" style={{ height: "500px", width: "600px" }}>
        <Map coords={coords} />
      </div>
    </div>
  );
}

MapContainer.propTypes = {
  setNearbyResources: PropTypes.func.isRequired,
};
