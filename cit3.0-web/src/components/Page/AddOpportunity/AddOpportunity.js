import { useState } from "react";
import "./AddOpportunity.css";
import MapContainer from "../../MapContainer/MapContainer";
import InvestOpForm from "../../InvestOpForm/InvestOpForm";

export default function AddOpportunity() {
  const [address, setAddress] = useState("");
  const [nearbyResources, setNearbyResources] = useState({});

  return (
    <div>
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
