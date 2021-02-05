import { useState } from "react";
import "./AddOpportunity.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "shared-components";
import MapContainer from "../../MapContainer/MapContainer";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import { getAddressData } from "../../../helpers/resourceCalls";
import PropertyInfo from "../../PropertyInfo/PropertyInfo";
import PageTitleHeader from "../../PageTitleHeader/PageTitleHeader";

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

  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    "Please drop a min on the map or enter the address of the property you want to list as an opportunity for investors.";
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  return (
    <Container>
      <Row>
        {!address ? (
          <PageTitleHeader title={title1} text={text1} />
        ) : (
          <PageTitleHeader title={title2} text={text2} />
        )}
      </Row>
      <Row>
        <Col className="mb-3 pt-3 d-flex flex-column justify-content-between">
          <Row className="top">
            <Col>
              <AddressSearchBar setAddress={setAddress} getCoords={getCoords} />
              {address ? (
                <>
                  <PropertyInfo info={address} tag={false} />
                  <PropertyInfo info={"TYPE OF PARCEL: crown, property"} />
                  <PropertyInfo
                    info={
                      "If private, write something that must be done, like get permission from land owner"
                    }
                  />
                </>
              ) : null}
            </Col>
          </Row>
          <Row className="bottom">
            <Col>
              <Button
                onClick={() => null}
                label="Cancel"
                styling="bcgov-normal-white btn"
              />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                onClick={() => null}
                label="Continue"
                styling="bcgov-normal-blue btn"
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <MapContainer
            setAddress={setAddress}
            nearbyResources={nearbyResources}
            setNearbyResources={setNearbyResources}
            coords={coords}
            setCoords={setCoords}
          />
        </Col>
      </Row>
    </Container>
  );
}
