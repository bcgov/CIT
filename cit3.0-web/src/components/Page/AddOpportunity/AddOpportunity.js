import { useHistory } from "react-router-dom";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "shared-components";
import { useEffect, useState } from "react";
import v4 from "uuid";
import { Callout } from "shared-components/build/components/callout/Callout";
import NumberFormat from "react-number-format";
import NavigationHeader from "../../Headers/NavigationHeader/NavigationHeader";
import MapContainer from "../../MapContainer/MapContainer";
import AddressSearchBar from "../../AddressSearchBar/AddressSearchBar";
import { getAddressData } from "../../../helpers/resourceCalls";
import PropertyInfo from "../../PropertyInfo/PropertyInfo";
import PageTitleHeader from "../../Headers/PageTitleHeader/PageTitleHeader";
import ButtonRow from "../../ButtonRow/ButtonRow";
import {
  getParcelData,
  getPID,
  getParcelDataNoAddress,
} from "../../../helpers/parcelData";
import { COORDINATE } from "../../../constants/coordinate";
import {
  setAddress,
  setCoords,
  setResourceIds,
  setPID,
  setGeometry,
  setParcelOwner,
  setParcelSize,
  setSiteId,
  resetOpportunity,
} from "../../../store/actions/opportunity";
import Radios from "../../FormComponents/Radios";
import Terms from "../../Terms/Terms";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import TextInput from "../../FormComponents/TextInput";

