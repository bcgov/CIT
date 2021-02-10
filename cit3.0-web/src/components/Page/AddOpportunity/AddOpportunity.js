import { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MapContainer from "../../MapContainer/MapContainer";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import { getAddressData } from "../../../helpers/resourceCalls";
import PropertyInfo from "../../PropertyInfo/PropertyInfo";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";

export default function AddOpportunity({ match }) {
  const [nearbyResources, setNearbyResources] = useState({});
  const [coords, setCoords] = useState([54.1722, -124.1207]);
  const [address, setAddress] = useState("");

  const history = useHistory();
  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    "Please drop a min on the map or enter the address of the property you want to list as an opportunity for investors.";
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  const getCoords = async (addy) => {
    const data = await getAddressData(addy);
    setCoords([
      data.data.features[0].geometry.coordinates[1],
      data.data.features[0].geometry.coordinates[0],
    ]);
  };

  const goToNextPage = () => {
    history.push({
      pathname: `${match.url}/siteDetails`,
      state: { address, match },
    });
  };

  return (
    <>
      <PortalHeader />
      <NavigationHeader />

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
                <AddressSearchBar
                  setAddress={setAddress}
                  getCoords={getCoords}
                />
                {address ? (
                  <>
                    <PropertyInfo info={address} tag={false} />
                    <PropertyInfo info={"Ownership: <ownership_type>"} />
                    <PropertyInfo info={"Parcel Size: <size> ha"} />
                  </>
                ) : null}
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
        <ButtonRow onClick={goToNextPage} />
      </Container>
    </>
  );
}

AddOpportunity.propTypes = {
  match: PropTypes.shape().isRequired,
};
