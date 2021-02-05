import { useState } from "react";
import "./AddOpportunity.css";
import MapContainer from "../../MapContainer/MapContainer";
import InvestOpForm from "../../InvestOpForm/InvestOpForm";

export default function AddOpportunity() {
  const [address, setAddress] = useState("");
  const [nearbyResources, setNearbyResources] = useState({});

  return (
    <div className="container">
      <div className="my-5">
        <h1>Add an Opportunity</h1>
        <p>
          Please drop a min on the map or enter the address of the property you
          want to list as an opportunity for investors.
        </p>
      </div>
      <MapContainer
        setAddress={setAddress}
        address={address}
        nearbyResources={nearbyResources}
        setNearbyResources={setNearbyResources}
      />
      <div>{/* <InvestOpForm address={address} /> */}</div>
    </div>
  );
}