export default function AddOpportunity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const editing = useSelector((state) => state.opportunity.editing);
  const address = useSelector((state) => state.opportunity.address);
  const coords = useSelector((state) => state.opportunity.coords);
  const PID = useSelector((state) => state.opportunity.siteInfo.PID.value);
  const geometry = useSelector(
    (state) => state.opportunity.siteInfo.geometry.coordinates
  );
  const siteId = useSelector(
    (state) => state.opportunity.siteInfo.siteId.value
  );
  const parcelSize = useSelector(
    (state) => state.opportunity.siteInfo.parcelSize.value
  );
  const parcelOwner = useSelector(
    (state) => state.opportunity.siteInfo.parcelOwnership.name
  );
  const municipality = useSelector(
    (state) => state.opportunity.municipality.name
  );

  const [hasApproval, setHasApproval] = useState(false);
  const [warning, setWarning] = useState([]);
  const [error, setError] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [noAddressFlag, setNoAddressFlag] = useState(false);
  const [parcelInfo, setParcelInfo] = useState(false);

  // Handle ProximityData call still running and change of page
  const [proximityInProgress, setProximityInProgress] = useState(true);
  const [changePage, setChangePage] = useState(false);
  const [localityName, setLocalityName] = useState("Your Community");

  // Handle Modal for errors
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // handle proximity data still loading modal
  const [proxModalShow, setProxModalShow] = useState(false);

  const isInvalidAddress =
    !PID ||
    ((!address || !localityName) &&
      coords[0] === COORDINATE.X &&
      coords[1] === COORDINATE.Y);

  const showProximityModal = () => {
    setChangePage(true);
    setProxModalShow(true);
  };
  const handleProximityModalClose = () => {
    if (!proximityInProgress) {
      setChangePage(true);
      setProxModalShow(false);
    }
  };

  const closeModalAndContinue = () => {
    handleClose();
    history.push(`/investmentopportunities/site-info`);
  };

  const handleErrorModalContinue = () => {
    if (!error.length && (!isInvalidAddress || !!geometry)) {
      setWarning([]);
      setError([]);
      setChangePage(true);
      if (!proximityInProgress) {
        closeModalAndContinue();
      }
    }
    handleClose();
    if (proximityInProgress && !error.length && !isInvalidAddress) {
      showProximityModal();
    }
  };

  const onCancelClick = () => {
    dispatch(resetOpportunity());
    history.push("/investmentopportunities/dashboard");
  };

  useEffect(() => {
    // Data is prepared, continue to next page
    if (!error.length && changePage && !proximityInProgress) {
      closeModalAndContinue();
      return;
    }
    if (!error.length && changePage && !proximityInProgress) {
      handleProximityModalClose();
      closeModalAndContinue();
    }
  }, [proximityInProgress, error, warning]);

  useEffect(() => {
    if (municipality) {
      setLocalityName(municipality);
    }
  }, [municipality]);

  const goToNextPage = () => {
    handleShow();
    setWarning([]);
    setError([]);
    let errors = [];
    let warnings = [];
    if (isInvalidAddress || !geometry) {
      warnings = [
        ...warnings,
        `${
          isInvalidAddress
            ? "Please enter a valid civic address including the civic number"
            : ""
        }${isInvalidAddress && !geometry ? " or " : ""}${
          !geometry ? "select a land parcel from the map to continue." : ""
        }`,
      ];
    }
    if (parcelOwner === "Private" && hasApproval !== "Yes") {
      errors = [...errors, "Please get the approval before listing this site."];
    }
    if (!agreed) {
      errors = [...errors, "Please agree to the Terms of use."];
    }
    setWarning(warnings);
    setError(errors);
    setChangePage(agreed && !errors.length && !isInvalidAddress);
    if (!proximityInProgress) {
      closeModalAndContinue();
    }
  };

  const handleRadioChange = (name, label, value) => {
    setHasApproval(label);
  };

  const title1 = "Add an Opportunity";
  const title2 = "Confirm Property";
  const text1 =
    'Enter a civic address (including a valid civic number) or "zoom in" to the map and drop a pin on the land parcel you want to list as an opportunity for investors.';
  const text2 =
    "Please confirm this is the property you want to list as an investment opportunity in your community";

  const setParcelInfoByCoords = async (newCoords) => {
    const parcelData = await getParcelDataNoAddress(newCoords);
    if (parcelData) {
      dispatch(setPID([parcelData.data.features[0].properties.PID]));
      dispatch(
        setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE)
      );
      dispatch(
        setParcelSize(
          Number(
            // convert sqM to Acres
            (
              parcelData.data.features[0].properties.FEATURE_AREA_SQM *
              0.000247105
            ).toFixed(3)
          )
        )
      );
      dispatch(setGeometry(parcelData.data.features[0].geometry));
    }
  };

  const setParcelData = async (id) => {
    // ensure previous parcel data is cleared, but keeps address, coords intact
    dispatch(setParcelSize(null));
    dispatch(setParcelOwner(null));
    dispatch(setGeometry(null));
    // ensure hasApproval is false
    setHasApproval(false);
    /// //////////////////////////
    const pid = await getPID(id);
    let countedSQM = 0;
    dispatch(setPID(pid));
    if (pid) {
      pid.forEach(async (_pid) => {
        const parcelData = await getParcelData(_pid);
        if (parcelData) {
          await dispatch(
            setParcelOwner(parcelData.data.features[0].properties.OWNER_TYPE)
          );
          countedSQM += parcelData.data.features[0].properties.FEATURE_AREA_SQM;
          await dispatch(setGeometry(parcelData.data.features[0].geometry));
          await dispatch(
            setParcelSize(
              Number(
                // convert sqM to Acres
                (countedSQM * 0.000247105).toFixed(3)
              )
            )
          );
        } else {
          // There is no Parcel response for this PID, try a lng lat query.
          setParcelInfoByCoords(coords);
        }
      });
    } else {
      // There is no PID for the parcel to be queried, try a lng lat query.
      setParcelInfoByCoords(coords);
    }
  };

  const setParcelDataNoAddress = async (noAddrCoords) => {
    // ensure previous parcel data is cleared
    dispatch(setParcelSize(null));
    dispatch(setParcelOwner(null));
    dispatch(setGeometry(null));
    // ensure hasApproval is false
    setHasApproval(false);
    // reset coords with new coords
    dispatch(setCoords(noAddrCoords));
    // ensure hasApproval is false
    setHasApproval(false);
    if (noAddressFlag) {
      setParcelInfoByCoords(noAddrCoords);
    }
  };

  const getCoords = async (addy) => {
    dispatch(resetOpportunity());
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
        dispatch(setSiteId(null));
      }
    } catch (err) {
      setError([...error, "Service is not available.  Please try again later"]);
    }
  };

  useEffect(() => {
    if (siteId && !noAddressFlag) {
      setParcelData(siteId);
    }
    if (noAddressFlag) {
      setParcelDataNoAddress(coords);
    }
  }, [siteId, noAddressFlag]);

  const handleError = (message) => {
    setError([...error, message]);
  };

  const handleUpdateParcelInfo = () => {
    dispatch(setGeometry(null));
    setParcelInfo(true);
  };

  return (
    <>
      <NavigationHeader currentStep={1} />
      <Modal
        show={proxModalShow}
        onHide={handleProximityModalClose}
        keyboard={false}
        backdrop="static"
        size="lg"
        centered
      >
        <LoadingScreen />
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        size="lg"
        centered
        backdrop="static"
      >
        {error.length || warning.length ? (
          <>
            <Modal.Header>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {[...error, ...warning].map((e) => (
                <p className="text-red" key={v4()}>
                  {e}
                </p>
              ))}
            </Modal.Body>
            <Modal.Footer>
              {!(error.length || (!address && !geometry)) ? (
                <Button
                  label="Cancel"
                  styling="bcgov-normal-white mr-auto modal-reset-button btn"
                  onClick={handleClose}
                />
              ) : null}
              <Button
                label={
                  error.length || (!address && !geometry) ? "Okay" : "Continue"
                }
                styling="bcgov-normal-blue modal-save-button btn"
                onClick={handleErrorModalContinue}
              />
            </Modal.Footer>
          </>
        ) : (
          <LoadingScreen />
        )}
      </Modal>
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
                  setLocalityName={(name) => setLocalityName(name)}
                  getCoords={getCoords}
                  handleError={handleError}
                  currentAddress={address}
                />
                {!address && coords && coords[0] !== 54.1722 && (
                  <Row>
                    <Col>
                      <h3>Lat: {coords[0]}</h3>
                      <h3>Lon: {coords[1]}</h3>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col>
                    <PropertyInfo info={address} tag={false} />
                    {parcelOwner ? (
                      <p className="mb-0 mt-3 pb-0">
                        Ownership: <b>{parcelOwner}</b>
                      </p>
                    ) : null}
                    {parcelSize ? (
                      <p className="mb-0 pb-0">
                        Parcel Size: <b>{parcelSize.toFixed(3)} acres</b>
                      </p>
                    ) : null}
                    {PID ? (
                      <p>
                        PID:{" "}
                        <b>{PID && PID.length > 1 ? PID.join(", ") : PID}</b>
                      </p>
                    ) : null}
                    {!parcelInfo && parcelSize ? (
                      <div>
                        <Callout
                          text="To modify the parcel size, click below to enter new details."
                          checkboxLabel="Modify parcel size"
                          agreeCallout={handleUpdateParcelInfo}
                        />
                      </div>
                    ) : null}
                    {parcelInfo ? (
                      <div>
                        <div className="d-flex flex-column w-100">
                          <p className="mb-0">Parcel Size</p>
                          <p className="mb-0" style={{ opacity: "0.5" }}>
                            The lot size that will be shown publicly.
                          </p>
                          <div className="text-wrapper">
                            <NumberFormat
                              className="bcgov-text-input"
                              type="text"
                              displayType="input"
                              decimalScale={3}
                              value={parcelSize || 0}
                              units="acres"
                              onValueChange={(value) => {
                                if (value.floatValue !== parcelSize) {
                                  dispatch(setParcelSize(value.floatValue));
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {parcelOwner === "Private" && (
                      <>
                        <PropertyInfo info="This land parcel or development opportunity resides on private land." />
                        <PropertyInfo
                          info={`As a representative from ${
                            localityName || "Your Community"
                          }, do you have the approval from the land owner to promote this investment opportunity?`}
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
                                You must have the approval of the land owner to
                                promote this opportunity. Please get the
                                approval before listing this site.
                              </p>
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="leaflet-shadow">
            <MapContainer
              nearbyResources={{}}
              coords={coords}
              setResourceIds={(r) => dispatch(setResourceIds(r))}
              setAddress={(a) => dispatch(setAddress(a))}
              setCoords={(c) => dispatch(setCoords(c))}
              setSiteId={(id) => dispatch(setSiteId(id))}
              setNoAddressFlag={setNoAddressFlag}
              setProximityInProgress={setProximityInProgress}
            />
          </Col>
        </Row>
        <Row>
          <Terms agreed={agreed} setAgreed={setAgreed} />
        </Row>
      </Container>
      <ButtonRow onClick={goToNextPage} onCancelClick={onCancelClick} />
    </>
  );
}

AddOpportunity.propTypes = {};
