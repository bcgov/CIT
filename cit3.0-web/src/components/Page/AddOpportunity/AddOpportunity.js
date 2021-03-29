import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  setSiteId,
  setOpportunityUser,
} from "../../../store/actions/opportunity";
import Radios from "../../FormComponents/Radios";
import Terms from "../../Terms/Terms";

export default function AddOpportunity() {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
  const PID = useSelector((state) => state.opportunity.siteInfo.PID.value);
  const siteId = useSelector(
    (state) => state.opportunity.siteInfo.siteId.value
  );
  const parcelSize = useSelector(
    (state) => state.opportunity.siteInfo.parcelSize.value
  );
  const parcelOwner = useSelector(
    (state) => state.opportunity.siteInfo.parcelOwnership.name
  );
  const nearbyResources = useSelector(
    (state) => state.opportunity.nearbyResources
  );
  const municipality = useSelector(
    (state) => state.opportunity.municipality.name
  );

  const [hasApproval, setHasApproval] = useState(false);
  const [blockContinue, setBlockContinue] = useState(true);
  const [error, setError] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const handleRadioChange = (name, label, value) => {
    setHasApproval(label);
    if (label === "Yes") {
      setBlockContinue(false);
    } else {
      setBlockContinue(true);
    }
  };

  const history = useHistory();
  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    'Enter an address or "zoom in" to the map and drop a pin on the land parcel you want to list as an opportunity for investors.';
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  const setParcelData = async (id) => {
    const pid = await getPID(id);
    dispatch(setPID(pid));
    if (pid) {
      await pid.forEach(async (_pid) => {
        const parcelData = await getParcelData(_pid);
        if (parcelData) {
          dispatch(
            setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE)
          );
          if (parcelData.data.features[0].properties.OWNER_TYPE !== "Private") {
            setBlockContinue(false);
          } else {
            setBlockContinue(true);
          }
          dispatch(
            setParcelSize(
              Number(
                // convert sqM to Acres
                (
                  parcelData.data.features[0].properties.FEATURE_AREA_SQM *
                  0.000247105
                ).toFixed(3)
              ),
              true
            )
          );
          dispatch(setGeometry(parcelData.data.features[0].geometry));
        }
      });
    } else {
      dispatch(setGeometry({ coordinates: null }));
      dispatch(setParcelOwner(null));
      dispatch(setParcelSize(null));
      setBlockContinue(false);
    }
    setError(false);
  };

  const getCoords = async (addy) => {
    dispatch(setParcelOwner(null));
    dispatch(setGeometry(null));
    dispatch(setParcelSize(null));
    dispatch(setPID(null));
    dispatch(setAddress(null));
    setError("");
    try {
      const data = await getAddressData(addy);
      dispatch(setAddress(data.data.features[0].properties.fullAddress));
      dispatch(
        setCoords([
          data.data.features[0].geometry.coordinates[1],
          data.data.features[0].geometry.coordinates[0],
        ])
      );
      if (data.data.features[0].properties.siteID) {
        dispatch(setSiteId(data.data.features[0].properties.siteID));
      } else if (data.data.features.length) {
        dispatch(setSiteId("unknown"));
      } else {
        setError("Cannot find address info, please try again.");
        setBlockContinue(true);
        return;
      }
    } catch (err) {
      setError("Service is not available.  Please try again later");
    }
  };

  useEffect(() => {
    if (siteId) {
      setParcelData(siteId);
    }
  }, [siteId]);

  const goToNextPage = () => {
    history.push(`/opportunity/site-info`);
  };

  return (
    <>
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
                  setError={setError}
                  currentAddress={address}
                  setBlockContinue={setBlockContinue}
                />
                {error && (
                  <Row>
                    <Col>
                      <h3>{error}</h3>
                    </Col>
                  </Row>
                )}
                {address && !parcelSize && (
                  <Row>
                    <Col>
                      <PropertyInfo info={address} tag={false} />
                    </Col>
                  </Row>
                )}
                {address && parcelSize ? (
                  <Row>
                    <Col>
                      <PropertyInfo info={address} tag={false} />
                      <p className="mb-0 mt-3 pb-0">
                        Ownership: <b>{parcelOwner}</b>
                      </p>
                      <p className="mb-0 pb-0">
                        Parcel Size: <b>{parcelSize.toFixed(3)} acres</b>
                      </p>
                      <p>
                        PID: <b>{PID.length > 1 ? PID.join(", ") : PID}</b>
                      </p>
                      {parcelOwner === "Private" && (
                        <>
                          <PropertyInfo info="This land parcel or development opportunity resides on private land." />
                          <PropertyInfo
                            info={`As a rep from ${
                              municipality || "Your Community"
                            } do you have the approval from the land owner to promote this investment opportunity?`}
                          />
                          <Col>
                            <Radios
                              aria-label="approval to sell"
                              labels={["Yes", "No", "Pending Approval"]}
                              name="approval-to-sell"
                              value={hasApproval || ""}
                              handleRadioChange={handleRadioChange}
                            />
                          </Col>
                          {hasApproval !== "Yes" && (
                            <Row className="mt-2">
                              <Col className="text-red">
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
              setSiteId={(id) => dispatch(setSiteId(id))}
              setError={setError}
            />
          </Col>
        </Row>
        <Row>
          <Terms agreed={agreed} setAgreed={setAgreed} />
        </Row>
      </Container>
      <ButtonRow
        noContinue={!address || blockContinue || !agreed}
        onClick={goToNextPage}
      />
    </>
  );
}

AddOpportunity.propTypes = {};
