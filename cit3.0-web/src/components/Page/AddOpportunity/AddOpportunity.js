import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
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
import Radios from "../../FormComponents/Radios";

export default function AddOpportunity({ match }) {
  document.title = `Investments - Add Opportunity`;
  const dispatch = useDispatch();
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
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

  const [hasApproval, setHasApproval] = useState(false);

  const handleRadioChange = (name, label, value) => {
    setHasApproval(label);
  };

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
                  <Row>
                    <Col>
                      <PropertyInfo info={address} tag={false} />
                      <p className="mb-0 mt-3 pb-0">
                        Ownership: <b>{parcelOwner}</b>
                      </p>
                      <p className="mb-0 pb-0">
                        Parcel Size: <b>{parcelSize.toFixed(2)} acres</b>
                      </p>
                      <p>
                        PID: <b>{PID}</b>
                      </p>
                      {parcelOwner === "Private" && (
                        <>
                          <PropertyInfo info="This land parcel or development opportunity resides on private land." />
                          <PropertyInfo info="As a rep from <INSERT COMMUNITY HERE> do you have the approval from the land owner to promote this investment opportunity?" />
                          <Col>
                            <Radios
                              aria-label="approval to sell"
                              labels={["Yes", "No", "Pending Approval"]}
                              name="approval-to-sell"
                              value={hasApproval}
                              handleRadioChange={handleRadioChange}
                            />
                          </Col>
                          {hasApproval !== "Yes" && (
                            <Row className="mt-2">
                              <Col style={{ color: "red" }}>
                                <p>
                                  You must have the approval of the land owner
                                  to promote this opportunity. Please get the
                                  approval before listing this site.
                                </p>
                              </Col>
                            </Row>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
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
      <ButtonRow
        noContinue={!address || hasApproval !== ("Yes" || null)}
        onClick={goToNextPage}
      />
    </>
  );
}

AddOpportunity.propTypes = {
  match: PropTypes.shape().isRequired,
};
