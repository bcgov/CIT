import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PortalHeader from "../../Headers/PortalHeader/PortalHeader";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MapContainer from "../../MapContainer/MapContainer";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import { getAddressData } from "../../../helpers/resourceCalls";
import PropertyInfo from "../../PropertyInfo/PropertyInfo";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import { getParcelData, getPID } from "../../../helpers/parcelData";
import {
  setAddress,
  setCoords,
  setNearbyResources,
  setResourceIds,
  setPID,
  setGeometry,
  setParcelOwner,
  setParcelSize,
} from "../../../store/actions/opportunity";

export default function AddOpportunity({ match }) {
  document.title = `Investments - Add Opportunity`;
  const dispatch = useDispatch();
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
  const siteInfo = useSelector((state) => state.opportunity.siteInfo);
  const PID = useSelector((state) => state.opportunity.siteInfo.PID.value);
  const parcelSize = useSelector(
    (state) => state.opportunity.siteInfo.parcelSize.value
  );
  const parcelOwner = useSelector(
    (state) => state.opportunity.siteInfo.parcelOwnership.name
  );
  const nearbyResources = useSelector(
    (state) => state.opportunity.nearbyResources
  );

  const history = useHistory();
  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    "Please drop a pin on the map or enter the address of the property you want to list as an opportunity for investors.";
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  // The PID and parcel data is now retrieved and set here as well
  const getCoords = async (addy) => {
    const data = await getAddressData(addy);
    dispatch(
      setCoords([
        data.data.features[0].geometry.coordinates[1],
        data.data.features[0].geometry.coordinates[0],
      ])
    );
    const pid = await getPID(data.data.features[0].properties.siteID);
    dispatch(setPID(pid));
    const parcelData = await getParcelData(pid);
    dispatch(setGeometry(parcelData.data.features[0].geometry.coordinates));
    dispatch(setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE));
    // convert sqM to acres
    dispatch(
      setParcelSize(
        parcelData.data.features[0].properties.FEATURE_AREA_SQM * 0.000247105
      )
    );
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
      <NavigationHeader currentStep={1} />

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
                  setAddress={(addy) => dispatch(setAddress(addy))}
                  getCoords={getCoords}
                />
                {parcelSize > 5 ? (
                  <>
                    <PropertyInfo info={address} tag={false} />
                    <PropertyInfo info={`Ownership: ${parcelOwner}`} />
                    <PropertyInfo
                      info={`Parcel Size: ${parcelSize.toFixed(2)} acres`}
                    />
                    <PropertyInfo info={`PID: ${PID}`} />
                  </>
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col className="leaflet-shadow">
            <MapContainer
              nearbyResources={nearbyResources}
              coords={coords}
              setResourceIds={(r) => dispatch(setResourceIds(r))}
              setNearbyResources={(r) => dispatch(setNearbyResources(r))}
              setAddress={(a) => dispatch(setAddress(a))}
              setCoords={(c) => dispatch(setCoords(c))}
            />
          </Col>
        </Row>
      </Container>
      <ButtonRow noContinue={!address} onClick={goToNextPage} />
    </>
  );
}

AddOpportunity.propTypes = {
  match: PropTypes.shape().isRequired,
};
