import { useState } from "react";
import "./AddOpportunity.css";
import { Container, Row, Col } from "react-bootstrap";
import MapContainer from "../../MapContainer/MapContainer";
import InvestOpForm from "../../InvestOpForm/InvestOpForm";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import {
  getAddressData,
  getProximityData,
} from "../../../helpers/resourceCalls";

export default function AddOpportunity() {
  const [address, setAddress] = useState("");
  const [nearbyResources, setNearbyResources] = useState({});
  const [coords, setCoords] = useState([54.1722, -124.1207]);

  const getCoords = async (addy) => {
    const data = await getAddressData(addy);
    setCoords([
      data.data.features[0].geometry.coordinates[1],
      data.data.features[0].geometry.coordinates[0],
    ]);
  };

  return (
    <Container>
      <Row>
        <Col className="my-5">
          <h1>Add an Opportunity</h1>
          <p>
            Please drop a min on the map or enter the address of the property
            you want to list as an opportunity for investors.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3">
          <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
        </Col>
        <Col>
          <MapContainer
            setAddress={setAddress}
            address={address}
            nearbyResources={nearbyResources}
            setNearbyResources={setNearbyResources}
            coords={coords}
            getCoords={getCoords}
            setCoords={setCoords}
          />
        </Col>
      </Row>
    </Container>
  );
}
